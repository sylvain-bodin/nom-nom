import HttpClient from '@/services/http-client';
import { User } from '@/models/user';

class UserService {
  private httpClient = HttpClient;

  getConnectedUser(): Promise<User> {
    return this.httpClient.get('/auth/me').then((response) => response.data);
  }
}

const userService = new UserService();
export default userService;
