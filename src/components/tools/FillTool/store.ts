import { makeAutoObservable } from 'mobx';

class FillToolStore {
  data: FillToolData = {
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type FillToolData = {
  color: string;
};

export const fillToolStore = new FillToolStore();
