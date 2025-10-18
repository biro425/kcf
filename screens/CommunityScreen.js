import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import BottomNav from '../components/BottomNav'

export default function CommunityScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>SERENE / COMMUNITY</Text>
        {/* TODO: build expert cards, community cards and posts */}
      </View>
      <BottomNav navigation={navigation} current="Community" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { fontWeight: '800', fontSize: 14, color: '#6B7280' },
})
