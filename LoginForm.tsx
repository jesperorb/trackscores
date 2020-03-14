import * as React from "react";
import { Input, Button } from "react-native-elements";
import { useAuth } from "reactfire";
import { View, StyleSheet } from "react-native";

type LoginFormProps = {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const auth = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  // TODO: Handle more cases and add validation
  const signInOrRegister = () => {
      setLoading(true);
      auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          console.log(error);
          if(error.code == "auth/user-not-found"){
            auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
              if(username) {
                result.user.updateProfile({
                  displayName: username
                }).then(() => setLoading(false))
              } else {
                setLoading(false);
              }
            })
          }
        })
        .then(() => setLoading(false))
  }

  return <View style={styles.container}>
          <Input 
            placeholder="Användarnamn (behöver bara skrivas in vid registrering)"
            textContentType="name"
            onChangeText={(value: string) => setUsername(value)}
          />
          <Input 
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={(value: string) => setEmail(value)}
          />
          <Input 
            placeholder="Lösenord"
            textContentType="password"
            onChangeText={(value: string) => setPassword(value)}
          />
          <Button onPress={signInOrRegister} disabled={loading} title="Logga in" />
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
