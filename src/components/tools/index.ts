import { FillTool } from './FillTool';
import { LineTool } from './LineTool';
import { ShapeTool } from './ShapeTool';

export const toolList = [ShapeTool, FillTool, LineTool] as const;
export type Tool = (typeof toolList)[number];

export const toolFromId: Record<string, Tool> = {};
toolList.forEach((tool) => {
  toolFromId[tool.id] = tool as Tool;
});
