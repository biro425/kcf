import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import BottomNav from '../components/BottomNav'

export default function CommunityScreen({ navigation }) {
  const palette = {
    bg: '#FFFFFF',
    text: '#111827',
    sub: '#6B7280',
    border: '#E5E7EB',
    chipBg: '#F3F4F6',
    accent: '#111111',
  }

  const experts = [
    { id: 'e1', name: 'Dr. Kim', role: '멘탈 코치', desc: '집중력 • 루틴' },
    { id: 'e2', name: 'Alex', role: '프로덕트 매니저', desc: '우선순위 • 일정' },
    { id: 'e3', name: 'Mina', role: '소프트웨어 엔지니어', desc: '코딩 • 리뷰' },
  ]
  const groups = [
    { id: 'g1', title: '아침 루틴 챌린지', members: 842 },
    { id: 'g2', title: '스터디 • 집중방', members: 1294 },
  ]
  const posts = [
    { id: 'p1', user: 'JH', name: 'Junho', time: '2m', text: '오늘 루틴 공유합니다. 5시 기상 -> 30분 러닝 -> 1시간 딥워크. 팁은 알람을 침대에서 멀리 두는 것!', tags: ['루틴', '딥워크'], likes: 23, comments: 5 },
    { id: 'p2', user: 'SY', name: 'Soyeon', time: '14m', text: '영어 메일 표현 모음집 업데이트했어요. 필요한 분 댓글 주세요 🙌', tags: ['영어', '이메일'], likes: 41, comments: 12 },
    { id: 'p3', user: 'MK', name: 'Minho', time: '1h', text: '코드 리뷰 포인트 3가지: 이름, 사이드이펙트, 테스트. 내 PR 템플릿에 붙여두고 있어요.', tags: ['코드리뷰'], likes: 58, comments: 9 },
  ]

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>SERENE / COMMUNITY</Text>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Experts */}
          <View style={styles.sectionHeaderRow}><Text style={styles.sectionTitle}>전문가 추천</Text><Text style={styles.sectionMore}>더보기</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {experts.map((e) => (
              <View key={e.id} style={[styles.card, styles.expertCard, { borderColor: palette.border }]}> 
                <View style={styles.avatarLg}><Text style={styles.avatarLgText}>{e.name.slice(0,1)}</Text></View>
                <Text style={styles.cardTitle}>{e.name}</Text>
                <Text style={styles.cardSub}>{e.role}</Text>
                <Text style={styles.cardDesc}>{e.desc}</Text>
                <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: palette.accent }]}>
                  <Text style={styles.primaryBtnText}>팔로우</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Groups */}
          <View style={styles.sectionHeaderRow}><Text style={styles.sectionTitle}>커뮤니티</Text></View>
          <View style={styles.groupGrid}>
            {groups.map((g) => (
              <View key={g.id} style={[styles.card, styles.groupCard, { borderColor: palette.border }]}> 
                <Text style={styles.groupTitle}>{g.title}</Text>
                <Text style={styles.groupMeta}>{g.members.toLocaleString()}명 참여중</Text>
                <View style={styles.groupActions}>
                  <TouchableOpacity style={[styles.chip, { backgroundColor: palette.chipBg, borderColor: palette.border }]}>
                    <Text style={styles.chipText}>소개</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.primaryBtnSm, { backgroundColor: palette.accent }]}>
                    <Text style={styles.primaryBtnText}>참여</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Live posts */}
          <View style={styles.sectionHeaderRow}><Text style={styles.sectionTitle}>라이브 피드</Text></View>
          <View style={{ gap: 12 }}>
            {posts.map((p) => (
              <View key={p.id} style={[styles.postCard, { borderColor: palette.border }]}> 
                <View style={styles.postHeader}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>{p.user}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.postName}>{p.name}</Text>
                    <Text style={styles.postTime}>{p.time}</Text>
                  </View>
                  <Text style={styles.postActions}>⋯</Text>
                </View>
                <Text style={styles.postText}>{p.text}</Text>
                <View style={styles.tagRow}>
                  {p.tags.map((t) => (
                    <View key={t} style={[styles.tag, { backgroundColor: palette.chipBg, borderColor: palette.border }]}>
                      <Text style={styles.tagText}>#{t}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>❤ {p.likes}</Text>
                  <Text style={styles.metaText}>💬 {p.comments}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </View>
      <BottomNav navigation={navigation} current="Community" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: { fontWeight: '800', fontSize: 14, color: '#6B7280' },
  content: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 100, gap: 14 },
  sectionHeaderRow: { paddingTop: 8, paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  sectionMore: { fontSize: 13, color: '#6B7280', fontWeight: '600' },

  // Cards
  card: { width: 200, padding: 14, borderRadius: 16, backgroundColor: '#fff', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 6 },
  expertCard: { alignItems: 'center' },
  avatarLg: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarLgText: { color: '#fff', fontSize: 24, fontWeight: '800' },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  cardSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  cardDesc: { fontSize: 12, color: '#374151', marginTop: 6, marginBottom: 10 },
  primaryBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999 },
  primaryBtnSm: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },

  // Groups
  groupGrid: { flexDirection: 'row', gap: 12 },
  groupCard: { flex: 1, minWidth: 0 },
  groupTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  groupMeta: { fontSize: 12, color: '#6B7280', marginTop: 6 },
  groupActions: { flexDirection: 'row', gap: 8, marginTop: 12, alignItems: 'center' },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
  chipText: { color: '#374151', fontWeight: '700', fontSize: 12 },

  // Posts
  postCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, padding: 14 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  avatarText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  postName: { color: '#111827', fontWeight: '800' },
  postTime: { color: '#6B7280', fontSize: 12 },
  postActions: { color: '#6B7280', fontSize: 22, paddingHorizontal: 6 },
  postText: { color: '#111827', fontSize: 14, lineHeight: 20, marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: StyleSheet.hairlineWidth },
  tagText: { color: '#374151', fontWeight: '700', fontSize: 12 },
  metaRow: { flexDirection: 'row', gap: 14 },
  metaText: { color: '#6B7280', fontWeight: '700' },
})
