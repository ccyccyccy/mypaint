import { toolList } from './tools';
import { TOOLBAR_HEIGHT } from '../const';
import { rootStore } from '../store';

export const ToolSelector = () => {
  return (
    <div className="flex flex-row gap-2 bg-white border-b-2">
      {toolList.map((tool) => (
        <div
          key={tool.id}
          onClick={() => {
            rootStore.canvasStore.selectTool(tool);
          }}
        >
          <tool.icon width="40px" height={`${TOOLBAR_HEIGHT}px`} />
        </div>
      ))}
    </div>
  );
};
