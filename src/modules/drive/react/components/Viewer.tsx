// modules/drive/react/components/Viewer.tsx
"use client";
import { useSelector } from "react-redux";
import { AppState } from "@root/modules/store/app-state";
import { useAppDispatch } from "@root/modules/store/store";
import { closeViewer, saveTextFile, setMode, setTextContent } from "@root/modules/drive/core/reducers/drive-viewer.slice";
import { selectFileById } from "@root/modules/drive/core/selectors/drive.selectors";
import { useMemo } from "react";

export default function Viewer() {
  const dispatch = useAppDispatch();
  const { openedFileId, blobUrl, textContent, mode, loading, error } = useSelector((s: AppState) => s.driveViewer);
  const fileMeta = useSelector((s: AppState) => (openedFileId ? selectFileById(openedFileId)(s) : undefined));

  const isOpen = !!openedFileId;
  const canEditText = useMemo(() => {
    const mime = fileMeta?.mime || "";
    return mime.startsWith("text/") || ["application/json", "application/markdown"].includes(mime);
  }, [fileMeta?.mime]);

  if (!isOpen) return null;

  const onSave = async () => {
    if (!openedFileId || textContent == null) return;
    await dispatch(saveTextFile({ fileId: openedFileId, content: textContent, mime: fileMeta?.mime }) as any);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-stretch justify-center p-0 md:p-4">
      <div className="bg-white w-full max-w-6xl h-screen md:h-[calc(100vh-2rem)] rounded-none md:rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <div className="font-semibold truncate">{fileMeta?.name || "Fichier"}</div>
          <div className="flex gap-2">
            {canEditText && (
              <>
                <button
                  className={`px-2 py-1 border rounded ${mode === "preview" ? "bg-gray-100" : ""}`}
                  onClick={() => dispatch(setMode("preview"))}
                >
                  Aperçu
                </button>
                <button
                  className={`px-2 py-1 border rounded ${mode === "edit" ? "bg-gray-100" : ""}`}
                  onClick={() => dispatch(setMode("edit"))}
                >
                  Éditer
                </button>
              </>
            )}
            <button className="px-2 py-1 border rounded" onClick={() => dispatch(closeViewer())}>Fermer</button>
          </div>
        </div>

        {/* Content: prend toute la hauteur dispo */}
        <div className="p-3 flex-1 min-h-0">
          {loading && <div className="text-sm opacity-70">Chargement…</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}

          {!loading && !error && (
            <>
              {mode === "edit" && canEditText && (
                <textarea
                  className="w-full h-full border rounded p-2 font-mono text-sm"
                  value={textContent ?? ""}
                  onChange={(e) => dispatch(setTextContent(e.target.value))}
                />
              )}

              {mode === "preview" && blobUrl && (
                <iframe
                  src={blobUrl}
                  className="w-full h-full border rounded"
                  title="Aperçu du fichier"
                />
              )}

              {mode === "preview" && !blobUrl && textContent != null && (
                <pre className="w-full h-full overflow-auto border rounded p-3 bg-gray-50 whitespace-pre-wrap break-words">
                  {textContent}
                </pre>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex justify-end gap-2">
          {mode === "edit" && canEditText && (
            <button className="px-3 py-2 border rounded bg-gray-100" onClick={onSave} disabled={loading}>
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
