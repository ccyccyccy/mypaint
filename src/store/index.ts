import { autorun, makeAutoObservable } from 'mobx';
import type { OperationData } from '../components/tools/type';
import { TOOLBAR_HEIGHT } from '../const';
import { toolFromId, toolList, type Tool } from '../components/tools';

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
      this.layers.forEach((layer) =>
        toolFromId[layer.toolId].operation(layer.data),
      );
    });
  }

  addLayers(data: OperationData) {
    if (!this.selectedTool) return;

    const toolData = this.selectedTool.store.data;
    console.log('{ ...data, ...toolData } :>> ', { ...data, ...toolData });
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
}

export const rootStore = new RootStore();
