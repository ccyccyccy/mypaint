import type { ElementType } from 'react';

export type GenericTool<LayerData, Store> = {
  id: string;
  icon: ElementType;
  store: Store;
  DetailUI: ElementType;
  onClick: (clickData: ClickData) => void;
  onSwitchToOtherTool?: (data: {
    previewCanvas: HTMLCanvasElement;
    canvas: HTMLCanvasElement;
  }) => void;
  onToolSelected?: (data: {
    previewCanvas: HTMLCanvasElement;
    canvas: HTMLCanvasElement;
  }) => void;
  operation: (data: { ctx: CanvasRenderingContext2D } & LayerData) => void;
};

export type ClickData = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  mousePosition: {
    x: number;
    y: number;
  };
};
