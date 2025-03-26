import { StyleSheet } from 'react-native';

const headerStyles = (colorScheme: 'light' | 'dark' | undefined | null) => StyleSheet.create({
  header: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative' as 'relative',
    backgroundColor: colorScheme === 'dark'? '#272727' : '#fff',
  },
  headerText: {
    flex: 1,
    textAlign: 'center' as 'center',
    fontSize: 20,
    color: colorScheme === 'dark'? '#fff': '#000',
    zIndex: 1,
  },
  headerButtons: {
    flexDirection: 'row' as 'row',
    position: 'absolute' as 'absolute',
    right: 10,
    zIndex: 2,
  },
  headerButton: {
    marginLeft: 10,
    paddingRight: 10,
  }
});

export { headerStyles };
