import { FirebaseTimestamp } from "./firebaseTimeStamp";

export type SessionValues = {
  id?: string;
  participants: string[],
  scores: string[]
  sessionStartTime: FirebaseTimestamp;
  sessionEndTime: FirebaseTimestamp;
}

export class Session {
  public readonly id: string | undefined;
  public readonly participants: string[];
  public readonly scores: string[];
  public readonly sessionStartTime: Date | null;
  public readonly sessionEndTime: Date | null;

  constructor(values: Partial<SessionValues>){
    this.id = values.id;
    this.participants = values.participants ?? [];
    this.scores = values.scores ?? [];
    this.sessionStartTime = values.sessionStartTime?.toDate() ?? null;
    this.sessionEndTime = values.sessionEndTime?.toDate() ?? null;
  }

  public static toRecord(scoreValues: Partial<SessionValues>): Session {
    return new Session(scoreValues);
  }
}