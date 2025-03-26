import { StyleSheet } from 'react-native';

const eventStyles = StyleSheet.create({
  eventTitle: {
    fontSize: 25
  },
  eventText: {
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
  }
});

export { eventStyles };
