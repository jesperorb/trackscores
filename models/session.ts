import { FirebaseTimestamp } from "./firebaseTimeStamp";

export type SessionValues = {
  participants: string[],
  scores: string[]
  date: FirebaseTimestamp;
}

export class Session {
  public readonly participants: string[];
  public readonly scores: string[];
  public readonly date: Date | null;

  constructor(values: Partial<SessionValues>){
    this.participants = values.participants ?? [];
    this.scores = values.scores ?? [];
    this.date = values.date?.toDate() ?? null;
  }

  public static toRecord(scoreValues: Partial<SessionValues>): Session {
    return new Session(scoreValues);
  }
}