import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    await this.createUsers();
  }

  private async createUsers() {
    const users = [
      { email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { email: 'user@example.com', password: 'user123', role: 'user' },
      { email: 'pratik@example.com', password: 'pratik', role: 'user' },
      { email: 'sneh@example.com', password: 'sneh', role: 'user' },
    ];

    for (const user of users) {
      await this.userService.create(user);
    }
  }
}
