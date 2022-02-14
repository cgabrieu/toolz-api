import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Tool from '../Tools/ToolEntity';

@Entity('tags')
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column()
  name: string;

  @ManyToMany(() => Tool, (tool: Tool) => tool.id)
  tools: Tool[];

  static async findByName(name: string) {
    return await this.findOne({ name: name.toLowerCase() });
  }

  static async createTag(name: string) {
    const tag = await this.findByName(name);
    if (!tag) {
      const newTag = this.create({ name: name.toLowerCase() });
      return await this.save(newTag);
    }

    return tag;
  }

  static async createArrayOfTags(tagNames: string[]) {
    const arrayOfTags = await Promise.all(
      tagNames.map(async(tagName) => await this.createTag(tagName))
    );

    return arrayOfTags;
  }
}
