// modules/dofus/core/usecase/reset-item.usecase.ts
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

/**
 * Vide un slot (0..2) pour un characterId donné.
 */
export const resetItem = createAppAsyncThunk<
  { characterId: string; slotIndex: 0 | 1 | 2 },
  { characterId: string; slotIndex: 0 | 1 | 2 }
>(
  "characterSlots/resetItem",
  async (payload) => {
    return payload;
  }
);
