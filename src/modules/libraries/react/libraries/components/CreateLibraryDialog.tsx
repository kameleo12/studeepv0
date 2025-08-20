"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../shared/react/components/ui/Dialog";
import Button from "../../../../shared/react/components/ui/Button";
import { Input } from "../../../../shared/react/components/ui/Input";

export function CreateLibraryDialog({
  onCreate,
}: {
  onCreate: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [libraryName, setLibraryName] = useState("");

  const handleSubmit = () => {
    if (!libraryName.trim()) return;
    onCreate(libraryName);
    setOpen(false);
    setLibraryName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Create Library
          </Button>
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create New Library
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Enter a name for your new TikTok library.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
            placeholder="Library name"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <Button
            onClick={handleSubmit}
            variant={libraryName.trim() ? "primary" : "secondary"}
          >
            Save Library
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
