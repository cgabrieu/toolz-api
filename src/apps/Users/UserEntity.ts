import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import UserBody from './interfaces/UserBody';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  static async getUserById(userId: number) {
    const user = await this.findOne({ id: userId });
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await this.findOne({ email });
    return user;
  }

  static async createUser(body: UserBody) {
    const hashedPassword = bcrypt.hashSync(body.password, 12);
    const user = this.create({ ...body, password: hashedPassword });

    await this.save(user);

    delete user.password;
    return user;
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) return user;

    return null;
  }
}
