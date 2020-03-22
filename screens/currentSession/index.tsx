import * as React from "react";
import { Button } from "react-native-elements";
import { View, StyleSheet, Picker, Text } from "react-native";

import { Session } from "../../models/session";
import { useFirebaseAppData } from "../../utils/hooks";
import { MatchContainer } from "../match";
import { User } from "../../models/user";
import firebase from "firebase";

/**
 * 1. Start session with multiple users
 * 2. An active session should only be one and the active session will have no end time
 * 3. In ActiveSession you should be able to track scores by pressing plus (+) on each player
 *  * | + [11] Orb - Paz [9] + |
 *  * | + [5] Orb - Lu [3]   + |
 * 5. When all scores are done you should end the session and the session will get an endtime
 */

export const CurrentSession: React.FC<{}> = () => {
  // Maybe move this to context so we can always access the refs and users
  const { sessions, users, sessionsRef, matchesRef } = useFirebaseAppData();
  // This will be replaced by a usestate that has a list of users that will be added
  const [user1, setUser1] = React.useState<string>();
  const [user2, setUser2] = React.useState<string>();
  const activeSession = sessions.find(s => !s.endTime);

  const startSession = () => {
    if (user1 && user2) {
      const session = {
        participants: [user1, user2],
        startTime: new Date(),
        endTime: null,
        matches: []
      };
      sessionsRef.add(session);
    }
  };

  const endSesssion = () => {
    if (activeSession) {
      sessionsRef.doc(`${activeSession.id}/endTime`).set(new Date());
    }
  };

  return (
    <View style={styles.container}>
      {!activeSession ? (
        <>
          <View style={styles.pickerContainer}>
            {/** this will not be two pickers, it will be a multiselect where you can choose more that two people */}
            <Picker
              style={styles.picker}
              selectedValue={user1}
              onValueChange={(value: string) => setUser1(value)}
            >
              {users?.map(user => (
                <Picker.Item
                  key={user.id}
                  value={user.id}
                  label={user.username}
                />
              ))}
            </Picker>
            {/** this will not be two pickers, it will be a multiselect where you can choose more that two people */}

            <Picker
              style={styles.picker}
              selectedValue={user2}
              onValueChange={(value: string) => setUser2(value)}
            >
              {users?.map(user => (
                <Picker.Item
                  key={user.id}
                  value={user.id}
                  label={user.username}
                />
              ))}
            </Picker>
          </View>
          <Button onPress={startSession} title="Starta session" />
        </>
      ) : (
        <>
          <ActiveSessionContainer session={activeSession} users={users} matchesRef={matchesRef} sessionsRef={sessionsRef} />
          <Button onPress={endSesssion} title="Avsluta session" />
        </>
      )}
    </View>
  );
};

type ActiveSessionContainerProps = {
  session: Session;
  matchesRef: firebase.firestore.CollectionReference;
  sessionsRef: firebase.firestore.CollectionReference;
  users: User[];
};

const ActiveSessionContainer: React.FC<ActiveSessionContainerProps> = ({
  session,
  matchesRef,
  sessionsRef,
  users
}) => {
  const [user1, setUser1] = React.useState<string>();
  const [user2, setUser2] = React.useState<string>();

  const startMatch = async () => {
    if(user1 && user2) {
      const newMatch = await matchesRef.add({
        sessionId: session.id,
        [user1]: 0,
        [user2]: 0
      });
      sessionsRef.doc(`${session.id}/matches`).update({
        matches: firebase.firestore.FieldValue.arrayUnion(newMatch.id)
      });
    }
  };

  return (
    <View>
      <Text>{session.startTime?.toLocaleDateString()}</Text>
      {session.matches?.map(m => (
        <MatchContainer sessionId={session.id ?? ""} matchId={m} />
      ))}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={user1}
          onValueChange={(value: string) => setUser1(value)}
        >
          {users?.map(user => (
            <Picker.Item key={user.id} value={user.id} label={user.username} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={user2}
          onValueChange={(value: string) => setUser2(value)}
        >
          {users?.map(user => (
            <Picker.Item key={user.id} value={user.id} label={user.username} />
          ))}
        </Picker>
        <Button onPress={startMatch} title="Starta ny match" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  pickerContainer: {
    flexDirection: "row"
  },
  picker: {
    height: 50,
    width: 100
  }
});
