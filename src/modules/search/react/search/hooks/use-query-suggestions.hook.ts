import { useEffect } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { getQuerySuggestions } from "@root/modules/search/core/usecases/search-settings/get-query-suggestions.usecase";
import { selectQuerySuggestions } from "@root/modules/search/core/selectors/query-suggestion.selector";
import { useSelector } from "react-redux";

export function useQuerySuggestions(input: string) {
  const dispatch = useAppDispatch();
  const { suggestions, isLoading, error, currentInput } = useSelector(
    selectQuerySuggestions
  );

  useEffect(() => {
    const trimmed = input.trim();
    if (trimmed.length > 0) {
      dispatch(getQuerySuggestions({ input: trimmed }));
    }
  }, [input, dispatch]);

  return {
    suggestions,
    isLoading,
    error,
    currentInput,
  };
}
