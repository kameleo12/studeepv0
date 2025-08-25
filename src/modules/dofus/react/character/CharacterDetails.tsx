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

const iconOf = (spell: CharacterDomainModel.Spell) =>
  spell.icon ?? `/dofus-img/spell-icons/${spell.id}.png`;

const SLOT_COUNT = 8 as const;

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

  const SPELL_MIME = "application/json+spell";
  const SLOT_MIME = "application/json+slot-index";

  const onSpellDragStart = (e: React.DragEvent, spell: CharacterDomainModel.Spell) => {
    e.dataTransfer.setData(SPELL_MIME, JSON.stringify(spell));
  };

  const onSlotDragStart = (e: React.DragEvent, fromIndex: 0|1|2|3|4|5|6|7) => {
    e.dataTransfer.setData(SLOT_MIME, JSON.stringify({ fromIndex }));
  };

  const handleDropOnSlot = (slotIndex: 0|1|2|3|4|5|6|7, e: React.DragEvent) => {
    e.preventDefault();

    const fromSlotRaw = e.dataTransfer.getData(SLOT_MIME);
    if (fromSlotRaw) {
      try {
        const { fromIndex } = JSON.parse(fromSlotRaw) as { fromIndex: 0|1|2|3|4|5|6|7 };
        if (fromIndex !== slotIndex && slots[fromIndex]) {
          const moved = slots[fromIndex]!;
          dispatch(addItemToCharacter({ characterId, slotIndex, spell: moved }));
          dispatch(resetItem({ characterId, slotIndex: fromIndex }));
        }
        return;
      } catch {}
    }

    const spellRaw = e.dataTransfer.getData(SPELL_MIME);
    if (spellRaw) {
      try {
        const spell = JSON.parse(spellRaw) as CharacterDomainModel.Spell;
        dispatch(addItemToCharacter({ characterId, slotIndex, spell }));
      } catch {}
    }
  };

  const resetAll = () => {
    for (let i = 0; i < SLOT_COUNT; i++) {
      // @ts-expect-error narrow to the union 0..7 if your usecase keeps a union
      dispatch(resetItem({ characterId, slotIndex: i }));
    }
  };

  if (loading || !character) return <div className="p-6">Chargement...</div>;

  return (
    <div className="flex w-full h-full p-4 md:p-6 gap-4 md:gap-6 flex-col md:flex-row">
      {/* GAUCHE : Sorts disponibles */}
      <section className="md:w-1/2 w-full bg-gray-100 rounded-xl p-4 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Sorts disponibles</h2>
          <button
            onClick={resetAll}
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
              className="text-left cursor-grab bg-white rounded-lg shadow p-3 hover:bg-gray-50 active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center gap-3"
              aria-label={`Glisser le sort ${spell.name}`}
              title={spell.name}
            >
              <img
                src={iconOf(spell)}
                alt=""
                className="w-8 h-8 rounded-md object-contain bg-gray-100"
              />
              <p className="font-medium text-sm sm:text-base truncate">{spell.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* DROITE : Infos personnage + slots */}
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
          {/* Grille responsive pour 8 slots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: SLOT_COUNT }).map((_, i) => {
              const idx = i as 0|1|2|3|4|5|6|7;
              const spell = slots[idx];
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  draggable={!!spell}
                  onDragStart={(e) => spell && onSlotDragStart(e, idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOnSlot(idx, e)}
                  className={[
                    "min-h-[5rem] sm:h-24 border-2 border-dashed rounded-lg flex items-center justify-center",
                    "bg-gray-50 hover:bg-gray-100 transition px-3 text-center",
                    spell ? "border-gray-500" : "border-gray-400",
                  ].join(" ")}
                  aria-label={`Slot ${idx + 1}`}
                >
                  <div className="w-full flex items-center justify-center gap-3">
                    {spell && (
                      <img
                        src={iconOf(spell)}
                        alt=""
                        className="w-8 h-8 rounded-md object-contain bg-gray-100"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Slot {idx + 1}</p>
                      <p className="font-medium text-sm sm:text-base truncate">
                        {spell ? spell.name : "Déposer un sort"}
                      </p>
                    </div>
                  </div>

                  {spell && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(resetItem({ characterId, slotIndex: idx }));
                      }}
                      className="mt-2 text-xs underline text-gray-600 hover:text-gray-800"
                    >
                      Retirer
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Astuce : si tu déposes un sort déjà présent ailleurs, il sera déplacé (pas dupliqué).
          </p>
        </div>
      </section>
    </div>
  );
}
