"use client";

import { useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";

import { getCharacterById } from "@root/modules/dofus/core/usecase/get-character-by-id.usecase";
import { addItemToCharacter } from "@root/modules/dofus/core/usecase/add-item-to-character.usecase";
import { resetItem } from "@root/modules/dofus/core/usecase/reset-item.usecase";
import { AppState } from "@root/modules/store/app-state";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { selectCharacterSlots } from "@root/modules/dofus/core/selectors/character-slot.selector";

export default function CharacterDetails() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchParams = useSearchParams();

  const characterId = params?.id as string;
  const searchId = searchParams.get("searchId") ?? "";

  const { loading, character } = useSelector((s: AppState) => s.currentCharacter);
  const slots = useSelector((s: AppState) => selectCharacterSlots(s, characterId));

  useEffect(() => {
    if (characterId && searchId) {
      dispatch(getCharacterById({ characterId, searchId }));
    }
  }, [characterId, searchId, dispatch]);

  // MIME types pour éviter les collisions entre DnD
  const SPELL_MIME = "application/json+spell";
  const SLOT_MIME = "application/json+slot-index";

  const onSpellDragStart = (e: React.DragEvent, spell: CharacterDomainModel.Spell) => {
    e.dataTransfer.setData(SPELL_MIME, JSON.stringify(spell));
  };

  const onSlotDragStart = (e: React.DragEvent, fromIndex: 0 | 1 | 2) => {
    e.dataTransfer.setData(SLOT_MIME, JSON.stringify({ fromIndex }));
  };

  const handleDropOnSlot = (slotIndex: 0 | 1 | 2, e: React.DragEvent) => {
    e.preventDefault();

    // 1) Déplacement d’un slot vers un autre
    const fromSlotRaw = e.dataTransfer.getData(SLOT_MIME);
    if (fromSlotRaw) {
      try {
        const { fromIndex } = JSON.parse(fromSlotRaw) as { fromIndex: 0 | 1 | 2 };
        if (fromIndex !== slotIndex && slots[fromIndex]) {
          // Déplacement = set dans la nouvelle case + reset dans l’ancienne
          const moved = slots[fromIndex]!;
          dispatch(addItemToCharacter({ characterId, slotIndex, spell: moved }));
          dispatch(resetItem({ characterId, slotIndex: fromIndex }));
        }
        return;
      } catch { /* noop */ }
    }

    // 2) Drop depuis la liste des sorts
    const spellRaw = e.dataTransfer.getData(SPELL_MIME);
    if (spellRaw) {
      try {
        const spell = JSON.parse(spellRaw) as CharacterDomainModel.Spell;
        dispatch(addItemToCharacter({ characterId, slotIndex, spell }));
      } catch { /* noop */ }
    }
  };

  if (loading || !character) return <div className="p-6">Chargement...</div>;

  return (
    <div className="flex w-full h-full p-4 md:p-6 gap-4 md:gap-6 flex-col md:flex-row">
      {/* --- GAUCHE (haut sur mobile) : Sorts disponibles --- */}
      <section className="md:w-1/2 w-full bg-gray-100 rounded-xl p-4 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Sorts disponibles</h2>
          <button
            onClick={() => {
              // reset des 3 slots
              dispatch(resetItem({ characterId, slotIndex: 0 }));
              dispatch(resetItem({ characterId, slotIndex: 1 }));
              dispatch(resetItem({ characterId, slotIndex: 2 }));
            }}
            className="text-sm rounded-lg px-3 py-1 bg-white shadow hover:bg-gray-50"
          >
            Reset slots
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {character.spells.map((spell) => (
            <button
              key={spell.id}
              draggable
              onDragStart={(e) => onSpellDragStart(e, spell)}
              className="text-left cursor-grab bg-white rounded-lg shadow p-3 hover:bg-gray-50 active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label={`Glisser le sort ${spell.name}`}
              title={spell.name}
            >
              <p className="font-medium text-sm sm:text-base">{spell.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* --- DROITE (bas sur mobile) : Infos personnage + slots --- */}
      <section className="md:w-1/2 w-full flex flex-col gap-4 md:gap-6">
        <div className="flex items-center gap-4">
          <img
            src={character.thumbnail}
            alt={character.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg shadow object-contain bg-white"
          />
          <h1 className="text-xl sm:text-2xl font-bold truncate">{character.name}</h1>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Slots sélectionnés</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {([0, 1, 2] as const).map((i) => {
              const spell = slots[i];
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  draggable={!!spell}
                  onDragStart={(e) => spell && onSlotDragStart(e, i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOnSlot(i, e)}
                  className={[
                    "flex-1 min-h-[5rem] sm:h-24 border-2 border-dashed rounded-lg flex items-center justify-center",
                    "bg-gray-50 hover:bg-gray-100 transition px-2 text-center",
                    spell ? "border-gray-500" : "border-gray-400",
                  ].join(" ")}
                  aria-label={`Slot ${i + 1}`}
                >
                  <div className="w-full">
                    <p className="text-xs text-gray-500 mb-1">Slot {i + 1}</p>
                    <p className="font-medium text-sm sm:text-base truncate">
                      {spell ? spell.name : "Déposer un sort"}
                    </p>
                    {spell && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(resetItem({ characterId, slotIndex: i }));
                        }}
                        className="mt-2 text-xs underline text-gray-600 hover:text-gray-800"
                      >
                        Retirer
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Astuce : glisse un slot rempli vers un autre pour les échanger.
          </p>
        </div>
      </section>
    </div>
  );
}
