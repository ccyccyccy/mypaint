import { makeAutoObservable } from 'mobx';
import { SquareOutlineIcon } from '../../../assets/icons/SquareOutlineIcon';
import { CircleOutlineIcon } from '../../../assets/icons/CircleOutlineIcon';

class LineToolStore {
  data: LineToolData = {
    startPosition: undefined,
    length: 20,
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type LineToolData = {
  startPosition?: { x: number; y: number };
  length: number;
  color: string;
};

export const Line = {
  square: {
    Icon: SquareOutlineIcon,
  },
  circle: {
    Icon: CircleOutlineIcon,
  },
} as const;

export const lineToolStore = new LineToolStore();
