import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Expo React Native 앱</Text>
        <Text style={styles.subtitle}>메인 컨텐츠 영역</Text>
      </View>

      {/* Bottom navigation container */}
      <View style={styles.navWrapper} pointerEvents="box-none">
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.icon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('About')}>
            <Text style={styles.icon}></Text>
          </TouchableOpacity>

          {/* spacer for center button */}
          <View style={styles.centerSpacer} />

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.icon}>▢</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Center floating action button */}
        <TouchableOpacity style={styles.centerButton} onPress={() => alert('Center action')}>
          <Text style={styles.centerIcon}>✦</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100, // leave space for nav
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },

  navWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -20,
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 55,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'android' ? 10 : 20,
  },
  navItem: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    color: '#111',
  },
  centerSpacer: {
    width: 72, // leave room for center floating button
  },
  centerButton: {
    position: 'absolute',
    bottom: 26,
    width: 60,
    height: 60,
    borderRadius: 36,
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    justifyContent: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  centerIcon: {
    fontSize: 35,
    color: '#fff',
  },
});
