import { Injectable } from '@nestjs/common';
import { EventStoreService } from '../stores/user-created.store';

@Injectable()
export class ReplayLogic {
  constructor(private readonly eventStoreService: EventStoreService) {}

  replayEvents() {
    const allEvents = this.eventStoreService.getAllEvents();
    console.log('Replaying all events:', allEvents);
    //test event sourcing
  }
}
