import { observer } from 'mobx-react-lite';
import { Line, lineToolStore } from './store';
import { SUPPORTED_COLORS } from '../../../const';

export const DetailUI = observer(() => {
  return (
    <div>
      <div>Line Tool</div>
      <div className="flex flex-row gap-2">
        <div>
          <div>Color</div>
          <div className="grid grid-cols-4 gap-1">
            {SUPPORTED_COLORS.map((color) => (
              <div
                key={color}
                className={`h-6 w-6${lineToolStore.data.color === color ? ' border-2 border-black' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  lineToolStore.data.color = color;
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <div>Stroke</div>
          <div className="grid grid-cols-4">
            {Object.entries(Line).map(([name, { Icon }]) => {
              return (
                <div
                  key={name}
                  className={`h-6 w-6${lineToolStore.data.line === name ? ' border-2 border-black' : ''}`}
                  onClick={() => {
                    lineToolStore.data.line = name as keyof typeof Line;
                  }}
                >
                  <Icon />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
