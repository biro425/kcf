import React, { useRef, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import BottomNav from '../components/BottomNav'
import ChatboxScreen from './ChatboxScreen'

export default function ChatScreen({ navigation }) {
  const chatRef = useRef(null)
  const [input, setInput] = useState('')

  const palette = {
    text: '#111827',
    border: '#E5E7EB',
    divider: '#EEF2F7',
    placeholder: '#9CA3AF',
    accent: '#111111',
    bg: '#FFFFFF',
  }

  const canSend = input.trim().length > 0
  const onSend = () => {
    const t = input.trim()
    if (!t) return
    setInput('')
    chatRef.current?.sendText?.(t)
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>SERENE / CHAT</Text>
        <View style={{ flex: 1 }}>
          <ChatboxScreen ref={chatRef} hideFooter bottomInset={160} />
        </View>
        <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
          <View style={[styles.footer, { backgroundColor: palette.bg, borderTopColor: palette.divider }]}>
            <View style={[styles.inputBar]}> 
              <TextInput
                style={[styles.input, { color: palette.text, borderColor: palette.border, backgroundColor: '#fff' }]}
                placeholder="채팅하기"
                placeholderTextColor={palette.placeholder}
                value={input}
                onChangeText={setInput}
                multiline
                maxLength={4000}
              />
              <TouchableOpacity onPress={onSend} disabled={!canSend} style={[styles.sendBtn, { backgroundColor: palette.accent }, !canSend && { opacity: 0.5 }]}>
                <Text style={styles.sendText}>✈</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <BottomNav navigation={navigation} current="Chat" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 6, fontWeight: '800', fontSize: 14, color: '#6B7280' },
  footer: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: Platform.select({ ios: 6, android: 10 }), marginBottom: 76 },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8 },
  input: { flex: 1, minHeight: 42, maxHeight: 120, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 22, borderWidth: 1 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: 'white', fontWeight: '700', fontSize: 16, marginLeft: 2 },
})
