import React from 'react'
import { SafeAreaView, View, StyleSheet, ImageBackground } from 'react-native'
import BottomNav from '../components/BottomNav'

export default function PersonalScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require('../assets/Frame 15.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* If you need overlays on top of the background, add them here */}
      </ImageBackground>
      <BottomNav navigation={navigation} current="Personal" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  bg: { flex: 1 },
})
