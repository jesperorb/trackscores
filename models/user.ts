export type UserValues = {
  id: string;
  username: string;
}

export class User {
  public readonly id: string;
  public readonly username: string;

  constructor(values: UserValues){
    this.id = values.id;
    this.username = values.username;
  }

  public static toRecord(userValues: UserValues): User {
    return new User(userValues);
  }
}