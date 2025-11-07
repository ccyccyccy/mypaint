import { makeAutoObservable } from 'mobx';
import { SquareOutlineIcon } from '../../../assets/icons/SquareOutlineIcon';
import { CircleOutlineIcon } from '../../../assets/icons/CircleOutlineIcon';

class LineToolStore {
  data: LineToolData = {
    startPosition: undefined,
    endPosition: undefined,
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type LineToolData = {
  startPosition?: { x: number; y: number };
  endPosition?: { x: number; y: number };
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
