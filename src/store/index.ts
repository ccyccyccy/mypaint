import { autorun, makeAutoObservable, reaction } from 'mobx';
import { TOOLBAR_HEIGHT } from '../const';
import { toolFromId, type Tool } from '../components/tools';

type LayerData = {
  layerName: string;
  toolId: string;
  data: Tool['store']['data'];
};

export class CanvasStore {
  layers: LayerData[] = [];
  selectedTool?: Tool = undefined;
  canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight - TOOLBAR_HEIGHT,
  };
  canvas: HTMLCanvasElement | null = null;
  previewCanvas: HTMLCanvasElement | null = null;
  redoStack: LayerData[] = [];

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      this.drawCanvas();
    });

    reaction(
      () => [this.canvasSize.height, this.canvasSize.width],
      () => {
        if (!this.canvas) return;
        this.canvas.height = this.canvasSize.height;
        this.canvas.width = this.canvasSize.width;
        setTimeout(() => {
          this.drawCanvas();
        });
      },
    );

    reaction(
      () => this.selectedTool,
      (_, prev) => {
        prev?.onSwitchToOtherTool?.();
        this.previewCanvas
          ?.getContext('2d')
          ?.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
      },
    );
  }

  addLayer(data: Tool['store']['data']) {
    if (!this.selectedTool) return;

    this.layers.push({
      toolId: this.selectedTool.id,
      data,
      layerName: `Layer ${this.layers.length}`,
    });
    this.redoStack = [];
  }

  selectTool(tool: Tool) {
    this.selectedTool = tool;
  }

  setCanvasSize(width: number, height: number) {
    this.canvasSize.width = width;
    this.canvasSize.height = height;
  }

  drawCanvas() {
    const ctx = this.canvas?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.layers.forEach((layer) => {
      ctx.save();
      toolFromId[layer.toolId].operation({ ctx, ...layer.data });
      ctx.restore();
    });
  }

  drawPreviewCanvas(
    draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void,
  ) {
    const canvas = this.previewCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    ctx.save();
    draw(canvas, ctx);
    ctx.restore();
  }

  // UNDO REDO ONLY WORKS IF LAYER ORDER IS NOT CHANGED, IS ADDED IN ORDER, AND LAYERS ARE NOT DELETED
  undo() {
    const undoneLayer = this.layers.pop();
    if (undoneLayer) {
      this.redoStack.push(undoneLayer);
    }
  }

  redo() {
    const redoLayer = this.redoStack.pop();
    if (redoLayer) {
      this.layers.push(redoLayer);
    }
  }
}

export const canvasStore = new CanvasStore();
