"use client";

import { Link } from "@root/modules/shared/react/libs/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import libraryImg from "@root/assets/images/library.png";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useLibraryItem } from "../hooks/use-library-item.hook";
import { RenameLibraryDialog } from "./RenameLibraryDialog";

export default function LibraryItem({
  id,
  name,
  totalMedias,
}: {
  id: string;
  name: string;
  totalMedias: number;
}) {
  const placeholderImg = libraryImg;
  const { handleDelete, handleRename } = useLibraryItem(id, name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 group relative"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="absolute -top-2 -right-2 z-10 p-2 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        <TrashIcon className="w-5 h-5 text-white" />
      </button>

      <div className="w-[250px] p-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer ease rounded-xl">
        <Link href={`/libraries/${id}`}>
          <div className="relative">
            <Image
              alt="Library placeholder"
              width={300}
              height={300}
              src={placeholderImg}
              className="rounded-xl w-[230px] h-[230px]"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <Link
              href={`/library/${id}`}
              className="text-md font-bold leading-4 truncate hover:underline"
            >
              {name}
            </Link>
            <RenameLibraryDialog currentName={name} onRename={handleRename} />
          </div>
          <p className="text-gray-500 text-sm mt-1 font-light">
            {totalMedias} medias
          </p>
        </div>
      </div>
    </motion.div>
  );
}
