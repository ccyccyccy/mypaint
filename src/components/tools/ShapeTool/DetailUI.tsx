import { observer } from 'mobx-react-lite';
import { Shape, shapeToolStore } from './store';
import { CircleOutline } from '../../../assets/icons/CircleOutline';
import { SquareOutline } from '../../../assets/icons/SquareOutline';

export const DetailUI = observer(() => {
  return (
    <div>
      <div>Shape Tool</div>
      <div className="flex flex-row gap-2">
        <div>
          <div>Color</div>
          <div className="grid grid-cols-4 gap-1">
            {[
              '#000000',
              '#ff0000',
              '#00ff00',
              '#0000ff',
              '#ffff00',
              '#ff00ff',
              '#00ffff',
              '#ffffff',
            ].map((color) => (
              <div
                key={color}
                className={`h-6 w-6${shapeToolStore.data.color === color ? ' border-2 border-black' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  shapeToolStore.data.color = color;
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <div>Shape</div>
          <div className="grid grid-cols-4">
            {Object.entries(Shape).map(([name, { Icon }]) => {
              return (
                <div
                  className={`h-6 w-6${shapeToolStore.data.shape === name ? ' border-2 border-black' : ''}`}
                  onClick={() => {
                    shapeToolStore.data.shape = name as keyof typeof Shape;
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
