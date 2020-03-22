import { useFirestore, useFirestoreCollection } from "reactfire";

import { usersCollection, sessionsCollection, matchesCollection } from "../config";
import { Session, SessionValues } from "../models/session";
import { querySnapshotToRecords } from "./";
import { User, UserValues } from "../models/user";
import { Match } from "../models/match";

export type FirebaseAppData = {
  sessions: Session[];
  users: User[];
  sessionsRef: firebase.firestore.CollectionReference;
  usersRef: firebase.firestore.CollectionReference;
  matchesRef: firebase.firestore.CollectionReference;
}

export function useFirebaseAppData(): FirebaseAppData {
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
  const matchesRef = useFirestore().collection(matchesCollection);
  const matchesSnapshot = useFirestoreCollection(matchesRef);

  return {
    sessions: sessionRecords,
    users: userRecords,
    sessionsRef,
    usersRef,
    matchesRef
  };
}