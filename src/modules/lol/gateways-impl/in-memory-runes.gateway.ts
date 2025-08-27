// modules/lol/core/testing/runes.fixtures.ts

import { RunePath, ShardTier } from "@root/modules/lol/core/model/runes.model";

export const RUNE_PATHS: RunePath[] = [
  {
    key: "precision",
    name: "PRÉCISION",
    tagline: "Dégâts soutenus",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "pressTheAttack",
            name: "Press the Attack",
            description: "3 AA → dégâts + vulnérabilité",
          },
          {
            id: "lethalTempo",
            name: "Lethal Tempo",
            description: "Vitesse d’attaque accrue après trade",
          },
          {
            id: "fleetFootwork",
            name: "Fleet Footwork",
            description: "Soin + MS après charge",
          },
          {
            id: "conqueror",
            name: "Conqueror",
            description: "Stacking AD/AP + sustain",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "absorbLife",
            name: "Absorb Life",
            description: "Soin sur kill de sbires/monstres",
          },
          {
            id: "triumph",
            name: "Triumph",
            description: "Soin + or sur takedown",
          },
          {
            id: "presenceOfMind",
            name: "Presence of Mind",
            description: "Mana/énergie sustain",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "legendAlacrity",
            name: "Legend: Alacrity",
            description: "Vitesse d’attaque",
          },
          {
            id: "legendHaste",
            name: "Legend: Haste",
            description: "Hâte de compétence",
          },
          {
            id: "legendBloodline",
            name: "Legend: Bloodline",
            description: "Vol de vie",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "coupDeGrace",
            name: "Coup de Grâce",
            description: "Dégâts cibles low HP",
          },
          {
            id: "cutDown",
            name: "Cut Down",
            description: "Dégâts cibles tanky",
          },
          {
            id: "lastStand",
            name: "Last Stand",
            description: "+dégâts low HP",
          },
        ],
      },
    ],
  },
  {
    key: "domination",
    name: "DOMINATION",
    tagline: "Burst & chasse",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "electrocute",
            name: "Electrocute",
            description: "Burst sur 3 hits",
          },
          {
            id: "darkHarvest",
            name: "Dark Harvest",
            description: "Stacking dégâts + âme",
          },
          {
            id: "hailOfBlades",
            name: "Hail of Blades",
            description: "Vitesse d’attaque éclair",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "cheapShot",
            name: "Cheap Shot",
            description: "Dégâts vrais sur CC",
          },
          {
            id: "tasteOfBlood",
            name: "Taste of Blood",
            description: "Soin poke",
          },
          {
            id: "suddenImpact",
            name: "Sudden Impact",
            description: "Dégâts vrais après dash/fufu",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "deepWard",
            name: "Deep Ward",
            description: "Wards ennemies durent plus",
          },
          {
            id: "sixthSense",
            name: "Sixth Sense",
            description: "Timers auto + détection ward",
          },
          {
            id: "grislyMementos",
            name: "Grisly Mementos",
            description: "Stacks → trinket haste",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "treasureHunter",
            name: "Treasure Hunter",
            description: "Or bonus par takedown",
          },
          {
            id: "relentlessHunter",
            name: "Relentless Hunter",
            description: "MS hors combat",
          },
          {
            id: "ultimateHunter",
            name: "Ultimate Hunter",
            description: "Hâte ultime",
          },
        ],
      },
    ],
  },
  {
    key: "sorcery",
    name: "SORCELLERIE",
    tagline: "Poke & utilité",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          { id: "aery", name: "Summon Aery", description: "Dégâts/bouclier" },
          {
            id: "arcaneComet",
            name: "Arcane Comet",
            description: "Comète magique",
          },
          {
            id: "phaseRush",
            name: "Phase Rush",
            description: "MS + anti slow",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "axiomAcanist",
            name: "Axiom Acanist",
            description: "Renforce l’ultime + refund CD",
          },
          {
            id: "manaflowBand",
            name: "Manaflow Band",
            description: "Mana max + régén",
          },
          {
            id: "nimbusCloak",
            name: "Nimbus Cloak",
            description: "MS après sort invocateur",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "transcendence",
            name: "Transcendence",
            description: "Hâte progressive",
          },
          {
            id: "celerity",
            name: "Celerity",
            description: "MS + convertie en stats",
          },
          {
            id: "absoluteFocus",
            name: "Absolute Focus",
            description: "AD/AP > 70% PV",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          { id: "scorch", name: "Scorch", description: "Brûlure poke" },
          {
            id: "waterwalking",
            name: "Waterwalking",
            description: "MS + stats rivière",
          },
          {
            id: "gatheringStorm",
            name: "Gathering Storm",
            description: "Scaling AD/AP",
          },
        ],
      },
    ],
  },
  {
    key: "resolve",
    name: "VOLONTÉ",
    tagline: "Tank & survie",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "grasp",
            name: "Grasp of the Undying",
            description: "AA → dégâts + soin + PV max",
          },
          {
            id: "aftershock",
            name: "Aftershock",
            description: "Résistances après CC",
          },
          { id: "guardian", name: "Guardian", description: "Bouclier allié" },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          { id: "demolish", name: "Demolish", description: "Charge tourelle" },
          {
            id: "fontOfLife",
            name: "Font of Life",
            description: "Soins aux alliés sur CC",
          },
          {
            id: "shieldBash",
            name: "Shield Bash",
            description: "AA boosté après shield",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "conditioning",
            name: "Conditioning",
            description: "+armure/MR mid game",
          },
          {
            id: "secondWind",
            name: "Second Wind",
            description: "Régén après poke",
          },
          {
            id: "bonePlating",
            name: "Bone Plating",
            description: "Réduit prochains dégâts",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "overgrowth",
            name: "Overgrowth",
            description: "PV max sur morts",
          },
          {
            id: "revitalize",
            name: "Revitalize",
            description: "Boost soins/boucliers",
          },
          {
            id: "unflinching",
            name: "Unflinching",
            description: "Ténacité/anti slow",
          },
        ],
      },
    ],
  },
  {
    key: "inspiration",
    name: "INSPIRATION",
    tagline: "Créativité & utilité",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "glacialAugment",
            name: "Glacial Augment",
            description: "Rayons de ralentissement",
          },
          {
            id: "unsealedSpellbook",
            name: "Unsealed Spellbook",
            description: "Switch sorts invocateurs",
          },
          {
            id: "firstStrike",
            name: "First Strike",
            description: "Dégâts + or si tu engages",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "hextechFlash",
            name: "Hextech Flashtaption",
            description: "Hexflash",
          },
          {
            id: "magicalFootwear",
            name: "Magical Footwear",
            description: "Bottes gratuites + MS",
          },
          {
            id: "perfectTiming",
            name: "Perfect Timing",
            description: "Chronomètre",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "tripleTonic",
            name: "Triple Tonic",
            description: "3 élixirs (niv. 3/6/9)",
          },
          {
            id: "timeWarpTonic",
            name: "Time Warp Tonic",
            description: "Consos + rapides + MS",
          },
          {
            id: "biscuitDelivery",
            name: "Biscuit Delivery",
            description: "Biscuits soin/mana",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "cosmicInsight",
            name: "Cosmic Insight",
            description: "Hâte items + invocateurs",
          },
          {
            id: "approachVelocity",
            name: "Approach Velocity",
            description: "MS vers cibles ralenties",
          },
          {
            id: "jackOfAllTrades",
            name: "Jack of All Trades",
            description: "Stacking AF sur diversité objets",
          },
        ],
      },
    ],
  },
];

export const SHARD_TIERS: ShardTier[] = [
  {
    id: "attack",
    label: "Rang 1 – Attaque",
    options: [
      { id: "af9", name: "+9 AF", description: "≈ +5,4 AD / +9 AP" },
      { id: "as10", name: "+10% Vitesse d’attaque" },
      { id: "ah8", name: "+8 Hâte de compétence" },
    ],
  },
  {
    id: "flex",
    label: "Rang 2 – Flex",
    options: [
      { id: "af9_flex", name: "+9 AF" },
      { id: "ms2", name: "+2% Vitesse de déplacement" },
      { id: "hp10_180", name: "+10–180 PV", description: "Scaling niveau" },
    ],
  },
  {
    id: "defense",
    label: "Rang 3 – Défense",
    options: [
      { id: "hp65", name: "+65 PV" },
      {
        id: "tenacity10",
        name: "+10% Ténacité & résistance aux ralentissements",
      },
      { id: "hp10_180_def", name: "+10–180 PV", description: "Scaling niveau" },
    ],
  },
];
