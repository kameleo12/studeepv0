export namespace StuffDomainModel {
    export type Stuff = {
        id: string;
        uploadedAt: string;
        thumbnail: string;
        level: number;
        items: StuffItems;
    }

    export type StuffItems = {
        thumbnail: string;
        power: number;
        health: number;
        description: string;

    }
}