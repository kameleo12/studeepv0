import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppDispatch, AppStore } from "@root/modules/store/store";
import { getQuerySuggestions } from "./get-query-suggestions.usecase";
import { StubTiktokMediasGateway } from "@root/modules/search/gateways-impl/stub-tiktok-medias.gateway";
import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";

describe("Get Query Suggestions", () => {
  let tiktokMediasGateway: ITiktokMediasGateway;
  let dispatch: AppDispatch;
  let store: AppStore;

  beforeEach(() => {
    tiktokMediasGateway = new StubTiktokMediasGateway(
      "search-id",
      [],
      ["video tutorial", "video test"]
    );

    const initialState = createInitialState({
      querySuggestions: {
        suggestions: [],
        loading: false,
        input: "",
        error: null,
      },
    });

    store = createTestStore({
      dependencies: { tiktokMediasGateway },
      initialState,
    });
    dispatch = store.dispatch;
  });

  it("should set loading to true while fetching suggestions", async () => {
    expect(store.getState().querySuggestions.loading).toBe(false);

    const promise = dispatch(getQuerySuggestions({ input: "video" }));
    expect(store.getState().querySuggestions.loading).toBe(true);

    await promise;
    expect(store.getState().querySuggestions.loading).toBe(false);
  });

  it("should update suggestions and input correctly", async () => {
    await dispatch(getQuerySuggestions({ input: "video" }));

    expect(store.getState().querySuggestions.suggestions).toEqual([
      "video tutorial",
      "video test",
    ]);
    expect(store.getState().querySuggestions.input).toEqual("video");
  });
});
