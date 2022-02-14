import UserBody from '@/apps/Users/interfaces/UserBody';

export default interface SessionBody {
  id?: number,
  token: string,
  user: UserBody,
}
