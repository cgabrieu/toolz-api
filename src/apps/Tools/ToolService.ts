import { ValidationError } from 'yup';

import ConflictError from '@/errors/ConflictError';
import ToolBody from './interfaces/ToolBody';
import Tool from './ToolEntity';
import NotFoundError from '@/errors/NotFoundError';

export async function createTool(toolBody: ToolBody, userId: number) {
  const tool = await Tool.getByTitleOrLink(toolBody.title, toolBody.link);
  if (tool) {
    throw new ConflictError('Já existe uma ferramenta cadastrada com este título ou link')
  }

  const newTool = await Tool.createTool(toolBody, userId);
  return newTool.getTool();
}

export async function getTools() {
  const tools = await Tool.getTools();
  if(!tools.length) {
    return {
      message: 'Não há ferramentas cadastradas',
    };
  }

  return tools;
}

export async function deleteToolById(toolId: number) {
  if (!Number.isInteger(toolId) || toolId < 1) {
    throw new ValidationError('Id do usuário inválido');
  }

  const tool = await Tool.getById(toolId);
  if(!tool) {
    throw new NotFoundError(`Ferramenta não encontrada para o id: ${toolId}`);
  }

  await Tool.deleteTool(tool);
}
