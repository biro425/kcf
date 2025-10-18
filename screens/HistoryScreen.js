import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native'
import BottomNav from '../components/BottomNav'

export default function HistoryScreen({ navigation }) {
  const days = [
    {
      id: 'd1', date: '2025-10-18 (토)', items: [
        { id: 'i1', time: '08:10', title: '아침 러닝 3km', note: '맑음, 페이스 좋음' },
        { id: 'i2', time: '10:00', title: '딥워크 90m', note: '프로젝트 설계 정리' },
        { id: 'i3', time: '14:30', title: '미팅 요약 생성', note: 'AI 요약 2분 컷' },
      ]
    },
    {
      id: 'd2', date: '2025-10-17 (금)', items: [
        { id: 'i4', time: '07:40', title: '모닝 스트레칭', note: '허리 풀림' },
        { id: 'i5', time: '09:30', title: '이메일 템플릿 작성', note: '영어 표현 다듬음' },
      ]
    },
  ]
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>SERENE / HISTORY</Text>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {days.map((d, di) => (
            <View key={d.id} style={{ marginBottom: 18 }}>
              <Text style={styles.dayTitle}>{d.date}</Text>
              <View style={styles.timeline}>
                {d.items.map((it, idx) => (
                  <View key={it.id} style={styles.timelineRow}>
                    <View style={styles.timeCol}>
                      <Text style={styles.timeText}>{it.time}</Text>
                    </View>
                    <View style={styles.dotCol}>
                      <View style={styles.dot} />
                      {idx !== d.items.length - 1 && <View style={styles.line} />}
                    </View>
                    <View style={styles.cardCol}>
                      <View style={styles.card}>
                        <Text style={styles.cardTitle}>{it.title}</Text>
                        {it.note ? <Text style={styles.cardNote}>{it.note}</Text> : null}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <View style={{ height: 120 }} />
        </ScrollView>
      </View>
      <BottomNav navigation={navigation} current="History" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: { fontWeight: '800', fontSize: 14, color: '#6B7280' },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 100 },
  dayTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 8 },
  timeline: { paddingLeft: 4 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  timeCol: { width: 62, alignItems: 'flex-end', paddingRight: 8 },
  timeText: { color: '#6B7280', fontWeight: '700' },
  dotCol: { width: 22, alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#111' },
  line: { width: 2, flex: 1, backgroundColor: '#E5E7EB', marginTop: 2 },
  cardCol: { flex: 1, paddingLeft: 8 },
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E5E7EB', padding: 12 },
  cardTitle: { color: '#111827', fontWeight: '800', marginBottom: 4 },
  cardNote: { color: '#374151' },
})
