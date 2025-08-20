import { useAppDispatch } from "@root/modules/store/store";
import { useState } from "react";
import { toast } from "react-toastify";

interface UseMediaPreviewItemParams {
  mediaId: string;
  searchId: string;
}

export const useMediaPreviewItem = ({
  mediaId,
  searchId,
}: UseMediaPreviewItemParams) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleCopyLink,
  };
};
