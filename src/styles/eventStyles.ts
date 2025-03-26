import { StyleSheet } from 'react-native';

const eventStyles = (colorScheme: 'light' | 'dark' | undefined | null) => StyleSheet.create({
  eventTitle: {
    color: colorScheme === 'dark'? '#fff': '#000',
    fontSize: 25
  },
  eventText: {
    color: colorScheme === 'dark'? '#fff': '#000',
    paddingLeft: 5,
    paddingRight: 5
  },
  eventHStack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4
  },
  eventUserIcon: {
    paddingRight: 2
  },
  eventUserRow: {
    paddingBottom: 2
  },
  eventChevron: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  eventCard: {
    backgroundColor: colorScheme === 'dark' ? '#313535' : '#dcd7d7',
  }
});

export { eventStyles };
