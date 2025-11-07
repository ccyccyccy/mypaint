import { observer } from 'mobx-react-lite';
import { LayerIcon } from '../assets/icons/LayerIcon';
import { canvasStore } from '../store';

export const Layer = observer(() => {
  const layers = canvasStore.layers;
  return (
    <div
      className="overflow-scroll"
      style={{ maxHeight: canvasStore.canvasSize.height / 2 }}
    >
      <h1>Layers</h1>
      {layers.map((layer) => {
        return (
          <div key={layer.layerName} className="flex flex-row gap-1 my-1 mr-3">
            <div className="h-6 w-6">
              <LayerIcon />
            </div>
            <div>{layer.layerName}</div>
          </div>
        );
      })}
    </div>
  );
});
