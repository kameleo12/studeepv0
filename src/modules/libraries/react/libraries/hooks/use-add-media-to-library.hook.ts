import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";
import { createLibrary } from "../../../core/usecases/library-handling/create-library.usecase";
import { addMediaToLibrary } from "../../../core/usecases/media-in-library/add-media-to-library.usecase";
import { selectLibrariesList } from "../../../core/selectors/all-libraries.selector";
import { getAllLibraries } from "../../../core/usecases/library-handling/get-all-libraries.usecase";

export const useAddMediaToLibrary = (mediaId: string, searchId: string) => {
  const dispatch = useAppDispatch();
  const libraries = useSelector(selectLibrariesList);

  const handleAddToExisting = async (libraryId: string) => {
    try {
      await dispatch(
        addMediaToLibrary({ libraryId, searchId, mediaId })
      ).unwrap();
      dispatch(getAllLibraries());
    } catch (error) {
      console.error("Failed to add media:", error);
    }
  };

  const handleCreateAndAdd = async (name: string) => {
    if (!name.trim()) return;

    try {
      const libraryId = crypto.randomUUID();
      await dispatch(createLibrary({ libraryId, name, medias: [] })).unwrap();

      await dispatch(
        addMediaToLibrary({ libraryId, searchId, mediaId })
      ).unwrap();

      dispatch(getAllLibraries());
    } catch (error) {
      console.error("Failed to create library:", error);
    }
  };

  return {
    libraries,
    handleAddToExisting,
    handleCreateAndAdd,
  };
};
