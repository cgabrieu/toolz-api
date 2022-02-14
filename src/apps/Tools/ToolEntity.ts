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

  static async findByTitleOrLink(title: string, link: string) {
    return this.findOne({ where: [{ title }, { link }] })
  }

  static async createTool(tool: ToolBody) {
    const tags = await Tag.createArrayOfTags(tool.tags);

    const newTool = this.create({ ...tool, tags });
    return await this.save(newTool);
  }
}
