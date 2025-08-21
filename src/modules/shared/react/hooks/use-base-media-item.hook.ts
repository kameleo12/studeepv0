import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@root/modules/store/store";


interface UseBaseMediaActionsParams {
  playUrl: string;
  cookie: string;
}

export const useBaseMediaActions = ({
  playUrl,
  cookie,
}: UseBaseMediaActionsParams) => {
  const [isHovered, setIsHovered] = useState(false);


  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("ok");
  };

  return { isHovered, setIsHovered, handleCopyLink };
};
