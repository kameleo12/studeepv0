// modules/drive/react/components/Toolbar.tsx
"use client";
import { useDispatch, useSelector } from "react-redux";
import { createFolder, uploadFiles } from "@root/modules/drive/core/reducers/drive-tree.slice";
import { AppState } from "@root/modules/store/app-state";
import { toast } from "react-toastify";
import { useRef } from "react";

export default function Toolbar() {
  const dispatch = useDispatch();
  const currentFolderId = useSelector((s: AppState) => s.driveTree.currentFolderId);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onNewFolder = async () => {
    const name = window.prompt("Nom du nouveau dossier");
    if (!name) return;
    try {
      await dispatch(createFolder({ parentId: currentFolderId ?? null, name }) as any);
      toast.success("Dossier créé");
    } catch (e: any) {
      toast.error(e?.message || "Erreur lors de la création du dossier");
    }
  };

  const onUploadClick = () => fileInputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      await dispatch(uploadFiles({ parentId: currentFolderId ?? null, files }) as any);
      toast.success("Fichier(s) importé(s)");
    } catch (e: any) {
      toast.error(e?.message || "Erreur lors de l’import");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2 my-3">
      <button
        onClick={onNewFolder}
        className="px-3 py-2 rounded-md border hover:bg-gray-50"
      >
        Nouveau dossier
      </button>

      <button
        onClick={onUploadClick}
        className="px-3 py-2 rounded-md border hover:bg-gray-50"
      >
        Importer des fichiers
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
