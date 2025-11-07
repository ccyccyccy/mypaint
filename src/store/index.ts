import { autorun, makeAutoObservable, reaction } from 'mobx';
import type { OperationData } from '../components/tools/type';
import { TOOLBAR_HEIGHT } from '../const';
import { toolFromId, type Tool } from '../components/tools';

type LayerData = {
  layerName: string;
  toolId: string;
  data: OperationData;
};

export class CanvasStore {
  layers: LayerData[] = [];
  selectedTool?: Tool = undefined;
  canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight - TOOLBAR_HEIGHT,
  };
  canvas: HTMLCanvasElement | null = null;
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
  }

  addLayers(data: OperationData) {
    if (!this.selectedTool) return;

    const toolData = this.selectedTool.store.data;
    this.layers.push({
      toolId: this.selectedTool.id,
      data: { ...data, ...toolData },
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
    this.canvas
      ?.getContext('2d')
      ?.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.layers.forEach((layer) =>
      toolFromId[layer.toolId].operation(layer.data),
    );
  }

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
