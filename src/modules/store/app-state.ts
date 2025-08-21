
import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";

export interface AppState {
  stuffsSearching: {
    results: StuffDomainModel.Stuff[];
    query: string;
    loading: boolean;
    started: boolean;
    searchId: string;
  };
  currentStuff: {
    stuff: StuffDomainModel.Stuff | null;
    loading: boolean;
  };

  
}
