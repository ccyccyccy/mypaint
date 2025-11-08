import { makeAutoObservable } from 'mobx';
import { SquareOutlineIcon } from '../../../assets/icons/SquareOutlineIcon';
import { CircleOutlineIcon } from '../../../assets/icons/CircleOutlineIcon';

class LineToolStore {
  data: LineToolData = {
    startPosition: undefined,
    endPosition: undefined,
    color: '#000000',
    strokeWidth: 1,
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type LineToolData = {
  startPosition?: { x: number; y: number };
  endPosition?: { x: number; y: number };
  color: string;
  strokeWidth: (typeof strokeWidths)[number];
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
export const strokeWidths = [1, 2, 4, 6, 8, 10, 12, 14] as const;
