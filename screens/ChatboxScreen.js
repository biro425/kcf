import React, { useEffect, useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
} from 'react-native'

const initialSuggestions = [
	'오늘 할 일 추천해줘',
	'간단한 일정 요약 만들어줘',
	'영어 이메일 문장 다듬어줘',
	'코드 리뷰 포인트 알려줘',
]

const ChatboxScreen = forwardRef(function ChatboxScreen({ hideFooter = false, bottomInset = 80 }, ref) {
	const palette = useMemo(() => ({
		bg: '#FFFFFF',
		text: '#111827',
		subText: '#6B7280',
		border: '#E5E7EB',
		divider: '#EEF2F7',
		chipBg: '#F3F4F6',
		assistantBg: '#FFFFFF',
		inputBg: '#FFFFFF',
		placeholder: '#9CA3AF',
		userBg: '#111111',
		accent: '#111111',
	}), [])
	const styles = useMemo(() => makeStyles(palette), [palette])

	const [messages, setMessages] = useState(() => [
		{ id: 'm1', role: 'assistant', text: '무엇을 도와드릴까요? 아이디어, 요약, 코드까지 무엇이든 물어보세요.', createdAt: Date.now() },
	])
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const listRef = useRef(null)
	const canSend = input.trim().length > 0 && !isTyping

	const onSelectSuggestion = (s) => setInput(s)
	const scrollToEnd = () => requestAnimationFrame(() => { if (listRef.current) listRef.current.scrollToEnd({ animated: true }) })
	useEffect(() => { scrollToEnd() }, [messages.length, isTyping])

	const handleSend = async () => {
		if (!canSend) return
		const text = input.trim()
		setInput('')
		setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text, createdAt: Date.now() }])
		setIsTyping(true)
		setTimeout(() => {
			const reply = generateFakeReply(text)
			setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply, createdAt: Date.now() }])
			setIsTyping(false)
		}, 700)
	}

	// Expose an imperative API to allow parent screens to send text and use ChatboxScreen's logic
	useImperativeHandle(ref, () => ({
		sendText: (text) => {
			const t = (text || '').trim()
			if (!t || isTyping) return
			setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: t, createdAt: Date.now() }])
			setIsTyping(true)
			setTimeout(() => {
				const reply = generateFakeReply(t)
				setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply, createdAt: Date.now() }])
				setIsTyping(false)
			}, 700)
		},
		isTyping,
	}))

	const renderItem = ({ item }) => {
		const isUser = item.role === 'user'
		return (
			<View style={[styles.row, isUser ? styles.rowRight : styles.rowLeft]}>
				{!isUser && (
					<View style={styles.avatar}><Text style={styles.avatarText}>G</Text></View>
				)}
				<View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
					<Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextAssistant]}>{item.text}</Text>
				</View>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.container}>
				{/* Chat list */}
				<FlatList
					ref={listRef}
					data={messages}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={[styles.listContent, { paddingBottom: bottomInset }]}
					onContentSizeChange={scrollToEnd}
				/>

				{isTyping && (
					<View style={[styles.row, styles.rowLeft, { paddingHorizontal: 16, paddingBottom: 8 }]}> 
						<View style={styles.avatarSmall}><Text style={styles.avatarSmallText}>G</Text></View>
						<View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
							<TypingDots styles={styles} />
						</View>
					</View>
				)}

				{/* Footer with suggestions above input (hidden if hideFooter is true) */}
				{!hideFooter && (
					<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
						<View style={styles.footer}>
							<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsBar}>
								{initialSuggestions.map((s) => (
									<TouchableOpacity key={s} style={styles.chipLarge} onPress={() => onSelectSuggestion(s)}>
										<Text style={styles.chipLargeText}>{s}</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
							<View style={styles.inputBar}>
								<TextInput
									style={styles.input}
									placeholder="채팅하기"
									placeholderTextColor={palette.placeholder}
									value={input}
									onChangeText={setInput}
									multiline
									maxLength={4000}
								/>
								<TouchableOpacity onPress={handleSend} disabled={!canSend} style={[styles.sendBtn, !canSend && { opacity: 0.5 }]}> 
									<Text style={styles.sendText}>✈</Text>
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAvoidingView>
				)}
			</View>
		</SafeAreaView>
	)
	})

