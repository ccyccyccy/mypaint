import { CanvasArea } from './components/CanvasArea';
import { Layer } from './components/Layers';
import { ToolSelector } from './components/ToolSelector';
import { observer } from 'mobx-react-lite';
import { canvasStore } from './store';
import { TOOLBAR_HEIGHT } from './const';

export const Page = observer(() => {
  const selectedTool = canvasStore.selectedTool;

  return (
    <div className="h-screen max-h-screen">
      <div
        className="w-full p-1 bg-white border-b-2"
        style={{ height: TOOLBAR_HEIGHT }}
      >
        <ToolSelector />
      </div>
      <div className="relative">
        <div className="z-0 absolute w-full">
          <CanvasArea />
        </div>
        {selectedTool && (
          <div className="z-10 absolute top-2 left-2 border-2 border-black p-2 bg-slate-200">
            {<selectedTool.DetailUI />}
          </div>
        )}
        <div className="z-10 absolute top-2 right-2 border-2 border-black p-2 bg-slate-200">
          <Layer />
        </div>
      </div>
    </div>
  );
});
