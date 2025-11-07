import type { ElementType } from 'react';

export type GenericTool<DataT, StoreT> = {
  id: string;
  icon: ElementType;
  store: StoreT;
  DetailUI: ElementType;
  onClick: (clickData: ClickData) => void;
  operation: (data: { ctx: CanvasRenderingContext2D } & DataT) => void;
};

export type ClickData = {
  ctx: CanvasRenderingContext2D;
  mousePosition: {
    x: number;
    y: number;
  };
};
