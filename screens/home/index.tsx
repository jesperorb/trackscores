import * as React from 'react';
import { useAuth, useFirestore, useFirestoreCollectionData } from 'reactfire';

import { usersCollection, scoresCollection } from '../../config';
import { Score } from '../../models/score';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const Home: React.FC<{}> = () => {
  const auth = useAuth();
  const scoresRef = useFirestore()
    .collection(scoresCollection);
  const usersRef = useFirestore()
    .collection(usersCollection);
  const values = useFirestoreCollectionData(scoresRef);
  const users = useFirestoreCollectionData(usersRef);
  const records = values?.map(Score.toRecord) ?? [];
  return <View style={styles.container}>
                <Button onPress={() => auth.signOut()} title="Logga ut" />
                  <Text>Logged in and in the clear</Text>
                  {records.map(record => <View key={record.reportedByUid}>
                  <Text>{record.winningsideScore} - {record.losingsideScore}</Text>
                  <Text>{record.sessionStartTime.toLocaleDateString()} - {record.sessionEndTime.toLocaleDateString()}</Text>
                  <Text>{record.losingUid} - {record.winningUid}</Text>
                </View>)}
          </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});