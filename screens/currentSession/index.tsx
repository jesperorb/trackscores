import * as React from 'react';
import { Button } from "react-native-elements";
import { View, StyleSheet, Picker } from 'react-native';

import { Session } from '../../models/session';
import { useFirebaseAppData } from '../../utils/hooks';
import { User } from '../../models/user';

/**
 * 1. Start session with multiple users
 * 2. An active session should only be one and the active session will have no end time
 * 3. In ActiveSession you should be able to track scores by pressing plus (+) on each player
 *  * | + [11] Orb - Paz [9] + | 
 *  * | + [5] Orb - Lu [3]   + | 
 * 5. When all scores are done you should end the session and the session will get an endtime
 */

export const CurrentSession: React.FC<{}> = () => {
  const { sessions, sessionsRef, users } = useFirebaseAppData();
  const [ user1, setUser1] = React.useState<User>();
  const [ user2, setUser2] = React.useState<User>();
  const activeSession = false  //sessions.find(s => !s.sessionEndTime);

  const startSession = () => {
    if(user1 && user2) {
      const session = new Session({
        participants: [user1.id, user2.id],
      });
      sessionsRef.add(session)
    }
  }

  const endSesssion = () =>{
    // sessionsRef.doc("{session.id}/sessionEndTime").set(new Date());
  }

  return <View style={styles.container}>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={user1}
                  onValueChange={(value) => setUser1(value)}
                >
                  {users?.map(user => <Picker.Item key={user.id} value={user.id} label={user.username} />)}
                </Picker>
                <Picker
                  style={styles.picker}
                  selectedValue={user2}
                  onValueChange={(value) => setUser2(value)}
                >
                  {users?.map(user => <Picker.Item key={user.id} value={user.id} label={user.username} />)}
                </Picker>
              </View>
              <Button onPress={() => {}} title="Starta session" />
              { activeSession && <ActiveSession session={activeSession} />}
          </View>
}

const ActiveSession: React.FC<{ session: Session }> = ({ session }) => {

  const incrementScore = () => {
    // will increment `score1.score` or `score2.score`
  }

  const createNewMatch = () => {
    // Will create a new Match in the database and a new row in active session
  }

  return <View></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: "row"
  },
  picker: {
    height: 50,
    width: 100
  }
});