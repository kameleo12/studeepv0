import { createAppAsyncThunk } from "../../../store/create-app-async-thunk";
import { CharacterDomainModel } from "../model/stuff.domain-model";

export const getCharacterById = createAppAsyncThunk<
  CharacterDomainModel.Character | undefined,
  { characterId: string; searchId: string }
>(
  "character/getCharacterById",
  async ({ characterId, searchId }, { extra }) => {
    const { charactersGateway } = extra;
    const character = await charactersGateway.getById(characterId, searchId);
    return character;
  }
);
