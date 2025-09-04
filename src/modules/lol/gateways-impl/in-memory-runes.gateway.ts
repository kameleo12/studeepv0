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
            thumbnail: "/images/Press the Attack.png",
          },
          {
            id: "lethalTempo",
            name: "Lethal Tempo",
            description: "Vitesse d’attaque accrue après trade",
            thumbnail: "/images/Lethal Tempo.png",
          },
          {
            id: "fleetFootwork",
            name: "Fleet Footwork",
            description: "Soin + MS après charge",
            thumbnail: "/images/Fleet Footwork.png",
          },
          {
            id: "conqueror",
            name: "Conqueror",
            description: "Stacking AD/AP + sustain",
            thumbnail: "/images/Conqueror.png",
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
            thumbnail: "/images/Absorb Life.png",
          },
          {
            id: "triumph",
            name: "Triumph",
            description: "Soin + or sur takedown",
            thumbnail: "/images/Triumph.png",
          },
          {
            id: "presenceOfMind",
            name: "Presence of Mind",
            description: "Mana/énergie sustain",
            thumbnail: "/images/Presence of Mind.png",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "legendAlacrity",
            name: "Alacrity",
            description: "Vitesse d’attaque",
            thumbnail: "/images/Alacrity.png",
          },
          {
            id: "Haste",
            name: "Haste",
            description: "Hâte de compétence",
            thumbnail: "/images/Haste.png",
          },
          {
            id: "Bloodline",
            name: "Bloodline",
            description: "Vol de vie",
            thumbnail: "/images/Bloodline.png",
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
            thumbnail: "/images/Coup de Grace.png",
          },
          {
            id: "cutDown",
            name: "Cut Down",
            description: "Dégâts cibles tanky",
            thumbnail: "/images/Cut Down.png",
          },
          {
            id: "lastStand",
            name: "Last Stand",
            description: "+dégâts low HP",
            thumbnail: "/images/Last Stand.png",
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
            thumbnail: "/images/Electrocute.png",
          },
          {
            id: "darkHarvest",
            name: "Dark Harvest",
            description: "Stacking dégâts + âme",
            thumbnail: "/images/Dark Harvest.png",
          },
          {
            id: "hailOfBlades",
            name: "Hail of Blades",
            description: "Vitesse d’attaque éclair",
            thumbnail: "/images/Hail of Blades.png",
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
            thumbnail: "/images/Cheap Shot.png",
          },
          {
            id: "tasteOfBlood",
            name: "Taste of Blood",
            description: "Soin poke",
            thumbnail: "/images/Taste of Blood.png",
          },
          {
            id: "suddenImpact",
            name: "Sudden Impact",
            description: "Dégâts vrais après dash/fufu",
            thumbnail: "/images/Sudden Impact.png",
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
            thumbnail: "/images/Deep Ward.png",
          },
          {
            id: "sixthSense",
            name: "Sixth Sense",
            description: "Timers auto + détection ward",
            thumbnail: "/images/Sixth Sense.png",
          },
          {
            id: "grislyMementos",
            name: "Grisly Mementos",
            description: "Stacks → trinket haste",
            thumbnail: "/images/Grisly Mementos.png",
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
            thumbnail: "/images/Treasure Hunter.png",
          },
          {
            id: "relentlessHunter",
            name: "Relentless Hunter",
            description: "MS hors combat",
            thumbnail: "/images/Relentless Hunter.png",
          },
          {
            id: "ultimateHunter",
            name: "Ultimate Hunter",
            description: "Hâte ultime",
            thumbnail: "/images/Ultimate Hunter.png",
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
          {
            id: "aery",
            name: "Summon Aery",
            description: "Dégâts/bouclier",
            thumbnail: "/images/Summon Aery.png",
          },
          {
            id: "arcaneComet",
            name: "Arcane Comet",
            description: "Comète magique",
            thumbnail: "/images/Arcane Comet.png",
          },
          {
            id: "phaseRush",
            name: "Phase Rush",
            description: "MS + anti slow",
            thumbnail: "/images/Phase Rush.png",
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
            thumbnail: "/images/Axiom Acanist.jpg",
          },
          {
            id: "manaflowBand",
            name: "Manaflow Band",
            description: "Mana max + régén",
            thumbnail: "/images/Manaflow Band.png",
          },
          {
            id: "nimbusCloak",
            name: "Nimbus Cloak",
            description: "MS après sort invocateur",
            thumbnail: "/images/Nimbus Cloak.png",
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
            thumbnail: "/images/Transcendence.png",
          },
          {
            id: "celerity",
            name: "Celerity",
            description: "MS + convertie en stats",
            thumbnail: "/images/Celerity.png",
          },
          {
            id: "absoluteFocus",
            name: "Absolute Focus",
            description: "AD/AP > 70% PV",
            thumbnail: "/images/Absolute Focus.png",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "scorch",
            name: "Scorch",
            description: "Brûlure poke",
            thumbnail: "/images/Scorch.png",
          },
          {
            id: "waterwalking",
            name: "Waterwalking",
            description: "MS + stats rivière",
            thumbnail: "/images/Waterwalking.png",
          },
          {
            id: "gatheringStorm",
            name: "Gathering Storm",
            description: "Scaling AD/AP",
            thumbnail: "/images/Gathering Storm.png",
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
            thumbnail: "/images/Grasp of the Undying.png",
          },
          {
            id: "aftershock",
            name: "Aftershock",
            description: "Résistances après CC",
            thumbnail: "/images/Aftershock.png",
          },
          {
            id: "guardian",
            name: "Guardian",
            description: "Bouclier allié",
            thumbnail: "/images/Guardian.png",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "demolish",
            name: "Demolish",
            description: "Charge tourelle",
            thumbnail: "/images/Demolish.png",
          },
          {
            id: "fontOfLife",
            name: "Font of Life",
            description: "Soins aux alliés sur CC",
            thumbnail: "/images/Font of Life.png",
          },
          {
            id: "shieldBash",
            name: "Shield Bash",
            description: "AA boosté après shield",
            thumbnail: "/images/Shield Bash.png",
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
            thumbnail: "/images/Conditioning.png",
          },
          {
            id: "secondWind",
            name: "Second Wind",
            description: "Régén après poke",
            thumbnail: "/images/Second Wind.png",
          },
          {
            id: "bonePlating",
            name: "Bone Plating",
            description: "Réduit prochains dégâts",
            thumbnail: "/images/Bone Plating.png",
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
            thumbnail: "/images/Overgrowth.png",
          },
          {
            id: "revitalize",
            name: "Revitalize",
            description: "Boost soins/boucliers",
            thumbnail: "/images/Revitalize.png",
          },
          {
            id: "unflinching",
            name: "Unflinching",
            description: "Ténacité/anti slow",
            thumbnail: "/images/Unflinching.png",
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
            thumbnail: "/images/Glacial Augment.png",
          },
          {
            id: "unsealedSpellbook",
            name: "Unsealed Spellbook",
            description: "Switch sorts invocateurs",
            thumbnail: "/images/Unsealed Spellbook.png",
          },
          {
            id: "firstStrike",
            name: "First Strike",
            description: "Dégâts + or si tu engages",
            thumbnail: "/images/First Strike.png",
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
            thumbnail: "/images/Hextech Flash.png",
          },
          {
            id: "magicalFootwear",
            name: "Magical Footwear",
            description: "Bottes gratuites + MS",
            thumbnail: "/images/Magical Footwear.png",
          },
          {
            id: "perfectTiming",
            name: "Perfect Timing",
            description: "Chronomètre",
            thumbnail: "/images/Perfect Timing.png",
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
            thumbnail: "/images/Triple Tonic.png",
          },
          {
            id: "timeWarpTonic",
            name: "Time Warp Tonic",
            description: "Consos + rapides + MS",
            thumbnail: "/images/Time Warp Tonic.png",
          },
          {
            id: "biscuitDelivery",
            name: "Biscuit Delivery",
            description: "Biscuits soin/mana",
            thumbnail: "/images/Biscuit Delivery.png",
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
            thumbnail: "/images/Cosmic Insight.png",
          },
          {
            id: "approachVelocity",
            name: "Approach Velocity",
            description: "MS vers cibles ralenties",
            thumbnail: "/images/Approach Velocity.png",
          },
          {
            id: "jackOfAllTrades",
            name: "Jack of All Trades",
            description: "Stacking AF sur diversité objets",
            thumbnail: "/images/Jack of All Trades.png",
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
      {
        id: "af9",
        name: "+9 AF",
        description: "≈ +5,4 AD / +9 AP",
        thumbnail: "/images/AF1.png",
      },
      {
        id: "as10",
        name: "+10% Vitesse d’attaque",
        thumbnail: "/images/AS1.png",
      },
      {
        id: "ah8",
        name: "+8 Hâte de compétence",
        thumbnail: "/images/AH1.png",
      },
    ],
  },
  {
    id: "flex",
    label: "Rang 2 – Flex",
    options: [
      {
        id: "af9_flex",
        name: "+9 AF",
        thumbnail: "/images/AF2.png",
      },
      {
        id: "ms2",
        name: "+2% Vitesse de déplacement",
        thumbnail: "/images/MS.png",
      },
      {
        id: "hp10_180",
        name: "+10–180 PV",
        description: "Scaling niveau",
        thumbnail: "/images/PV1.png",
      },
    ],
  },
  {
    id: "defense",
    label: "Rang 3 – Défense",
    options: [
      {
        id: "hp65",
        name: "+65 PV",
        thumbnail: "/images/PV2.png",
      },
      {
        id: "tenacity10",
        name: "+10% Ténacité & résistance aux ralentissements",
        thumbnail:
          "/images/T.png",
      },
      {
        id: "hp10_180_def",
        name: "+10–180 PV",
        description: "Scaling niveau",
        thumbnail: "/images/REGEN.png",
      },
    ],
  },
];
