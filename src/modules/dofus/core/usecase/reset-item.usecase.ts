// modules/dofus/core/usecase/reset-item.usecase.ts
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

/**
 * Vide un slot (0..7) pour un characterId donné.
 */
export type SlotIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const resetItem = createAppAsyncThunk<
  { characterId: string; slotIndex: SlotIndex },
  { characterId: string; slotIndex: SlotIndex }
>(
  "characterSlots/resetItem",
  async (payload) => payload
);
