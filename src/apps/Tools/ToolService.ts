import Tool from './ToolEntity';

export async function createTool(body: Tool) {
  const tool = await Tool.findByTitleOrLink(body.title, body.link);
  console.log(tool);
}
