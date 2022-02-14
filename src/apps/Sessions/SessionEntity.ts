import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../Users/UserEntity';

@Entity('sessions')
export default class Session extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column()
  token: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  getSession() {
    return {
      user: {
        name: this.user.name,
        email: this.user.email,
      },
      token: this.token,
    };
  }

  static async createSession(user: User, token: string) {
    const session = this.create({ user, token });

    await this.save(session);
    return session;
  }

  static async getSessionByToken(token: string) {
    return this.findOne({ token });
  }

  static async deleteSession(token: string) {
    await this.delete({ token });
  }
}
