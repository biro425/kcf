import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'

export default function BottomNav({ navigation, current }) {
  const go = (name) => () => navigation.navigate(name)
  const is = (name) => current === name
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.bar}>
        <TouchableOpacity style={styles.item} onPress={go('Home')}>
          <Text style={[styles.icon, is('Home') && styles.iconActive]}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={go('Personal')}>
          <Text style={[styles.icon, is('Personal') && styles.iconActive]}>▤</Text>
        </TouchableOpacity>
        <View style={styles.centerSpacer} />
        <TouchableOpacity style={styles.item} onPress={go('Community')}>
          <Text style={[styles.icon, is('Community') && styles.iconActive]}>▢</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={go('History')}>
          <Text style={[styles.icon, is('History') && styles.iconActive]}>☰</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.centerButton} onPress={go('Chat')}>
        <Text style={styles.centerIcon}>✦</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22, color: '#111' },
  iconActive: { color: '#000' },
  centerSpacer: { width: 72 },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  centerIcon: { fontSize: 28, color: '#fff' },
})
