import * as React from "react";
import { useFirestoreDocData, useFirestore, firestore } from "reactfire";

type MatchContainerProps = {
  sessionId: string;
  matchId: string;
}

export const MatchContainer: React.FC<MatchContainerProps> = ({
  sessionId,
  matchId,
}) => {
  const server = useFirestore()
  const updateValue = (userId: string, value: number = 1) => {
    const serverIncrement = firestore.FieldValue.increment;
    server.doc(`matches/${sessionId}/${matchId}/${userId}`).update({
      value: serverIncrement(value)
    })
  }
  console.log(sessionId, matchId);
  return <Match match={null} updateValue={updateValue} />
}

type MatchProps = {
  match: any;
  updateValue: (userId: string, value?: number) => void;
}

export const Match: React.FC<MatchProps> = ({ match }) => {
  return null;
}