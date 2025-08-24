
import { searchCharacters } from "../usecase/search-character.usecase";
import { StubCharactersGateway } from "../../gateways-impl/stub-characters.gateway";

import { AppDispatch, AppStore } from "../../../store/store";
import { createTestStore } from "../../../testing/tests-environment";
import { ICharactersGateway } from "@root/modules/dofus/core/gateways/character.gateway";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { createCharacterFixture } from "@root/modules/dofus/core/testing/character.fixture";

describe("Search Characters", () => {
  let charactersGateway: ICharactersGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let char1: CharacterDomainModel.Character;
  let char2: CharacterDomainModel.Character;

  beforeEach(() => {
    char1 = createCharacterFixture({ id: "1" });
    char2 = createCharacterFixture({ id: "2" });

    charactersGateway = new StubCharactersGateway("search-id", [char1, char2]);

    store = createTestStore({ dependencies: { charactersGateway } });
    dispatch = store.dispatch;
  });

  it("should update the query in state", async () => {
    await dispatch(searchCharacters({ query: "query" }));
    expect(store.getState().charactersSearching.query).toBe("query");
  });

  it("should directly mark the search as started (pending)", () => {
    dispatch(searchCharacters({ query: "Query" }));
    expect(store.getState().charactersSearching.started).toBe(true);
    expect(store.getState().charactersSearching.loading).toBe(true);
  });

  it("should call gateway.searchByKeyword", async () => {
    const spy = jest.spyOn(charactersGateway, "searchByKeyword");
    await dispatch(searchCharacters({ query: "query" }));
    expect(spy).toHaveBeenCalledWith("query");
  });

  it("should set the searchId", async () => {
    await dispatch(searchCharacters({ query: "query" }));
    expect(store.getState().charactersSearching.searchId).toBe("search-id");
  });
});
