import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import BottomNav from '../components/BottomNav'

export default function HistoryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>SERENE / HISTORY</Text>
        {/* TODO: build timeline UI */}
      </View>
      <BottomNav navigation={navigation} current="History" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { fontWeight: '800', fontSize: 14, color: '#6B7280' },
})
