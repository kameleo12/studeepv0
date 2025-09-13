// modules/drive/gateways-impl/indexeddb-storage.gateway.ts
import { IStorageGateway } from "@root/modules/drive/core/gateways/storage.gateway";

const DB_NAME = "driveDB";
const DB_VERSION = 1;
const STORE_FOLDERS = "folders";
const STORE_FILES = "files";
const STORE_BLOBS = "blobs";

type FolderRec = { id: string; name: string; parentId: string | null; createdAt: string; updatedAt: string };
type FileRec = { id: string; name: string; parentId: string | null; mime: string; size: number; createdAt: string; updatedAt: string; version: number };

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_FOLDERS)) {
        const s = db.createObjectStore(STORE_FOLDERS, { keyPath: "id" });
        s.createIndex("by_parent", "parentId", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_FILES)) {
        const s = db.createObjectStore(STORE_FILES, { keyPath: "id" });
        s.createIndex("by_parent", "parentId", { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_BLOBS)) {
        db.createObjectStore(STORE_BLOBS, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T = undefined>(
  db: IDBDatabase,
  stores: string[],
  mode: IDBTransactionMode,
  work: (t: IDBTransaction) => Promise<T> | T
): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(stores, mode);
    const run = async () => {
      try {
        const res = await work(t);
        resolve(res as T);
      } catch (e) {
        reject(e);
      }
    };
    run();
    t.oncomplete = () => {};
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}

function getAllByIndex<T = any>(store: IDBObjectStore, indexName: string, value: any): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const idx = store.index(indexName);
    const req = idx.getAll(value);
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

function getAllStore<T = any>(store: IDBObjectStore): Promise<T[]> {
  return new Promise((resolve, reject) => {
    // getAll est supporté par tous les navigateurs modernes
    const req = (store.getAll as any)();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

function getOne<T = any>(store: IDBObjectStore, id: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  });
}

function put(store: IDBObjectStore, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = store.put(value);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function del(store: IDBObjectStore, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function genId() {
  return (globalThis.crypto?.randomUUID?.() ?? `id_${Date.now()}_${Math.random().toString(16).slice(2)}`);
}

export class IndexedDBStorageGateway implements IStorageGateway {
  async list(folderId: string | null): Promise<{ folders: FolderRec[]; files: FileRec[] }> {
    const db = await openDB();
    return tx(db, [STORE_FOLDERS, STORE_FILES], "readonly", async (t) => {
      const foldersStore = t.objectStore(STORE_FOLDERS);
      const filesStore = t.objectStore(STORE_FILES);

      // ⚠️ Important : l’index ne matche pas bien les valeurs null.
      // Pour la racine, on récupère tout puis on filtre en mémoire.
      if (folderId === null) {
        const [allFolders, allFiles] = await Promise.all([
          getAllStore<FolderRec>(foldersStore),
          getAllStore<FileRec>(filesStore),
        ]);
        const folders = allFolders.filter(f => f.parentId === null);
        const files = allFiles.filter(f => f.parentId === null);
        return { folders, files };
      }

      // Sous-dossiers : requête par index
      const [folders, files] = await Promise.all([
        getAllByIndex<FolderRec>(foldersStore, "by_parent", folderId),
        getAllByIndex<FileRec>(filesStore, "by_parent", folderId),
      ]);
      return { folders, files };
    });
  }

  async getFile(fileId: string): Promise<Blob> {
    const db = await openDB();
    return tx(db, [STORE_BLOBS], "readonly", async (t) => {
      const s = t.objectStore(STORE_BLOBS);
      const rec = await getOne<{ id: string; blob: Blob }>(s, fileId);
      if (!rec) throw new Error("Fichier introuvable");
      return rec.blob;
    });
  }

  async createFolder(parentId: string | null, name: string): Promise<{ id: string }> {
    const now = new Date().toISOString();
    const folder: FolderRec = { id: genId(), name, parentId, createdAt: now, updatedAt: now };
    const db = await openDB();
    await tx(db, [STORE_FOLDERS], "readwrite", async (t) => {
      await put(t.objectStore(STORE_FOLDERS), folder);
    });
    return { id: folder.id };
  }

  async uploadFile(params: { parentId: string | null; blob: Blob; name: string; mime: string }): Promise<{ id: string }> {
    const now = new Date().toISOString();
    const id = genId();
    const file: FileRec = {
      id,
      name: params.name,
      parentId: params.parentId,
      mime: params.mime || "application/octet-stream",
      size: params.blob.size,
      createdAt: now,
      updatedAt: now,
      version: 1,
    };
    const db = await openDB();
    await tx(db, [STORE_FILES, STORE_BLOBS], "readwrite", async (t) => {
      await put(t.objectStore(STORE_FILES), file);
      await put(t.objectStore(STORE_BLOBS), { id, blob: params.blob });
    });
    return { id };
  }

  async updateFile(fileId: string, blob: Blob): Promise<void> {
    const db = await openDB();
    await tx(db, [STORE_FILES, STORE_BLOBS], "readwrite", async (t) => {
      const files = t.objectStore(STORE_FILES);
      const f = await getOne<FileRec>(files, fileId);
      if (!f) throw new Error("Fichier introuvable");
      f.updatedAt = new Date().toISOString();
      f.version = (f.version || 1) + 1;
      f.size = blob.size;
      await put(files, f);
      await put(t.objectStore(STORE_BLOBS), { id: fileId, blob });
    });
  }

  async rename(entityId: string, name: string): Promise<void> {
    const db = await openDB();
    await tx(db, [STORE_FILES, STORE_FOLDERS], "readwrite", async (t) => {
      const files = t.objectStore(STORE_FILES);
      const folders = t.objectStore(STORE_FOLDERS);
      const f = await getOne<FileRec>(files, entityId);
      if (f) {
        f.name = name;
        f.updatedAt = new Date().toISOString();
        await put(files, f);
        return;
      }
      const d = await getOne<FolderRec>(folders, entityId);
      if (d) {
        d.name = name;
        d.updatedAt = new Date().toISOString();
        await put(folders, d);
        return;
      }
      throw new Error("Entité introuvable");
    });
  }

  async move(entityId: string, newParentId: string | null): Promise<void> {
    const db = await openDB();
    await tx(db, [STORE_FILES, STORE_FOLDERS], "readwrite", async (t) => {
      const files = t.objectStore(STORE_FILES);
      const folders = t.objectStore(STORE_FOLDERS);
      const f = await getOne<FileRec>(files, entityId);
      if (f) {
        f.parentId = newParentId;
        f.updatedAt = new Date().toISOString();
        await put(files, f);
        return;
      }
      const d = await getOne<FolderRec>(folders, entityId);
      if (d) {
        d.parentId = newParentId;
        d.updatedAt = new Date().toISOString();
        await put(folders, d);
        return;
      }
      throw new Error("Entité introuvable");
    });
  }

  async remove(entityId: string): Promise<void> {
    const db = await openDB();
    await tx(db, [STORE_FILES, STORE_FOLDERS, STORE_BLOBS], "readwrite", async (t) => {
      const files = t.objectStore(STORE_FILES);
      const folders = t.objectStore(STORE_FOLDERS);
      const blobs = t.objectStore(STORE_BLOBS);

      const f = await getOne<FileRec>(files, entityId);
      if (f) {
        await del(files, entityId);
        await del(blobs, entityId);
        return;
      }

      const d = await getOne<FolderRec>(folders, entityId);
      if (d) {
        const childFolders = (await getAllStore<FolderRec>(folders)).filter(x => x.parentId === d.id);
        const childFiles = (await getAllStore<FileRec>(files)).filter(x => x.parentId === d.id);
        if (childFolders.length || childFiles.length) {
          throw new Error("Le dossier n’est pas vide");
        }
        await del(folders, entityId);
        return;
      }

      throw new Error("Entité introuvable");
    });
  }
}
