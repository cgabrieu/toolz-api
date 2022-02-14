import {
  BaseEntity,
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

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToMany(() => Tag, (tag: Tag) => tag.name)
  @JoinTable()
  tags: Tag[];

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

  static async findByTitleOrLink(title: string, link: string) {
    return this.findOne({ where: [{ title }, { link }] })
  }

  static async createTool(tool: ToolBody, userId: number) {
    const tags = await Tag.createArrayOfTags(tool.tags);
    const user = await User.getUserById(userId);

    const newTool = this.create({ ...tool, tags, user });
    return await this.save(newTool);
  }
}
