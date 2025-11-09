import { observer } from 'mobx-react-lite';
import { lineToolStore, strokeWidths } from './store';
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
                className={`cursor-pointer h-6 w-6${lineToolStore.data.color === color ? ' border-2 border-black' : ''}`}
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
            {strokeWidths.map((strokeWidth) => {
              return (
                <div
                  key={strokeWidth}
                  className={`cursor-pointer h-6 w-6 flex justify-center items-center${lineToolStore.data.strokeWidth === strokeWidth ? ' border-2 border-black' : ''}`}
                  onClick={() => {
                    lineToolStore.data.strokeWidth = strokeWidth;
                  }}
                >
                  <div
                    className="bg-black rounded-full"
                    style={{ width: strokeWidth, height: strokeWidth }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
