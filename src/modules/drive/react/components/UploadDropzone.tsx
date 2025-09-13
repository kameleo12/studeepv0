// modules/drive/react/components/UploadDropzone.tsx
"use client";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFiles } from "@root/modules/drive/core/reducers/drive-tree.slice";
import { AppState } from "@root/modules/store/app-state";
import { toast } from "react-toastify";
import { DRIVE_DND_MIME } from "@root/modules/drive/core/constants";

export default function UploadDropzone() {
  const dispatch = useDispatch();
  const [over, setOver] = useState(false);
  const currentFolderId = useSelector((s: AppState) => s.driveTree.currentFolderId);

  const isInternalDrag = (e: React.DragEvent) => Array.from(e.dataTransfer.types).includes(DRIVE_DND_MIME);

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);

    // Si c’est un DnD interne (déplacement d’entité), on N’INTERVIENT PAS ici
    if (isInternalDrag(e)) return;

    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    try {
      await dispatch(uploadFiles({ parentId: currentFolderId ?? null, files }) as any);
      toast.success("Fichier(s) importé(s)");
    } catch (err: any) {
      toast.error(err?.message || "Erreur lors de l’import");
    }
  }, [dispatch, currentFolderId]);

  const onDragOver = (e: React.DragEvent) => {
    // On ne se met pas en surbrillance pour les DnD internes
    if (isInternalDrag(e)) return;
    e.preventDefault();
    setOver(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    if (isInternalDrag(e)) return;
    e.preventDefault();
    setOver(false);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition ${over ? "bg-gray-50" : ""}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      Glissez-déposez des fichiers ici pour les importer
    </div>
  );
}
