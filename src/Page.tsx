import { CanvasArea } from './components/CanvasArea';
import { Layer } from './components/Layers';
import { ToolSelector } from './components/ToolSelector';
import { observer } from 'mobx-react-lite';
import { rootStore } from './store';

export const Page = observer(() => {
  const selectedTool = rootStore.canvasStore.selectedTool;

  return (
    <div className="h-screen max-h-screen">
      <div className="w-full h-10">
        <ToolSelector />
      </div>
      <div className="relative">
        <div className="z-0 absolute w-full">
          <CanvasArea />
        </div>
        {selectedTool && (
          <div className="z-10 absolute top-2 left-2 border-2 border-black p-2">
            {<selectedTool.DetailUI />}
          </div>
        )}
        <div className="z-10 absolute top-2 right-2">
          <Layer />
        </div>
      </div>
    </div>
  );
});
