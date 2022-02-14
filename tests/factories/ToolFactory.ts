import faker from '@faker-js/faker';
import ToolBody from '../../src/apps/Tools/interfaces/ToolBody';
import Tool from '../../src/apps/Tools/ToolEntity';

export default async function createTool(userId: number): Promise<Tool> {
  const tool: ToolBody = {
    title: faker.random.word().toLowerCase(),
    link: faker.internet.url(),
    description: faker.random.words(20),
    tags: ['one', 'two'],
  };

  return await Tool.createTool(tool, userId);
}
