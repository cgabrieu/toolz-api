import ConflictError from '@/errors/ConflictError';
import ToolBody from './interfaces/ToolBody';
import Tool from './ToolEntity';

export async function createTool(toolBody: ToolBody) {
  const tool = await Tool.findByTitleOrLink(toolBody.title, toolBody.link);
  if (tool) {
    throw new ConflictError('Já existe uma ferramenta cadastrada com esse título ou link')
  }

  console.log(await Tool.createTool(toolBody));
}
