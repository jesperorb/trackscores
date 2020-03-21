import { FirebaseTimestamp } from "./firebaseTimeStamp";

export type ScoreValues = {
  winningUid: string;
  losingUid: string;
  reportedByUid: string;
  winningsideScore: number;
  losingsideScore: number;
  sessionStartTime: FirebaseTimestamp;
  sessionEndTime: FirebaseTimestamp;
  reportedAt: FirebaseTimestamp;
}

export class Score {

  public readonly winningUid: string;
  public readonly losingUid: string;
  public readonly reportedByUid: string;
  public readonly winningsideScore: number;
  public readonly losingsideScore: number;
  public readonly sessionStartTime: Date;
  public readonly sessionEndTime: Date;
  public readonly reportedAt: Date;

  constructor(values: ScoreValues){
    this.winningUid = values.winningUid;
    this.losingUid = values.losingUid;
    this.reportedByUid = values.reportedByUid;
    this.winningsideScore = values.winningsideScore;
    this.losingsideScore = values.losingsideScore;
    this.sessionStartTime = values.sessionStartTime?.toDate();
    this.sessionEndTime = values.sessionEndTime?.toDate();
    this.reportedAt = values.reportedAt?.toDate();
  }

  public static toRecord(scoreValues: ScoreValues): Score {
    return new Score(scoreValues);
  }
}