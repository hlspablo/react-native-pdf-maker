import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'react-native-pdf-maker';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    //test('Hello World PDF').then(console.log);
    multiply(3, 3).then(setResult);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
