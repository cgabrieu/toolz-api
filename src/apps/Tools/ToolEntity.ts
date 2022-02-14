import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../Users/UserEntity';
import Tag from '../Tags/TagEntity';

import ToolBody from './interfaces/ToolBody';

@Entity('tools')
export default class Tool extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  link: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  nameToLowerCase() {
    this.title = this.title.toLowerCase();
  }

  getTool() {
    return {
      id: this.id,
      userId: this.user.id,
      title: this.title,
      link: this.link,
      description: this.description,
      tags: this.tags.map((tag) => tag.name),
    };
  }

  static async getByTitleOrLink(title: string, link: string) {
    return this.findOne({ where: [{ title: title.toLowerCase() }, { link }] })
  }

  static async getById(id: number) {
    return this.findOne({ where: { id }, relations: ['user'] })
  }

  static async createTool(tool: ToolBody, userId: number) {
    const tags = await Tag.createArrayOfTags(tool.tags);
    const user = await User.getUserById(userId);

    const newTool = this.create({ ...tool, tags, user });
    return await this.save(newTool);
  }

  static async getTools() {
    const tools = await this.find({ relations: ['tags', 'user'] });

    const responseTools = tools.map((tool) => tool.getTool());
    return responseTools;
  }

  static async deleteTool(tool: Tool) {
    await this.delete(tool);
  }
}
