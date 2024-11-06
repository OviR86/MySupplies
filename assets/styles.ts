export const customElevation = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};

export const Colors = {
  red: '#fb0506',
  purpleMid: '#8b54fb',
  purpleDark: '#a53cc3',
  lightBlue: '#05fbfb',
  blueGray: '#b7ecf1',
  inactiveGray: '#b9b7bd',
  darkGray: '#4A4A4A',
};

export const statusColors: Record<string, string> = {
  new: Colors.lightBlue,
  processing: Colors.purpleMid,
  sent: 'green',
  cancelled: 'red',
};
