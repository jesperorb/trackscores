import { useFirestore, useFirestoreCollection } from "reactfire";

import { scoresCollection, usersCollection, sessionsCollection } from "../config";
import { ScoreValues, Score } from "../models/score";
import { Session, SessionValues } from "../models/session";

export type FirebaseAppData = {
  sessions: Session[];
  scores: Score[];
  users: any;
}

export function useFirebaseAppData(): FirebaseAppData {
  const scoresRef = useFirestore().collection(scoresCollection);
  const usersRef = useFirestore().collection(usersCollection);
  const sessionsRef = useFirestore().collection(sessionsCollection);
  const scoreValues: ScoreValues[] = useFirestoreCollection(scoresRef);
  const sessionValues: SessionValues[] = useFirestoreCollection(sessionsRef);
  const sessions = sessionValues?.map(Session.toRecord) ?? [];
  const users = useFirestoreCollection(usersRef);
  const scores = scoreValues?.map(Score.toRecord) ?? [];
  return { sessions, scores, users };
}