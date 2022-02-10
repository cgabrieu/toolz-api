import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export default class Users {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
