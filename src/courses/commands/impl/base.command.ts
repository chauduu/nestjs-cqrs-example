export class CreateCommand<T> {
  constructor(public readonly data: T) {}
}

export class UpdateCommand<T> {
  constructor(
    public readonly id: string,
    public readonly data: Partial<T>,
  ) {}
}

export class DeleteCommand {
  constructor(public readonly id: string) {}
}
