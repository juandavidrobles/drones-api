export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructorSpy(_: T): void {}

  async findOne(): Promise<T> {
    return this.entityStub;
  }

  find() {
    return [this.entityStub];
  }

  findById() {
    return this.entityStub;
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndDelete(): Promise<T> {
    return this.entityStub;
  }
}
