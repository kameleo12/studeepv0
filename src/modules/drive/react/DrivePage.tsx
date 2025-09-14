// modules/drive/react/DrivePage.tsx
"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@root/modules/store/store";
import { listFolder } from "@root/modules/drive/core/reducers/drive-tree.slice";
import { AppState } from "@root/modules/store/app-state";
import Breadcrumbs from "./components/Breadcrumbs";
import Toolbar from "./components/Toolbar";
import FileGrid from "./components/FileGrid";
import UploadDropzone from "./components/UploadDropzone";
import Viewer from "./components/Viewer";

export default function DrivePage() {
  const dispatch = useAppDispatch();
  const loading = useSelector((s: AppState) => s.driveTree.loading);
  const error = useSelector((s: AppState) => s.driveTree.error);
  const currentFolderId = useSelector(
    (s: AppState) => s.driveTree.currentFolderId
  );

  useEffect(() => {
    // Charger la racine au premier rendu
    dispatch(listFolder({ folderId: null }) as any);
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Mon Drive</h1>
        <button
          onClick={() =>
            dispatch(listFolder({ folderId: currentFolderId ?? null }) as any)
          }
          className="px-3 py-2 rounded-md border hover:bg-gray-50"
        >
          Rafraîchir
        </button>
      </div>

      <Breadcrumbs />
      <Toolbar />
      <UploadDropzone />

      {error && (
        <div className="mt-3 p-3 border border-red-300 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-4">
        {loading && <div className="text-sm opacity-70">Chargement…</div>}
        {!loading && <FileGrid folderId={currentFolderId ?? null} />}
      </div>

      <Viewer />
    </div>
  );
}
