import ConflictError from '@/errors/ConflictError';
import ToolBody from './interfaces/ToolBody';
import Tool from './ToolEntity';

export async function createTool(toolBody: ToolBody, userId: number) {
  const tool = await Tool.findByTitleOrLink(toolBody.title, toolBody.link);
  if (tool) {
    throw new ConflictError('Já existe uma ferramenta cadastrada com este título ou link')
  }

  const newTool = await Tool.createTool(toolBody, userId);
  return newTool.getTool();
}
