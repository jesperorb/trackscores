import { useFirestore, useFirestoreCollection } from "reactfire";

import { matchesCollection, usersCollection, sessionsCollection } from "../config";
import { Match } from "../models/match";
import { Session } from "../models/session";
import { querySnapshotToRecords } from "./";
import { User } from "../models/user";

export type FirebaseAppData = {
  sessions: Session[];
  matches: Match[];
  users: User[];
  sessionsRef: firebase.firestore.CollectionReference;
}

export function useFirebaseAppData(): FirebaseAppData {
  const matchesRef = useFirestore().collection(matchesCollection);
  const matchesSnapshot = useFirestoreCollection(matchesRef);
  const matchRecords = querySnapshotToRecords<Match>(matchesSnapshot);

  const usersRef = useFirestore().collection(usersCollection);
  const usersSnapshot = useFirestoreCollection(usersRef);
  const userRecords = querySnapshotToRecords<User>(usersSnapshot);

  const sessionsRef = useFirestore().collection(sessionsCollection);
  const sessionsSnapshot = useFirestoreCollection(sessionsRef);
  const sessionRecords = querySnapshotToRecords<Session>(sessionsSnapshot);

  return {
    sessions: sessionRecords,
    matches: matchRecords, 
    users: userRecords, 
    sessionsRef
  };
}