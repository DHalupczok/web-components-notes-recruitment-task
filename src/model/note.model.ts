import { v4 as uuidv4 } from 'uuid';

export class Note {
  public readonly id: string;
  public readonly createdAt: Date;
  private _title: string;
  private _description: string;

  constructor(
    title: string,
    description: string,
    createdAt = new Date(),
    id = uuidv4(),
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this._title = title;
    this._description = description;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get description(): string {
    return this._description;
  }

  set description(newDescription: string) {
    this._description = newDescription;
  }
}
