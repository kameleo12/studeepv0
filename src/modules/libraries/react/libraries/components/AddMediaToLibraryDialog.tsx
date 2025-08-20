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
import { useAddMediaToLibrary } from "../hooks/use-add-media-to-library.hook";
import { LibraryIcon } from "./LibraryIcon";
import { motion } from "framer-motion";

export function AddMediaToLibraryDialog({
  mediaId,
  searchId,
  trigger,
}: {
  mediaId: string;
  searchId: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState("");
  const { libraries, handleAddToExisting, handleCreateAndAdd } =
    useAddMediaToLibrary(mediaId, searchId);

  useEffect(() => {
    if (!open) {
      setNewLibraryName("");
    }
  }, [open]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newLibraryName.trim()) {
      await handleCreateAndAdd(newLibraryName.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <span>{trigger}</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Library</DialogTitle>
          <DialogDescription>
            Choose an existing library or create a new one
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="max-h-[300px] overflow-y-auto">
            {libraries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No libraries found
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {libraries.map((library) => (
                  <motion.div
                    key={library.id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => {
                      handleAddToExisting(library.id);
                      setOpen(false);
                    }}
                  >
                    <LibraryIcon
                      id={library.id}
                      name={library.name}
                      totalMedias={library.totalMedias}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                Or create new library
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              value={newLibraryName}
              onChange={(e) => setNewLibraryName(e.target.value)}
              placeholder="New library name"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            <Button
              variant={newLibraryName.trim() ? "primary" : "secondary"}
              onClick={handleSubmit}
            >
              Create and Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
