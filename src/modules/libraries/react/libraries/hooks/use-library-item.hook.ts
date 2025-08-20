import { useAppDispatch } from "@root/modules/store/store";
import { deleteLibrary } from "../../../core/usecases/library-handling/delete-library.usecase";
import { renameLibrary } from "../../../core/usecases/library-handling/rename-library.usecase";
import { getAllLibraries } from "../../../core/usecases/library-handling/get-all-libraries.usecase";

export const useLibraryItem = (libraryId: string, currentName: string) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this library?")) {
      dispatch(deleteLibrary({ libraryId })).then(() => {
        dispatch(getAllLibraries());
      });
    }
  };

  const handleRename = (newName: string) => {
    if (newName.trim() && newName !== currentName) {
      dispatch(renameLibrary({ libraryId, newName })).then(() => {
        dispatch(getAllLibraries());
      });
    }
  };

  return {
    handleDelete,
    handleRename,
  };
};
