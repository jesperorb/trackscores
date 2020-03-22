import { useFirestore, useFirestoreCollection } from "reactfire";

import { matchesCollection, usersCollection, sessionsCollection } from "../config";
import { Match, MatchValues } from "../models/match";
import { Session, SessionValues } from "../models/session";
import { querySnapshotToRecords } from "./";
import { User, UserValues } from "../models/user";

export type FirebaseAppData = {
  sessions: Session[];
  matches: Match[];
  users: User[];
  sessionsRef: firebase.firestore.CollectionReference;
}

export function useFirebaseAppData(): FirebaseAppData {
  const matchesRef = useFirestore().collection(matchesCollection);
  const matchesSnapshot = useFirestoreCollection(matchesRef);
  const matchRecords = querySnapshotToRecords<Match, MatchValues>(
    <firebase.firestore.QuerySnapshot>(<unknown>matchesSnapshot),
    Match
  );

  const usersRef = useFirestore().collection(usersCollection);
  const usersSnapshot = useFirestoreCollection(usersRef);
  const userRecords = querySnapshotToRecords<User, UserValues>(
    <firebase.firestore.QuerySnapshot>(<unknown>usersSnapshot),
    User
  );

  const sessionsRef = useFirestore().collection(sessionsCollection);
  const sessionsSnapshot = useFirestoreCollection(sessionsRef);
  const sessionRecords = querySnapshotToRecords<Session, SessionValues>(
    <firebase.firestore.QuerySnapshot>(<unknown>sessionsSnapshot),
    Session
  );

  return {
    sessions: sessionRecords,
    matches: matchRecords, 
    users: userRecords, 
    sessionsRef
  };
}