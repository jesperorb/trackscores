import * as React from 'react';
import { useAuth } from 'reactfire';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { useFirebaseAppData } from '../../utils/hooks';
import { ScoreCard } from '../scoreCard';

export const Home: React.FC<{}> = () => {
  const { signOut } = useAuth();
  const { scores } = useFirebaseAppData();
  return <View style={styles.container}>
                <Button onPress={() => signOut()} title="Logga ut" />
                  <Text>Logged in and in the clear</Text>
                  {scores.map(score => <ScoreCard score={score} />)}
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