import { AppDispatch, AppStore } from "../../../store/store";
import { createTestStore } from "../../../testing/tests-environment";

import { createInitialState } from "../../../global/core/testing/app-state.fixture";
import { ICharactersGateway } from "../gateways/stuff.gateway";
import { CharacterDomainModel } from "../model/stuff.domain-model";
import { getCharacterResults } from "../usecase/get-results.usecase";
import { StubCharactersGateway } from "../../gateways-impl/stub-stuffs.gateway";
import { createCharacterFixture } from "../testing/stuff.fixture";

describe("Get Character Results", () => {
  let charactersGateway: ICharactersGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let char1: CharacterDomainModel.Character;
  let char2: CharacterDomainModel.Character;

  beforeEach(() => {
    char1 = createCharacterFixture({ id: "1" });
    char2 = createCharacterFixture({ id: "2" });

    const state = createInitialState({
      charactersSearching: {
        searchId: "search-id",
        results: [],
        loading: true,
        started: false,
        query: "",
      },
    });

    charactersGateway = new StubCharactersGateway("search-id", [char1, char2]);

    store = createTestStore({
      dependencies: { charactersGateway },
      initialState: state,
    });
    dispatch = store.dispatch;
  });

  it("should get the results", async () => {
    await dispatch(getCharacterResults({ searchId: "search-id" }));

    expect(store.getState().charactersSearching.results).toEqual([
      char1,
      char2,
    ]);
  });

  it("should stop loading", async () => {
    await dispatch(getCharacterResults({ searchId: "search-id" }));

    expect(store.getState().charactersSearching.loading).toBe(false);
  });
});
