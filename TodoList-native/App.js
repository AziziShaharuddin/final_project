import { StatusBar } from 'expo-status-bar';
import React from 'react';
import login from './src/containers/login';
import register from './src/containers/register';
import dashboard from './src/containers/dashboard';
import Tasks from './src/containers/task';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/configureStore';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="register" component={register} options={{
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#142F43',
            },
            headerTintColor: "white",
            headerTitleAlign: 'center',
          }} />
          <Stack.Screen name="login" component={login} options={{
            headerShown: true,
            title: "2-Do",
            headerStyle: {
              backgroundColor: '#142F43',
            },
            headerTintColor: "white",
            headerTitleAlign: 'center',
          }} />
          <Stack.Screen name="dashboard" component={dashboard} options={{
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#142F43',
              },
              headerTintColor: "white",
              headerTitleAlign: 'center',
              headerShown: true,
              gestureEnabled: false,
            }} />
            <Stack.Screen name="Tasks" component={Tasks} options={{
              headerBackVisible: true,
              headerStyle: {
                backgroundColor: '#142F43',
              },
              headerTintColor: "white",
              headerTitleAlign: 'center',
              headerShown: true,
              gestureEnabled: false,
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     border: '1px solid black',
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 10
//   },
//   button: {
//     backgroundColor: 'burlywood',
//     paddingVertical: 10,
//     paddingHorizontal: 20
//   }
// });
