import { makeAutoObservable } from 'mobx';

class FillToolStore {
  data: FillToolData = {
    selectedFill: 'square',
    width: 20,
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type FillToolData = {
  selectedFill: 'square' | 'circle';
  width: number;
  color: string;
};

export const fillToolStore = new FillToolStore();
