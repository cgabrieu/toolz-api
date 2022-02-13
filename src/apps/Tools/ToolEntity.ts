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
}
