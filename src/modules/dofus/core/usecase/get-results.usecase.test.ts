import { AppDispatch, AppStore } from "../../../store/store";
import { createTestStore } from "../../../testing/tests-environment";

import { createInitialState } from "../../../global/core/testing/app-state.fixture";
import { ICharactersGateway } from "@root/modules/dofus/core/gateways/character.gateway";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { createCharacterFixture } from "@root/modules/dofus/core/testing/character.fixture";
import { getCharacterResults } from "@root/modules/dofus/core/usecase/get-results.usecase";
import { StubCharactersGateway } from "@root/modules/dofus/gateways-impl/stub-characters.gateway";


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
