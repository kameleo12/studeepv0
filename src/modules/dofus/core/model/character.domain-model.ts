export namespace CharacterDomainModel {
  export type Spell = {
    id: string;
    name: string;
    icon?: string;
  };

  export type Character = {
    id: string;
    name: string;
    thumbnail: string;
    spells: Spell[];
  };
}

export type SpellDetailsModel = {
  id: string;
  description: string;
  apCost: number;
  /** dégâts par rang, ex: [12, 15, 19, 22, 26] */
  damagesByRank: number[];
};