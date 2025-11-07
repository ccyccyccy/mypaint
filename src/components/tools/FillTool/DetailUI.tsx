import { SUPPORTED_COLORS } from '../../../const';
import { fillToolStore } from './store';

export const DetailUI = () => {
  return (
    <div>
      <div>Fill Tool</div>
      <div className="flex flex-row gap-2">
        <div>
          <div>Color</div>
          <div className="grid grid-cols-4 gap-1">
            {SUPPORTED_COLORS.map((color) => (
              <div
                key={color}
                className={`h-6 w-6${fillToolStore.data.color === color ? ' border-2 border-black' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  fillToolStore.data.color = color;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
