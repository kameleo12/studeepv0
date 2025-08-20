import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { useAppDispatch } from "@root/modules/store/store";
import { fetchMediaBlob } from "@root/modules/search/core/usecases/video-fetching/fetch-media-blob.usecase";

interface UseBaseMediaActionsParams {
  playUrl: string;
  cookie: string;
}

export const useBaseMediaActions = ({
  playUrl,
  cookie,
}: UseBaseMediaActionsParams) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation("search");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isHovered) {
      dispatch(fetchMediaBlob({ playUrl, cookie }));
    }
  }, [isHovered, playUrl, cookie, dispatch]);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success(t("copyToClipboard"));
  };

  return { isHovered, setIsHovered, handleCopyLink };
};
