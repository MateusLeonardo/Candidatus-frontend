import { IState } from "@/features/state/types/state";

export interface ICity {
  id: number;
  name: string;
  stateId: number;
  state: IState;
}

export interface IResponseAllCities {
  cities: ICity[];
}

export interface IRequestRegisterCity {
  name: string;
  stateId: number;
}

export interface IRequestUpdateCity {
  name: string;
  stateId: number;
}

