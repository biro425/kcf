import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import BottomNav from '../components/BottomNav'

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top header image */}
        <View style={styles.headerWrapper}>
          <Image source={require('../assets/top.png')} style={styles.headerImage} resizeMode="cover" />
          <View style={styles.headerOverlay} pointerEvents="none">
            <View style={styles.headerText} />
            <Image source={require('../assets/app-icon.png')} style={styles.avatar} />
          </View>
        </View>

        {/* Analytic Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytic</Text>
          <View style={styles.rowWrap}>
            <View style={styles.bigCard}>
              <Text style={styles.bigTitle}>총 사용량</Text>
              <Text style={styles.bigValue}>16h 51m</Text>
            </View>
            <View style={styles.smallCol}>
              <View style={styles.smallCard}><Text style={styles.smallLabel}>가장 많이 사용한 앱</Text><Text style={styles.smallValue}>instagram</Text></View>
              <View style={styles.smallCard}><Text style={styles.smallLabel}>야외에서 보낸 시간</Text><Text style={styles.smallValue}>1h 51m</Text></View>
              <View style={styles.smallCard}><Text style={styles.smallLabel}>친구들과 함께한 시간</Text><Text style={styles.smallValue}>37m</Text></View>
            </View>
          </View>
        </View>

        {/* Recommended Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {[1,2,3].map((i) => (
              <View key={i} style={styles.recoCard}>
                <View style={styles.recoArt} />
                <Text style={styles.recoMeta}>playlist</Text>
                <Text style={styles.recoTitle} numberOfLines={2}>마음이 편한한 당신에게 추천하는 노래</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Weekly Goal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Goal</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalLeft}>
              <View style={styles.goalCircle}><Text style={styles.goalPercent}>87</Text></View>
              <Text style={styles.goalMeta}>전체 목표 달성도</Text>
            </View>
            <View style={styles.goalRight}>
              {['크로키 연습 10개 그리기','밀린 숙제 완료하기','할아버지랑 서울 여행가기','플래너 작성하기'].map((t,idx)=> (
                <Text key={t} style={[styles.goalItem, idx<3? styles.goalDone: null]}>▪ {t}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Tip bubble */}
        <View style={styles.tipBubble}>
          <Text style={styles.tipText}>야간 사용 패턴이 주중에 집중되어 있어요. 책이나 독서로 리프레시 해보세요.</Text>
        </View>
      </ScrollView>
      <BottomNav navigation={navigation} current="Home" />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 180;

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
  section: { paddingHorizontal: 16, paddingTop: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 10 },
  rowWrap: { flexDirection: 'row', gap: 12 },
  bigCard: { flex: 1, height: 140, borderRadius: 20, backgroundColor: '#2c2c2cff', padding: 16, justifyContent: 'space-between' },
  bigTitle: { color: '#f1f1f1', opacity: 0.6, fontWeight: '700' },
  bigValue: { color: '#f1f1f1', fontSize: 28, fontWeight: '900' },
  smallCol: { width: 170, gap: 8 },
  smallCard: { backgroundColor: '#111', borderRadius: 10, padding: 12 },
  smallLabel: { color: '#fff', opacity: 0.8, fontSize: 12 },
  smallValue: { color: '#fff', fontWeight: '800', marginTop: 4 },

  recoCard: { width: 150, marginHorizontal: 8 },
  recoArt: { width: '100%', height: 90, borderRadius: 16, backgroundColor: '#ddd' },
  recoMeta: { color: '#888', fontSize: 12, marginTop: 6 },
  recoTitle: { color: '#111', fontWeight: '700' },

  goalCard: { flexDirection: 'row', gap: 12, backgroundColor: '#0F0F10', borderRadius: 16, padding: 14 },
  goalLeft: { width: 80, alignItems: 'center' },
  goalCircle: { width: 60, height: 60, borderRadius: 30, borderWidth: 6, borderColor: '#2d2d2d', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  goalPercent: { color: '#EDEDED', fontWeight: '800' },
  goalMeta: { color: '#EDEDED', marginTop: 6, fontSize: 12 },
  goalRight: { flex: 1, justifyContent: 'center' },
  goalItem: { color: '#EDEDED', marginBottom: 6 },
  goalDone: { opacity: 0.7, textDecorationLine: 'line-through' },

  tipBubble: { marginTop: 14, marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 2 },
  tipText: { color: '#111' },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },

  // bottom nav removed (shared BottomNav used)
});
