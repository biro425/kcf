import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Platform, Image, Dimensions } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Top header image */}
      <View style={styles.headerWrapper}>
        <Image source={require('../assets/top.png')} style={styles.headerImage} resizeMode="cover" />
        <View style={styles.headerOverlay} pointerEvents="none">
          <View style={styles.headerText}>
          </View>
          <Image source={require('../assets/app-icon.png')} style={styles.avatar} />
        </View>
      </View>



      {/* Bottom navigation container */}
      <View style={styles.navWrapper} pointerEvents="box-none">
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.icon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('About')}>
            <Text style={styles.icon}>≡</Text>
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

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 160;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerWrapper: {
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerImage: {
    width: width,
    height: CARD_HEIGHT,
    borderRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CARD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  brand: {
    color: '#9aa0a6',
    fontWeight: '700',
    marginBottom: 6,
  },
  greeting: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  headline: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 26,
    textAlign: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginTop: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
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
    width: 50,
    height: 50,
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
