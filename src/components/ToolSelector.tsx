import { FillToolIcon } from '../assets/icons/FillToolIcon';
import { ShapeToolIcon } from '../assets/icons/ShapeToolIcon';

export const ToolSelector = () => {
  return (
    <div className="flex flex-row gap-2">
      <div>
        <ShapeToolIcon width="40px" height="40px" />
      </div>
      <div>
        <FillToolIcon width="40px" height="40px" />
      </div>
    </div>
  );
};
