/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Dashboard from './src/screens/Dashboard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <Dashboard />
    </SafeAreaProvider>
  );
}

export default App;
