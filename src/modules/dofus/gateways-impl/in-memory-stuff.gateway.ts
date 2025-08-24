import { ICharactersGateway } from "../core/gateways/stuff.gateway";
import { CharacterDomainModel } from "../core/model/stuff.domain-model";
import { CharacterFactory } from "../core/model/stuff.factory";
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
  private readonly characters: CharacterDomainModel.Character[] = [
    CharacterFactory.create({
      id: "1",
      name: "Iop",
      thumbnail: "/dofus-img/character-img/iop.png",
      spells: [
        { id: "iop_1", name: "Pressure" },
        { id: "iop_2", name: "Intimidation" },
        { id: "iop_3", name: "Jump" },
        { id: "iop_4", name: "Iop's Wrath" },
        { id: "iop_5", name: "Sword of Iop" },
        { id: "iop_6", name: "Concentration" },
        { id: "iop_7", name: "Divine Sword" },
        { id: "iop_8", name: "Cut" },
        { id: "iop_9", name: "Power" },
        { id: "iop_10", name: "Brokle" },
      ],
    }),
    CharacterFactory.create({
      id: "2",
      name: "Cra",
      thumbnail: "/dofus-img/character-img/cra.png",
      spells: [
        { id: "cra_1", name: "Magic Arrow" },
        { id: "cra_2", name: "Frost Arrow" },
        { id: "cra_3", name: "Retreat Arrow" },
        { id: "cra_4", name: "Plaguing Arrow" },
        { id: "cra_5", name: "Burning Arrow" },
        { id: "cra_6", name: "Explosive Arrow" },
        { id: "cra_7", name: "Punitive Arrow" },
        { id: "cra_8", name: "Absorptive Arrow" },
        { id: "cra_9", name: "Tormenting Arrow" },
        { id: "cra_10", name: "Paralyzing Arrow" },
      ],
    }),
    CharacterFactory.create({
      id: "3",
      name: "Eniripsa",
      thumbnail: "/dofus-img/character-img/eniripsa.png",
      spells: [
        { id: "eni_1", name: "Word of Recovery" },
        { id: "eni_2", name: "Stimulating Word" },
        { id: "eni_3", name: "Preventing Word" },
        { id: "eni_4", name: "Regenerating Word" },
        { id: "eni_5", name: "Word of Recovery" },
        { id: "eni_6", name: "Word of Altruism" },
        { id: "eni_7", name: "Motivating Word" },
        { id: "eni_8", name: "Revitalizing Word" },
        { id: "eni_9", name: "Lethargy Word" },
        { id: "eni_10", name: "Friendship Word" },
      ],
    }),
    CharacterFactory.create({
      id: "4",
      name: "Enutrof",
      thumbnail: "/dofus-img/character-img/enutrof.png",
      spells: [
        { id: "enu_1", name: "Shovel Throwing" },
        { id: "enu_2", name: "Living Shovel" },
        { id: "enu_3", name: "Ghostly Shovel" },
        { id: "enu_4", name: "Reducing Key" },
        { id: "enu_5", name: "Clumsiness" },
        { id: "enu_6", name: "Bribery" },
        { id: "enu_7", name: "Greed" },
        { id: "enu_8", name: "Shovel Kiss" },
        { id: "enu_9", name: "Fortune" },
        { id: "enu_10", name: "Prime of Life" },
      ],
    }),
    CharacterFactory.create({
      id: "5",
      name: "Sram",
      thumbnail: "/dofus-img/character-img/sram.png",
      spells: [
        { id: "sram_1", name: "Invisibility" },
        { id: "sram_2", name: "Tricky Blow" },
        { id: "sram_3", name: "Trap of Silence" },
        { id: "sram_4", name: "Fear" },
        { id: "sram_5", name: "Lethal Attack" },
        { id: "sram_6", name: "Mistake" },
        { id: "sram_7", name: "Poisoned Trap" },
        { id: "sram_8", name: "Repelling Trap" },
        { id: "sram_9", name: "Chakra Concentration" },
        { id: "sram_10", name: "Invisibility of Others" },
      ],
    }),
    CharacterFactory.create({
      id: "6",
      name: "Sacrieur",
      thumbnail: "/dofus-img/character-img/sacrieur.png",
      spells: [
        { id: "sac_1", name: "Punishment" },
        { id: "sac_2", name: "Transposition" },
        { id: "sac_3", name: "Attraction" },
        { id: "sac_4", name: "Sacrifice" },
        { id: "sac_5", name: "Cooperation" },
        { id: "sac_6", name: "Fury" },
        { id: "sac_7", name: "Bloodthirsty Madness" },
        { id: "sac_8", name: "Dissolution" },
        { id: "sac_9", name: "Assault" },
        { id: "sac_10", name: "Bold Punishment" },
      ],
    }),
    CharacterFactory.create({
      id: "7",
      name: "Feca",
      thumbnail: "/dofus-img/character-img/feca.png",
      spells: [
        { id: "feca_1", name: "Natural Attack" },
        { id: "feca_2", name: "Glyph of Blindness" },
        { id: "feca_3", name: "Bastion" },
        { id: "feca_4", name: "Truce" },
        { id: "feca_5", name: "Teleportation" },
        { id: "feca_6", name: "Glowing Armor" },
        { id: "feca_7", name: "Aqueous Armor" },
        { id: "feca_8", name: "Earth Armor" },
        { id: "feca_9", name: "Wind Armor" },
        { id: "feca_10", name: "Immunity" },
      ],
    }),
    CharacterFactory.create({
      id: "8",
      name: "Osamodas",
      thumbnail: "/dofus-img/character-img/osamodas.png",
      spells: [
        { id: "osa_1", name: "Summoning of Tofu" },
        { id: "osa_2", name: "Summoning of Gobball" },
        { id: "osa_3", name: "Summoning of Prespic" },
        { id: "osa_4", name: "Whip" },
        { id: "osa_5", name: "Animal Healing" },
        { id: "osa_6", name: "Bear Cry" },
        { id: "osa_7", name: "Toad" },
        { id: "osa_8", name: "High-energy Shot" },
        { id: "osa_9", name: "Spiritual Leash" },
        { id: "osa_10", name: "Feline Movement" },
      ],
    }),
    CharacterFactory.create({
      id: "9",
      name: "Xelor",
      thumbnail: "/dofus-img/character-img/xelor.png",
      spells: [
        { id: "xel_1", name: "Flight" },
        { id: "xel_2", name: "Time Theft" },
        { id: "xel_3", name: "Rollback" },
        { id: "xel_4", name: "Temporal Dust" },
        { id: "xel_5", name: "Devotion" },
        { id: "xel_6", name: "Mummification" },
        { id: "xel_7", name: "Frostbite" },
        { id: "xel_8", name: "Hand" },
        { id: "xel_9", name: "Xelor's Punishment" },
        { id: "xel_10", name: "Teleportation" },
      ],
    }),
    CharacterFactory.create({
      id: "10",
      name: "Ecaflip",
      thumbnail: "/dofus-img/character-img/ecaflip.png",
      spells: [
        { id: "eca_1", name: "Heads or Tails" },
        { id: "eca_2", name: "All or Nothing" },
        { id: "eca_3", name: "Clover" },
        { id: "eca_4", name: "Felintion" },
        { id: "eca_5", name: "Rekop" },
        { id: "eca_6", name: "Perception" },
        { id: "eca_7", name: "Playful Claw" },
        { id: "eca_8", name: "Topkaj" },
        { id: "eca_9", name: "Wheel of Fortune" },
        { id: "eca_10", name: "Reflex" },
      ],
    }),
    CharacterFactory.create({
      id: "11",
      name: "Pandawa",
      thumbnail: "/dofus-img/character-img/pandawa.png",
      spells: [
        { id: "panda_1", name: "Karcham" },
        { id: "panda_2", name: "Chamrak" },
        { id: "panda_3", name: "Pandatak" },
        { id: "panda_4", name: "Vulnerability" },
        { id: "panda_5", name: "Bamboo Milk" },
        { id: "panda_6", name: "Alcoholic Breath" },
        { id: "panda_7", name: "Stabilization" },
        { id: "panda_8", name: "Zatoïshwan's Wrath" },
        { id: "panda_9", name: "Vertigo" },
        { id: "panda_10", name: "Explosive Flask" },
      ],
    }),
    CharacterFactory.create({
      id: "12",
      name: "Sadida",
      thumbnail: "/dofus-img/character-img/sadida.png",
      spells: [
        { id: "sadi_1", name: "Manifold Bramble" },
        { id: "sadi_2", name: "Bramble" },
        { id: "sadi_3", name: "The Tree" },
        { id: "sadi_4", name: "Insolent Bramble" },
        { id: "sadi_5", name: "Dolly Sacrifice" },
        { id: "sadi_6", name: "Madoll" },
        { id: "sadi_7", name: "Sacrificial Doll" },
        { id: "sadi_8", name: "Ultra-Powerful" },
        { id: "sadi_9", name: "Wild Grass" },
        { id: "sadi_10", name: "Earthquake" },
      ],
    }),
    CharacterFactory.create({
      id: "13",
      name: "Roublard",
      thumbnail: "/dofus-img/character-img/roublard.png",
      spells: [
        { id: "rogue_1", name: "Boomerang Daggers" },
        { id: "rogue_2", name: "Kaboom" },
        { id: "rogue_3", name: "Rogues' Ruse" },
        { id: "rogue_4", name: "Remission" },
        { id: "rogue_5", name: "Blunderbuss" },
        { id: "rogue_6", name: "Deception" },
        { id: "rogue_7", name: "Extraction" },
        { id: "rogue_8", name: "Pulmonary" },
        { id: "rogue_9", name: "Detonation" },
        { id: "rogue_10", name: "Rougery" },
      ],
    }),
    CharacterFactory.create({
      id: "14",
      name: "Zobal",
      thumbnail: "/dofus-img/character-img/zobal.png",
      spells: [
        { id: "zobal_1", name: "Furia" },
        { id: "zobal_2", name: "Apathy" },
        { id: "zobal_3", name: "Picada" },
        { id: "zobal_4", name: "Reinforcement" },
        { id: "zobal_5", name: "Plastron" },
        { id: "zobal_6", name: "Masquerade" },
        { id: "zobal_7", name: "Boliche" },
        { id: "zobal_8", name: "Diffraction" },
        { id: "zobal_9", name: "Pursuit" },
        { id: "zobal_10", name: "Capering" },
      ],
    }),
    CharacterFactory.create({
      id: "15",
      name: "Steamer",
      thumbnail: "/dofus-img/character-img/steamer.png",
      spells: [
        { id: "steamer_1", name: "Harpooner" },
        { id: "steamer_2", name: "Tacturret" },
        { id: "steamer_3", name: "Lifesaver" },
        { id: "steamer_4", name: "Ambush" },
        { id: "steamer_5", name: "Anchor" },
        { id: "steamer_6", name: "Scaphander" },
        { id: "steamer_7", name: "Backwash" },
        { id: "steamer_8", name: "Drill" },
        { id: "steamer_9", name: "Evolution" },
        { id: "steamer_10", name: "Froth" },
      ],
    }),
    CharacterFactory.create({
      id: "16",
      name: "Eliotrope",
      thumbnail: "/dofus-img/character-img/eliotrope.png",
      spells: [
        { id: "elio_1", name: "Portal" },
        { id: "elio_2", name: "Wakfu Ray" },
        { id: "elio_3", name: "Unleashed Blade" },
        { id: "elio_4", name: "Pulsation" },
        { id: "elio_5", name: "Distribution" },
        { id: "elio_6", name: "Clash" },
        { id: "elio_7", name: "Conflagration" },
        { id: "elio_8", name: "Commotion" },
        { id: "elio_9", name: "Stupefaction" },
        { id: "elio_10", name: "Respite" },
      ],
    }),
    CharacterFactory.create({
      id: "17",
      name: "Huppermage",
      thumbnail: "/dofus-img/character-img/huppermage.png",
      spells: [
        { id: "hup_1", name: "Runic Treatment" },
        { id: "hup_2", name: "Runification" },
        { id: "hup_3", name: "Solar Ray" },
        { id: "hup_4", name: "Telluric Wave" },
        { id: "hup_5", name: "Torrential Flux" },
        { id: "hup_6", name: "Tempest" },
        { id: "hup_7", name: "Convergence" },
        { id: "hup_8", name: "Distortion" },
        { id: "hup_9", name: "Counter" },
        { id: "hup_10", name: "Manifestation" },
      ],
    }),
    CharacterFactory.create({
      id: "18",
      name: "Ouginak",
      thumbnail: "/dofus-img/character-img/ouginak.png",
      spells: [
        { id: "oug_1", name: "Prey" },
        { id: "oug_2", name: "Rabies" },
        { id: "oug_3", name: "Carcass" },
        { id: "oug_4", name: "Overpowering" },
        { id: "oug_5", name: "Appeasement" },
        { id: "oug_6", name: "Bone Fracture" },
        { id: "oug_7", name: "Terrifying Bark" },
        { id: "oug_8", name: "Canine" },
        { id: "oug_9", name: "Whipkick" },
        { id: "oug_10", name: "Sniff" },
      ],
    }),
    CharacterFactory.create({
      id: "19",
      name: "Forgelance",
      thumbnail: "/dofus-img/character-img/forgelance.png",
      spells: [
        { id: "fl_1", name: "Lancer" },
        { id: "fl_2", name: "Retrieve Lance" },
        { id: "fl_3", name: "Repercussion" },
        { id: "fl_4", name: "Ricochet" },
        { id: "fl_5", name: "Fulmination" },
        { id: "fl_6", name: "Jag" },
        { id: "fl_7", name: "Lancing Charge" },
        { id: "fl_8", name: "Cover" },
        { id: "fl_9", name: "Convergence" },
        { id: "fl_10", name: "Counterweight" },
      ],
    }),
  ];
}
