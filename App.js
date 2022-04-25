import React from 'react';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Tabs from "./src/navigation/tabs";

const Stack = createNativeStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
       
        await SplashScreen.preventAutoHideAsync();
        
        await Font.loadAsync({"Roboto-Bold": require('./src/assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Black": require('./src/assets/fonts/Roboto-Black.ttf'),
        "Roboto-Regular": require('./src/assets/fonts/Roboto-Regular.ttf'),});
       
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  onLayoutRootView()
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Dashboard'}
      >
        <Stack.Screen
          name="Dashboard1"
          component={Tabs}
        />

       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;