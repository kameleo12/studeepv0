"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@root/modules/shared/react/components/ui/Dialog";
import { Input } from "@root/modules/shared/react/components/ui/Input";
import Button from "@root/modules/shared/react/components/ui/Button";
import { PencilIcon } from "@heroicons/react/24/outline";

export function RenameLibraryDialog({
  currentName,
  onRename,
}: {
  currentName: string;
  onRename: (newName: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [libraryName, setLibraryName] = useState(currentName);

  useEffect(() => {
    if (open) {
      setLibraryName(currentName);
    }
  }, [open, currentName]);

  const handleSubmit = () => {
    if (libraryName.trim() && libraryName !== currentName) {
      onRename(libraryName.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
        >
          <PencilIcon className="w-4 h-4 text-gray-600" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Library</DialogTitle>
          <DialogDescription>
            Enter a new name for this library
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
            placeholder="Library name"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={
                libraryName.trim() && libraryName !== currentName
                  ? "primary"
                  : "secondary"
              }
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
