export class Content {
  static get getTableName(): string {
    return 'content';
  }
  public id: number;
  public public_id: string;
  public file: string;
}
