import * as React from "react";
import { useAuth } from "reactfire";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export const Profile = () => {
  const { signOut } = useAuth();
  return <View style={styles.container}>
            <Button onPress={() => signOut()} title="Logga ut" />
            <Text>Logged in and in the clear</Text>  
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