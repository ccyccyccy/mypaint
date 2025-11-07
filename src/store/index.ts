import { autorun, makeAutoObservable, reaction } from 'mobx';
import type { OperationData } from '../components/tools/type';
import { TOOLBAR_HEIGHT } from '../const';
import { toolFromId, type Tool } from '../components/tools';

export class RootStore {
  canvasStore: CanvasStore;

  constructor() {
    this.canvasStore = new CanvasStore(this);
  }
}

export class CanvasStore {
  rootStore: RootStore;
  layers: {
    layerName: string;
    toolId: string;
    data: OperationData;
  }[] = [];
  selectedTool?: Tool = undefined;
  canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight - TOOLBAR_HEIGHT,
  };
  canvas: HTMLCanvasElement | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

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
      layerName: 'placeholder layername',
    });
  }

  selectTool(tool: Tool) {
    this.selectedTool = tool;
  }

  setCanvasSize(width: number, height: number) {
    this.canvasSize.width = width;
    this.canvasSize.height = height;
  }

  drawCanvas() {
    this.layers.forEach((layer) =>
      toolFromId[layer.toolId].operation(layer.data),
    );
  }
}

export const rootStore = new RootStore();
