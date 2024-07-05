import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  notificationWrapper: {
    width: windowWidth * 0.85,
    alignSelf: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  notificationBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#162E4A',
    paddingTop: 10,
    paddingHorizontal: 13,
    paddingBottom: 12,
  },
  titleNoti: {
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    color: '#162E4A',
    lineHeight: 32,
    textTransform: 'uppercase',
  },
  textNoti: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: '#162E4A',
  },
  notificationNon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: windowWidth * 0.8,
    alignSelf: "center"
  },
});

export default styles;
