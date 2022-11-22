//EXPO
import { StatusBar } from 'expo-status-bar';
//REACT
import { StyleSheet } from 'react-native';
//COMPONENTS
import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';
//GOOGLE FONTS
import { 
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from "@expo-google-fonts/roboto";
//SAFE AREA CONTEXT
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import { Header } from './src/components/Header';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  
  return (
    <SafeAreaProvider>
      {fontsLoaded ? <Routes/> : <Loading/> } 
      <StatusBar 
        style='dark'
        backgroundColor= 'transparent'
        translucent
      />
    </SafeAreaProvider>
  );
}