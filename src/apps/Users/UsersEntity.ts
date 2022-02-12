import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
    id?: number;

  @Column()
    name: string;

  @Column({ unique: true })
    email: string;

  @Column()
    password: string;

  static async getUserByEmail(email: string) {
    const user = await this.findOne({ email });
    return user;
  }

  static async createUser(body: Users) {
    const hashedPassword = bcrypt.hashSync(body.password, 12);
    const user = this.create({ ...body, password: hashedPassword });

    await this.save(user);

    delete user.password;
    return user;
  }
}
