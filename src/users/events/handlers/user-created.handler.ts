import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';
import { EventStoreService } from '../stores/user-created.store';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly eventStoreService: EventStoreService) {}
  handle(event: UserCreatedEvent) {
    console.log('Task created : ' + event.userId);
    this.eventStoreService.saveEvent(event);
  }
}
