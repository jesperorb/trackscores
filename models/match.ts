import { FirebaseTimestamp } from "./firebaseTimeStamp";

export type Score = {
  userId: string;
  score: number;
}

export type MatchValues = {
  id: string;
  score1: Score;
  score2: Score;
  reportedBy: string;
  reportedAt: FirebaseTimestamp;
}

export class Match {
  public readonly id: string;
  public readonly score1: Score;
  public readonly score2: Score;
  public readonly reportedBy: string;
  public readonly reportedAt: Date;

  constructor(values: MatchValues){
    this.id = values.id;
    this.score1 = values.score1;
    this.score2 = values.score2;
    this.reportedBy = values.reportedBy;
    this.reportedAt = values.reportedAt?.toDate();
  }

  public static toRecord(matchValues: MatchValues): Match {
    return new Match(matchValues);
  }
}