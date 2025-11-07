import { toolList } from './tools';
import { canvasStore } from '../store';

export const ToolSelector = () => {
  return (
    <div className="flex flex-row gap-2">
      {toolList.map((tool) => (
        <div
          key={tool.id}
          className={
            canvasStore.selectedTool?.id === tool.id ? 'bg-slate-400' : ''
          }
          onClick={() => {
            canvasStore.selectTool(tool);
          }}
        >
          <tool.icon width="40px" height="40px" />
        </div>
      ))}
    </div>
  );
};
