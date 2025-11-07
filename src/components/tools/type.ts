import type { ElementType } from 'react';

export type GenericTool<DataT, StoreT> = {
  id: string;
  icon: ElementType;
  store: StoreT;
  DetailUI: ElementType;
  operation: (data: OperationData & DataT) => void;
};

export type OperationData = {
  ctx: CanvasRenderingContext2D;
  mousePosition: {
    x: number;
    y: number;
  };
};
