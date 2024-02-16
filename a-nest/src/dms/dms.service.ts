import { Injectable } from '@nestjs/common';

@Injectable()
export class DmsService {
  getChat(id) {
    return id;
  }
  postChat() {}
}
