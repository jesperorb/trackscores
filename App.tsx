import * as React from 'react';
import { Suspense } from 'react';
import { Text, View } from 'react-native';
import {
  FirebaseAppProvider,
  AuthCheck,
} from 'reactfire';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { firebaseConfig } from './config';
import { LoginForm } from './LoginForm';
import { CurrentSession } from './screens/currentSession';
import { Profile } from './screens/profile';

const Tab = createBottomTabNavigator();

const App:React.FC<{}> = () => {
  return <Tab.Navigator
            screenOptions={({ route })=> {
              const iconName = route.name === 'Scores' ? "ios-arrow-left" : "ios-arrow-right";
              return {
                tabBarIcon: ({ size }) => <Ionicons name={iconName} size={size} />
              }
            }}
          >
            <Tab.Screen name="Current Session" component={CurrentSession} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
}

export default function AppContainer() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <NavigationContainer>
        <Suspense fallback={<Text>Loading</Text>}>
          <AuthCheck fallback={<LoginForm />}>
            <App />
          </AuthCheck>
        </Suspense>
      </NavigationContainer>
    </FirebaseAppProvider>
  );
}