function TypingDots({ styles }) {
	const [step, setStep] = useState(0)
	useEffect(() => { const t = setInterval(() => setStep((s) => (s + 1) % 3), 350); return () => clearInterval(t) }, [])
	return (
		<View style={styles.dotsRow}>
			{[0,1,2].map((i)=> <View key={i} style={[styles.dot, step >= i ? styles.dotOn : styles.dotOff]} />)}
		</View>
	)
}

export default ChatboxScreen

function generateFakeReply(prompt) {
	if (/일정|스케줄|schedule/i.test(prompt)) return '간단한 일정 초안을 만들었어요:\n- 09:00 팀 스탠드업\n- 11:00 설계 리뷰\n- 14:00 집중 업무\n- 17:30 운동'
	if (/코드|code|리뷰/i.test(prompt)) return '코드 리뷰 포인트:\n1) 이름을 더 구체적으로\n2) 사이드이펙트 줄이기\n3) 테스트 케이스 보강'
	if (/이메일|메일|email/i.test(prompt)) return 'Subject: Follow-up on our meeting\n\nHi team,\nThanks for the productive discussion...'
	return '요청을 이해했어요. 더 자세한 배경이나 원하는 출력 형태를 알려주시면 정확도가 올라가요.'
}

function makeStyles(palette) {
	const R = 16 // consistent radius
	return StyleSheet.create({
		safe: { flex: 1, backgroundColor: palette.bg },
		container: { flex: 1 },

		// suggestions
		suggestionsBar: { paddingHorizontal: 12, paddingVertical: 8 },
		chipLarge: { backgroundColor: palette.chipBg, paddingHorizontal: 14, paddingVertical: 10, borderRadius: R, marginHorizontal: 6, borderWidth: StyleSheet.hairlineWidth, borderColor: palette.border },
		chipLargeText: { color: '#374151', fontSize: 14, fontWeight: '600' },

		listContent: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 80 },
		row: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 6 },
		rowLeft: { justifyContent: 'flex-start' },
		rowRight: { justifyContent: 'flex-end' },
		avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
		avatarText: { color: 'white', fontWeight: '700', fontSize: 12 },
		avatarSmall: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
		avatarSmallText: { color: 'white', fontWeight: '700', fontSize: 10 },

		bubble: { maxWidth: '82%', paddingHorizontal: 12, paddingVertical: 10, borderRadius: R },
		bubbleAssistant: { backgroundColor: palette.assistantBg, borderWidth: StyleSheet.hairlineWidth, borderColor: palette.border },
		bubbleUser: { backgroundColor: palette.userBg },
		msgText: { fontSize: 15, lineHeight: 20 },
		msgTextAssistant: { color: palette.text },
		msgTextUser: { color: 'white' },

		typingBubble: { paddingVertical: 8, paddingHorizontal: 10 },
		dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
		dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
		dotOn: { backgroundColor: '#6B7280' },
		dotOff: { backgroundColor: '#E5E7EB' },

		footer: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: palette.divider, backgroundColor: palette.bg, paddingBottom: Platform.select({ ios: 6, android: 10 }) },
		inputBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8 },
		input: { flex: 1, minHeight: 42, maxHeight: 120, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 22, backgroundColor: palette.inputBg, color: palette.text, borderWidth: 1, borderColor: palette.border },
		sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: palette.accent, alignItems: 'center', justifyContent: 'center' },
		sendText: { color: 'white', fontWeight: '700', fontSize: 16, marginLeft: 2 },
	})
}

