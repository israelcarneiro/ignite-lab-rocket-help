import React from "react";

import {NativeBaseProvider, StatusBar} from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

// import { SignIn } from "./src/screens/SignIn";
// import { Home } from "./src/screens/Home";
// import { Register } from "./src/screens/Register";

import { THEME } from "./src/styles/theme";

import { Loading } from "./src/components/Loading";
import { Details } from "./src/screens/Details";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
        />
      { fontsLoaded ? <Details/> : <Loading/>}
    </NativeBaseProvider>
  );
}
