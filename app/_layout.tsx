import '../global.css';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  //initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal',title:"Investing" }} />
      <Stack.Screen name="index" options={{ headerShown: false  }} />
      <Stack.Screen name="cypto" options={{ title:"Cypto" }}/>
      <Stack.Screen name="stocks" options={{ title:"Stocks" }}/>
      <Stack.Screen name="forex" options={{ title:"Forex" }}/>
      <Stack.Screen name="options" options={{ title:"Options" }}/>
      <Stack.Screen name="indices" options={{ title:"Indeices" }}/>
      <Stack.Screen name="quiz" options={{ title:"Quiz" }}/>
    </Stack>
  );
}
