import { getCharacterById } from "./get-stuff-by-id.usecase";
import { createTestStore } from "../../../testing/tests-environment";
import { AppStore, AppDispatch } from "../../../store/store";
import { CharacterDomainModel } from "../model/stuff.domain-model";
import { StubCharactersGateway } from "../../gateways-impl/stub-stuffs.gateway";
import { createCharacterFixture } from "../testing/stuff.fixture";

describe("Get character by id", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let charactersGateway: StubCharactersGateway;
  let char1: CharacterDomainModel.Character;
  let char2: CharacterDomainModel.Character;

  beforeEach(() => {
    char1 = createCharacterFixture({ id: "1" });
    char2 = createCharacterFixture({ id: "2" });

    charactersGateway = new StubCharactersGateway("search-id", [char1, char2]);

    store = createTestStore({
      initialState: {
        charactersSearching: {
          results: [char1, char2],
          query: "testquery",
          loading: false,
          started: true,
          searchId: "search-id",
        },
        currentCharacter: {
          character: char1,
          loading: false,
        },
      },
      dependencies: {
        charactersGateway,
      },
    });

    dispatch = store.dispatch;
  });

  it("Should get the character by id and handle loading state", async () => {
    expect(store.getState().currentCharacter.loading).toBe(false);

    const promise = dispatch(
      getCharacterById({ characterId: char1.id, searchId: "search-id" })
    );

    expect(store.getState().currentCharacter.loading).toBe(true);

    await promise;

    expect(store.getState().currentCharacter.loading).toBe(false);
    expect(store.getState().currentCharacter.character).toEqual(char1);
  });
});
