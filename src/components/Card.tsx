import React from 'react';
import { View, StyleSheet } from 'react-native';

function Card({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
  },
});

export default Card;
