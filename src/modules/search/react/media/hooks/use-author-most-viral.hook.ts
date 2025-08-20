import { useSelector } from "react-redux";
import { selectAuthorMostViral } from "../../../core/selectors/author-most-viral.selector";

export const useAuthorMostViral = () => {
  const medias = useSelector(selectAuthorMostViral);
  return { medias };
};
