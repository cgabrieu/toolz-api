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
}
