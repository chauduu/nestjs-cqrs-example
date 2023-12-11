import { Injectable } from '@nestjs/common';

@Injectable()
export class EventStoreService {
  private readonly events: any[] = [];

  saveEvent(event: any) {
    this.events.push(event);
    console.log('Event saved:', event);
  }

  getAllEvents(): any[] {
    return this.events;
  }
}
