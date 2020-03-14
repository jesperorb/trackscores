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

import { firebaseConfig, defaultCollection } from './config';
import { LoginForm } from './LoginForm';
import { Score } from './score';

const InnerApp = () => {
  const auth = useAuth();
  const collectionRef = useFirestore()
    .collection(defaultCollection);
  const scoreValues = useFirestoreCollectionData(collectionRef);
  const scoreRecords = scoreValues?.map(Score.toRecord) ?? [];
  console.log(scoreRecords);
  return <View style={styles.container}>
                <Button onPress={() => auth.signOut()} title="Logga ut" />
                <Text>Logged in and in the clear</Text>
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
