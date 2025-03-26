import React from 'react';
import { View, StyleSheet } from 'react-native';

function Card({ darkMode, children }: { darkMode: boolean, children: React.ReactNode }): React.JSX.Element {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: darkMode ? '#313535' : '#dcd7d7',
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

  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

export default Card;
