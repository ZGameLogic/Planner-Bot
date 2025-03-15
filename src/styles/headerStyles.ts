const headerStyles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    zIndex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    zIndex: 2,
  },
  headerButton: {
    paddingRight: 10,
  },
};

export { headerStyles };
