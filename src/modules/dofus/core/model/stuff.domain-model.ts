export namespace CharacterDomainModel {
  export type Spell = {
    id: string;
    name: string;
  };

  export type Character = {
    id: string;
    name: string;
    thumbnail: string;
    spells: Spell[];
  };
}
