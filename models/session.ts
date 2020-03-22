import { FirebaseTimestamp } from "./firebaseTimeStamp";

export type SessionValues = {
  id?: string;
  matches: string[];
  participants: string[];
  startTime: FirebaseTimestamp;
  endTime: FirebaseTimestamp;
  reportedBy: string;
}

export class Session {
  public readonly id: string | undefined;
  public readonly matches: string[];
  public readonly participants: string[];
  public readonly startTime: Date | null;
  public readonly endTime: Date | null;
  public readonly reportedBy: string;

  constructor(values: Partial<SessionValues>){
    this.id = values.id;
    this.matches = values.matches ?? [];
    this.participants = values.participants ?? [];
    this.startTime = values.startTime?.toDate() ?? null;
    this.endTime = values.endTime?.toDate() ?? null;
    this.reportedBy = values.reportedBy ?? "";
  }
}