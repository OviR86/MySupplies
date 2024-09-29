import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface WithBadgeProps {
  showBadge?: boolean;
  badgeNumber?: number;
}

const withBadge = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & WithBadgeProps) => {
    const { showBadge, badgeNumber, ...restProps } = props;

    return (
      <View style={styles.container}>
        <Component {...(restProps as P)} />
        {showBadge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badgeNumber}</Text>
          </View>
        )}
      </View>
    );
  };
};

export default withBadge;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -7,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
