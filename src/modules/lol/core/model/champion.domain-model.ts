export namespace ChampionDomainModel {
  export type Skin = {
    id: string;
    name: string;
    icon?: string;
  };

  export type Champion = {
    id: string;
    name: string;
    thumbnail: string;
    skins: Skin[];
  };
}
