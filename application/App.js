import React from 'react';
import { AppLoading } from 'expo';
import {NavigationContainer} from "@react-navigation/native";
import Stack from "./navigation/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
}


