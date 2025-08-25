
import { ICharactersGateway } from "@root/modules/dofus/core/gateways/character.gateway";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { CharacterFactory } from "@root/modules/dofus/core/model/character.factory";
import { wait } from "../../shared/utils/wait.utils";

export class InMemoryCharactersGateway implements ICharactersGateway {
  private lastQuery = "";

  async searchByKeyword(query: string): Promise<{ searchId: string }> {
    this.lastQuery = (query ?? "").trim().toLowerCase();
    return { searchId: "search-id" };
  }

  async getResults(
    searchId: string
  ): Promise<CharacterDomainModel.Character[]> {
    await wait(3000);

    const q = this.lastQuery;
    if (!q) return this.characters;

    return this.characters.filter((c) => {
      const inName = c.name.toLowerCase().includes(q);
      const inSpells = c.spells.some((s) => s.name.toLowerCase().includes(q));
      return inName || inSpells;
    });
  }

  async getById(
    characterId: string,
    _searchId: string
  ): Promise<CharacterDomainModel.Character | undefined> {
    return this.characters.find((c) => c.id === characterId);
  }

  // --- Données en mémoire ---
 // --- Données en mémoire ---
private readonly characters: CharacterDomainModel.Character[] = [
  CharacterFactory.create({
    id: "1",
    name: "Iop",
    thumbnail: "/dofus-img/character-img/iop.png",
    spells: [
      { id: "iop_1", name: "Pressure", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "iop_2", name: "Intimidation", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "iop_3", name: "Jump", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "iop_4", name: "Iop's Wrath", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "iop_5", name: "Sword of Iop", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "iop_6", name: "Concentration", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "iop_7", name: "Divine Sword", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "iop_8", name: "Cut", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "iop_9", name: "Power", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "iop_10", name: "Brokle", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "2",
    name: "Cra",
    thumbnail: "/dofus-img/character-img/cra.png",
    spells: [
      { id: "cra_1", name: "Magic Arrow", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "cra_2", name: "Frost Arrow", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "cra_3", name: "Retreat Arrow", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "cra_4", name: "Plaguing Arrow", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "cra_5", name: "Burning Arrow", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "cra_6", name: "Explosive Arrow", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "cra_7", name: "Punitive Arrow", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "cra_8", name: "Absorptive Arrow", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "cra_9", name: "Tormenting Arrow", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "cra_10", name: "Paralyzing Arrow", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "3",
    name: "Eniripsa",
    thumbnail: "/dofus-img/character-img/eniripsa.png",
    spells: [
      { id: "eni_1", name: "Word of Recovery", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "eni_2", name: "Stimulating Word", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "eni_3", name: "Preventing Word", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "eni_4", name: "Regenerating Word", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "eni_5", name: "Word of Recovery", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "eni_6", name: "Word of Altruism", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "eni_7", name: "Motivating Word", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "eni_8", name: "Revitalizing Word", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "eni_9", name: "Lethargy Word", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "eni_10", name: "Friendship Word", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "4",
    name: "Enutrof",
    thumbnail: "/dofus-img/character-img/enutrof.png",
    spells: [
      { id: "enu_1", name: "Shovel Throwing", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "enu_2", name: "Living Shovel", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "enu_3", name: "Ghostly Shovel", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "enu_4", name: "Reducing Key", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "enu_5", name: "Clumsiness", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "enu_6", name: "Bribery", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "enu_7", name: "Greed", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "enu_8", name: "Shovel Kiss", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "enu_9", name: "Fortune", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "enu_10", name: "Prime of Life", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "5",
    name: "Sram",
    thumbnail: "/dofus-img/character-img/sram.png",
    spells: [
      { id: "sram_1", name: "Invisibility", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "sram_2", name: "Tricky Blow", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "sram_3", name: "Trap of Silence", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "sram_4", name: "Fear", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "sram_5", name: "Lethal Attack", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "sram_6", name: "Mistake", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "sram_7", name: "Poisoned Trap", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "sram_8", name: "Repelling Trap", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "sram_9", name: "Chakra Concentration", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "sram_10", name: "Invisibility of Others", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "6",
    name: "Sacrieur",
    thumbnail: "/dofus-img/character-img/sacrieur.png",
    spells: [
      { id: "sac_1", name: "Punishment", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "sac_2", name: "Transposition", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "sac_3", name: "Attraction", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "sac_4", name: "Sacrifice", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "sac_5", name: "Cooperation", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "sac_6", name: "Fury", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "sac_7", name: "Bloodthirsty Madness", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "sac_8", name: "Dissolution", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "sac_9", name: "Assault", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "sac_10", name: "Bold Punishment", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "7",
    name: "Feca",
    thumbnail: "/dofus-img/character-img/feca.png",
    spells: [
      { id: "feca_1", name: "Natural Attack", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "feca_2", name: "Glyph of Blindness", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "feca_3", name: "Bastion", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "feca_4", name: "Truce", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "feca_5", name: "Teleportation", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "feca_6", name: "Glowing Armor", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "feca_7", name: "Aqueous Armor", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "feca_8", name: "Earth Armor", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "feca_9", name: "Wind Armor", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "feca_10", name: "Immunity", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "8",
    name: "Osamodas",
    thumbnail: "/dofus-img/character-img/osamodas.png",
    spells: [
      { id: "osa_1", name: "Summoning of Tofu", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "osa_2", name: "Summoning of Gobball", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "osa_3", name: "Summoning of Prespic", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "osa_4", name: "Whip", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "osa_5", name: "Animal Healing", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "osa_6", name: "Bear Cry", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "osa_7", name: "Toad", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "osa_8", name: "High-energy Shot", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "osa_9", name: "Spiritual Leash", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "osa_10", name: "Feline Movement", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "9",
    name: "Xelor",
    thumbnail: "/dofus-img/character-img/xelor.png",
    spells: [
      { id: "xel_1", name: "Flight", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "xel_2", name: "Time Theft", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "xel_3", name: "Rollback", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "xel_4", name: "Temporal Dust", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "xel_5", name: "Devotion", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "xel_6", name: "Mummification", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "xel_7", name: "Frostbite", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "xel_8", name: "Hand", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "xel_9", name: "Xelor's Punishment", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "xel_10", name: "Teleportation", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "10",
    name: "Ecaflip",
    thumbnail: "/dofus-img/character-img/ecaflip.png",
    spells: [
      { id: "eca_1", name: "Heads or Tails", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "eca_2", name: "All or Nothing", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "eca_3", name: "Clover", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "eca_4", name: "Felintion", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "eca_5", name: "Rekop", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "eca_6", name: "Perception", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "eca_7", name: "Playful Claw", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "eca_8", name: "Topkaj", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "eca_9", name: "Wheel of Fortune", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "eca_10", name: "Reflex", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "11",
    name: "Pandawa",
    thumbnail: "/dofus-img/character-img/pandawa.png",
    spells: [
      { id: "panda_1", name: "Karcham", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "panda_2", name: "Chamrak", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "panda_3", name: "Pandatak", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "panda_4", name: "Vulnerability", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "panda_5", name: "Bamboo Milk", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "panda_6", name: "Alcoholic Breath", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "panda_7", name: "Stabilization", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "panda_8", name: "Zatoïshwan's Wrath", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "panda_9", name: "Vertigo", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "panda_10", name: "Explosive Flask", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "12",
    name: "Sadida",
    thumbnail: "/dofus-img/character-img/sadida.png",
    spells: [
      { id: "sadi_1", name: "Manifold Bramble", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "sadi_2", name: "Bramble", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "sadi_3", name: "The Tree", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "sadi_4", name: "Insolent Bramble", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "sadi_5", name: "Dolly Sacrifice", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "sadi_6", name: "Madoll", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "sadi_7", name: "Sacrificial Doll", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "sadi_8", name: "Ultra-Powerful", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "sadi_9", name: "Wild Grass", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "sadi_10", name: "Earthquake", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "13",
    name: "Roublard",
    thumbnail: "/dofus-img/character-img/roublard.png",
    spells: [
      { id: "rogue_1", name: "Boomerang Daggers", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "rogue_2", name: "Kaboom", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "rogue_3", name: "Rogues' Ruse", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "rogue_4", name: "Remission", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "rogue_5", name: "Blunderbuss", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "rogue_6", name: "Deception", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "rogue_7", name: "Extraction", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "rogue_8", name: "Pulmonary", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "rogue_9", name: "Detonation", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "rogue_10", name: "Rougery", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "14",
    name: "Zobal",
    thumbnail: "/dofus-img/character-img/zobal.png",
    spells: [
      { id: "zobal_1", name: "Furia", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "zobal_2", name: "Apathy", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "zobal_3", name: "Picada", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "zobal_4", name: "Reinforcement", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "zobal_5", name: "Plastron", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "zobal_6", name: "Masquerade", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "zobal_7", name: "Boliche", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "zobal_8", name: "Diffraction", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "zobal_9", name: "Pursuit", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "zobal_10", name: "Capering", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "15",
    name: "Steamer",
    thumbnail: "/dofus-img/character-img/steamer.png",
    spells: [
      { id: "steamer_1", name: "Harpooner", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "steamer_2", name: "Tacturret", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "steamer_3", name: "Lifesaver", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "steamer_4", name: "Ambush", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "steamer_5", name: "Anchor", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "steamer_6", name: "Scaphander", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "steamer_7", name: "Backwash", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "steamer_8", name: "Drill", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "steamer_9", name: "Evolution", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "steamer_10", name: "Froth", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "16",
    name: "Eliotrope",
    thumbnail: "/dofus-img/character-img/eliotrope.png",
    spells: [
      { id: "elio_1", name: "Portal", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "elio_2", name: "Wakfu Ray", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "elio_3", name: "Unleashed Blade", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "elio_4", name: "Pulsation", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "elio_5", name: "Distribution", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "elio_6", name: "Clash", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "elio_7", name: "Conflagration", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "elio_8", name: "Commotion", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "elio_9", name: "Stupefaction", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "elio_10", name: "Respite", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "17",
    name: "Huppermage",
    thumbnail: "/dofus-img/character-img/huppermage.png",
    spells: [
      { id: "hup_1", name: "Runic Treatment", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "hup_2", name: "Runification", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "hup_3", name: "Solar Ray", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "hup_4", name: "Telluric Wave", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "hup_5", name: "Torrential Flux", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "hup_6", name: "Tempest", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "hup_7", name: "Convergence", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "hup_8", name: "Distortion", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "hup_9", name: "Counter", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "hup_10", name: "Manifestation", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "18",
    name: "Ouginak",
    thumbnail: "/dofus-img/character-img/ouginak.png",
    spells: [
      { id: "oug_1", name: "Prey", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "oug_2", name: "Rabies", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "oug_3", name: "Carcass", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "oug_4", name: "Overpowering", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "oug_5", name: "Appeasement", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "oug_6", name: "Bone Fracture", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "oug_7", name: "Terrifying Bark", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "oug_8", name: "Canine", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "oug_9", name: "Whipkick", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "oug_10", name: "Sniff", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
  CharacterFactory.create({
    id: "19",
    name: "Forgelance",
    thumbnail: "/dofus-img/character-img/forgelance.png",
    spells: [
      { id: "fl_1", name: "Lancer", icon: "/dofus-img/spell-img/icon_1.png" },
      { id: "fl_2", name: "Retrieve Lance", icon: "/dofus-img/spell-img/icon_2.png" },
      { id: "fl_3", name: "Repercussion", icon: "/dofus-img/spell-img/icon_3.png" },
      { id: "fl_4", name: "Ricochet", icon: "/dofus-img/spell-img/icon_4.png" },
      { id: "fl_5", name: "Fulmination", icon: "/dofus-img/spell-img/icon_5.png" },
      { id: "fl_6", name: "Jag", icon: "/dofus-img/spell-img/icon_6.png" },
      { id: "fl_7", name: "Lancing Charge", icon: "/dofus-img/spell-img/icon_7.png" },
      { id: "fl_8", name: "Cover", icon: "/dofus-img/spell-img/icon_8.png" },
      { id: "fl_9", name: "Convergence", icon: "/dofus-img/spell-img/icon_9.png" },
      { id: "fl_10", name: "Counterweight", icon: "/dofus-img/spell-img/icon_10.png" },
    ],
  }),
]};

