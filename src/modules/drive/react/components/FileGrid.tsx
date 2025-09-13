// modules/drive/react/components/FileGrid.tsx
"use client";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@root/modules/store/store";
import { makeSelectChildren } from "@root/modules/drive/core/selectors/drive.selectors";
import { listFolder, renameEntity, deleteEntity, moveEntity } from "@root/modules/drive/core/reducers/drive-tree.slice";
import { AppState } from "@root/modules/store/app-state";
import { DriveDomainModel } from "@root/modules/drive/core/model/drive.domain-model";
import { openFile } from "@root/modules/drive/core/reducers/drive-viewer.slice";
import { toast } from "react-toastify";
import { DRIVE_DND_MIME, DriveDragPayload } from "@root/modules/drive/core/constants";

export default function FileGrid({ folderId }: { folderId: string | null }) {
  const dispatch = useAppDispatch();

  const selectChildrenForFolder = useMemo(() => makeSelectChildren(folderId), [folderId]);
  const { folders, files } = useSelector((s: AppState) => selectChildrenForFolder(s));
  const currentFolderId = useSelector((s: AppState) => s.driveTree.currentFolderId);

  const [hoverTarget, setHoverTarget] = useState<string | "CURRENT" | null>(null);

  const openFolder = (id: string) => dispatch(listFolder({ folderId: id }) as any);

  const onRename = async (entity: DriveDomainModel.Folder | DriveDomainModel.File) => {
    const name = window.prompt("Nouveau nom :", entity.name);
    if (!name || name.trim() === entity.name) return;
    try {
      await dispatch(renameEntity({ entityId: entity.id, name: name.trim() }) as any);
      toast.success("Renommé");
    } catch (e: any) {
      toast.error(e?.message || "Erreur lors du renommage");
    }
  };

  const onDelete = async (entity: DriveDomainModel.Folder | DriveDomainModel.File) => {
    if (!window.confirm(`Supprimer “${entity.name}” ?`)) return;
    try {
      await dispatch(deleteEntity({ entityId: entity.id }) as any);
      toast.success("Supprimé");
    } catch (e: any) {
      toast.error(e?.message || "Suppression impossible (dossier non vide ?)");
    }
  };

  const onOpenFile = async (file: DriveDomainModel.File) => {
    try {
      await dispatch(openFile({ fileId: file.id, mime: file.mime }) as any);
    } catch (e: any) {
      toast.error(e?.message || "Impossible d’ouvrir le fichier");
    }
  };

  /** Prépare le payload du drag interne */
  const setDragData = (e: React.DragEvent, entity: DriveDomainModel.Folder | DriveDomainModel.File) => {
    const payload: DriveDragPayload = {
      id: entity.id,
      kind: entity.type,
      fromParentId: entity.parentId ?? null,
    };
    e.dataTransfer.setData(DRIVE_DND_MIME, JSON.stringify(payload));
    // Indiquer visuellement que c'est un move
    e.dataTransfer.effectAllowed = "move";
  };

  /** Drop sur le “fond” du grid : déplacer vers le dossier courant */
  const onContainerDragOver = (e: React.DragEvent) => {
    if (Array.from(e.dataTransfer.types).includes(DRIVE_DND_MIME)) {
      e.preventDefault();
      setHoverTarget("CURRENT");
      e.dataTransfer.dropEffect = "move";
    }
  };
  const onContainerDragLeave = () => setHoverTarget((v) => (v === "CURRENT" ? null : v));
  const onContainerDrop = async (e: React.DragEvent) => {
    setHoverTarget(null);
    const types = Array.from(e.dataTransfer.types);
    if (!types.includes(DRIVE_DND_MIME)) return;
    e.preventDefault();
    try {
      const payload = JSON.parse(e.dataTransfer.getData(DRIVE_DND_MIME)) as DriveDragPayload;
      const newParentId = currentFolderId ?? null;
      if (payload.fromParentId === newParentId) return; // rien à faire
      if (payload.id === newParentId) return; // éviter move dans soi-même
      await dispatch(moveEntity({ entityId: payload.id, newParentId }) as any);
      toast.success("Déplacé");
    } catch (err: any) {
      toast.error(err?.message || "Erreur lors du déplacement");
    }
  };

  /** Drop sur une carte dossier : déplacer vers ce dossier */
  const onFolderDragOver = (e: React.DragEvent, folder: DriveDomainModel.Folder) => {
    if (Array.from(e.dataTransfer.types).includes(DRIVE_DND_MIME)) {
      e.preventDefault();
      setHoverTarget(folder.id);
      e.dataTransfer.dropEffect = "move";
    }
  };
  const onFolderDragLeave = (folder: DriveDomainModel.Folder) => {
    setHoverTarget((v) => (v === folder.id ? null : v));
  };
  const onFolderDrop = async (e: React.DragEvent, folder: DriveDomainModel.Folder) => {
    setHoverTarget(null);
    const types = Array.from(e.dataTransfer.types);
    if (!types.includes(DRIVE_DND_MIME)) return;
    e.preventDefault();
    try {
      const payload = JSON.parse(e.dataTransfer.getData(DRIVE_DND_MIME)) as DriveDragPayload;
      if (payload.id === folder.id) return; // ne pas déplacer un dossier dans lui-même
      if (payload.fromParentId === folder.id) return; // déjà dedans
      await dispatch(moveEntity({ entityId: payload.id, newParentId: folder.id }) as any);
      toast.success("Déplacé");
    } catch (err: any) {
      toast.error(err?.message || "Erreur lors du déplacement");
    }
  };

  return (
    <div
      className={`rounded-lg p-2 ${hoverTarget === "CURRENT" ? "ring-2 ring-blue-400" : ""}`}
      onDragOver={onContainerDragOver}
      onDragLeave={onContainerDragLeave}
      onDrop={onContainerDrop}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {folders.map((f) => (
          <div
            key={f.id}
            className={`border rounded-lg p-3 ${hoverTarget === f.id ? "ring-2 ring-blue-400" : ""}`}
            draggable
            onDragStart={(e) => setDragData(e, f)}
            onDragOver={(e) => onFolderDragOver(e, f)}
            onDragLeave={() => onFolderDragLeave(f)}
            onDrop={(e) => onFolderDrop(e, f)}
            title={f.name}
          >
            <div className="font-medium truncate cursor-default">📁 {f.name}</div>
            <div className="text-xs opacity-70 mt-1">Dossier</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => openFolder(f.id)} className="px-2 py-1 border rounded">Ouvrir</button>
              <button onClick={() => onRename(f)} className="px-2 py-1 border rounded">Renommer</button>
              <button onClick={() => onDelete(f)} className="px-2 py-1 border rounded text-red-600">Supprimer</button>
            </div>
          </div>
        ))}

        {files.map((f) => (
          <div
            key={f.id}
            className="border rounded-lg p-3"
            draggable
            onDragStart={(e) => setDragData(e, f)}
            title={f.name}
          >
            <div className="font-medium truncate cursor-default">📄 {f.name}</div>
            <div className="text-xs opacity-70 mt-1">{f.mime || "Fichier"}</div>
            <div className="text-xs opacity-70">{(f.size / 1024).toFixed(1)} ko</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => onOpenFile(f)} className="px-2 py-1 border rounded">Consulter</button>
              <button onClick={() => onRename(f)} className="px-2 py-1 border rounded">Renommer</button>
              <button onClick={() => onDelete(f)} className="px-2 py-1 border rounded text-red-600">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
