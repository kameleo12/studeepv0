// modules/drive/react/components/Breadcrumbs.tsx
"use client";
import { useSelector } from "react-redux";
import { listFolder, moveEntity } from "@root/modules/drive/core/reducers/drive-tree.slice";
import { selectBreadcrumb } from "@root/modules/drive/core/selectors/drive.selectors";
import { AppState } from "@root/modules/store/app-state";
import { useAppDispatch } from "@root/modules/store/store";
import { DriveDomainModel } from "@root/modules/drive/core/model/drive.domain-model";
import { DRIVE_DND_MIME, DriveDragPayload } from "@root/modules/drive/core/constants";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";

export default function Breadcrumbs() {
  const dispatch = useAppDispatch();

  const chain = useSelector<AppState, DriveDomainModel.Folder[]>(selectBreadcrumb);
  const currentFolderId = useSelector<AppState, string | null>((s) => s.driveTree.currentFolderId);
  const currentFolder = useSelector((s: AppState) =>
    currentFolderId ? s.driveTree.foldersById[currentFolderId] : undefined
  );

  const showBack = useMemo(() => currentFolderId !== null, [currentFolderId]);
  const parentId: string | null = currentFolder?.parentId ?? null;

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [hoverBack, setHoverBack] = useState<boolean>(false);

  const goBack = () => {
    dispatch(listFolder({ folderId: parentId }) as any);
  };

  const allowDnD = (e: React.DragEvent) => {
    if (Array.from(e.dataTransfer.types).includes(DRIVE_DND_MIME)) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      return true;
    }
    return false;
  };

  const onDropToFolder = async (e: React.DragEvent, folder: DriveDomainModel.Folder) => {
    setHoverId(null);
    if (!allowDnD(e)) return;
    try {
      const payload = JSON.parse(e.dataTransfer.getData(DRIVE_DND_MIME)) as DriveDragPayload;
      if (payload.id === folder.id) return;            // ne pas déplacer un dossier dans lui-même
      if (payload.fromParentId === folder.id) return;  // déjà dedans
      await dispatch(moveEntity({ entityId: payload.id, newParentId: folder.id }) as any);
      toast.success("Déplacé");
    } catch (err: any) {
      toast.error(err?.message || "Erreur lors du déplacement");
    }
  };

  const onDropToParent = async (e: React.DragEvent) => {
    setHoverBack(false);
    if (!allowDnD(e)) return;
    try {
      const payload = JSON.parse(e.dataTransfer.getData(DRIVE_DND_MIME)) as DriveDragPayload;
      // parentId peut être null (retour à la racine)
      if (payload.fromParentId === parentId) return; // déjà dans le parent
      await dispatch(moveEntity({ entityId: payload.id, newParentId: parentId }) as any);
      toast.success(parentId ? "Déplacé vers le dossier parent" : "Déplacé à la racine");
    } catch (err: any) {
      toast.error(err?.message || "Erreur lors du déplacement");
    }
  };

  return (
    <nav className="text-sm mb-2 flex flex-wrap items-center gap-2">
      {showBack && (
        <button
          className={`px-2 py-1 border rounded hover:bg-gray-50 ${hoverBack ? "ring-2 ring-blue-400" : ""}`}
          onClick={goBack}
          title="Revenir au dossier parent"
          onDragOver={(e) => { if (allowDnD(e)) setHoverBack(true); }}
          onDragLeave={() => setHoverBack(false)}
          onDrop={onDropToParent}
        >
          ← Retour
        </button>
      )}

      {/* Fil d’Ariane */}
      <div className="flex flex-wrap items-center gap-1">
        {chain.map((f, idx) => (
          <span key={f.id} className="flex items-center gap-1">
            {idx > 0 && <span>/</span>}
            <button
              className={`underline hover:no-underline rounded px-1 ${hoverId === f.id ? "ring-2 ring-blue-400" : ""} ${currentFolderId === f.id ? "font-semibold" : ""}`}
              onClick={() => dispatch(listFolder({ folderId: f.id }) as any)}
              onDragOver={(e) => { if (allowDnD(e)) setHoverId(f.id); }}
              onDragLeave={() => setHoverId((v) => (v === f.id ? null : v))}
              onDrop={(e) => onDropToFolder(e, f)}
            >
              {f.name}
            </button>
          </span>
        ))}
      </div>
    </nav>
  );
}
