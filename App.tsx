import * as React from 'react';
import { Suspense } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-elements";
import {
  FirebaseAppProvider,
  useFirestore,
  useFirestoreCollectionData,
  AuthCheck,
  useAuth,
} from 'reactfire';

import { firebaseConfig, scoresCollection, usersCollection } from './config';
import { LoginForm } from './LoginForm';
import { Score } from './score';

const InnerApp = () => {
  const auth = useAuth();
  const scoresRef = useFirestore()
    .collection(scoresCollection);
  const usersRef = useFirestore()
    .collection(usersCollection);
  const values = useFirestoreCollectionData(scoresRef);
  const users = useFirestoreCollectionData(usersRef);
  const record = values?.map(Score.toRecord) ?? [];
  return <View style={styles.container}>
                <Button onPress={() => auth.signOut()} title="Logga ut" />
                  <Text>Logged in and in the clear</Text>
                  {record.map(record => <View key={record.reportedByUid}>
                  <Text>{record.winningsideScore} - {record.losingsideScore}</Text>
                  <Text>{record.sessionStartTime.toLocaleDateString()} - {record.sessionEndTime.toLocaleDateString()}</Text>
                  <Text>{record.losingUid} - {record.winningUid}</Text>
                </View>)}
              </View>
}

export default function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<Text>Loading</Text>}>
        <AuthCheck fallback={<LoginForm />}>
          <InnerApp />
        </AuthCheck>
      </Suspense>
    </FirebaseAppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
