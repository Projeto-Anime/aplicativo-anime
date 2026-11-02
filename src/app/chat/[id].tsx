import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const { id, name, avatar } = useLocalSearchParams<{ id: string; name?: string; avatar?: string }>();
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Viste o último filme do Studio Ghibli?', sender: 'other', time: '14:30' },
    { id: '2', text: 'Sim! Achei a animação incrível ✨', sender: 'me', time: '14:32' },
  ]);

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Função para enviar mensagem
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulação de resposta automática do outro usuário
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Que fixe! Vamos combinar de ver o próximo juntos! 🎬',
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO DO CHAT */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarLetter}>{(name || 'U')[0]}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{name || 'Usuário da Comunidade'}</Text>
            <Text style={styles.userStatus}>Online</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE MENSAGENS */}
      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.sender === 'me' ? styles.myBubble : styles.otherBubble,
              ]}
            >
              <Text style={item.sender === 'me' ? styles.myText : styles.otherText}>
                {item.text}
              </Text>
              <Text style={[styles.timeText, item.sender === 'me' ? styles.myTime : styles.otherTime]}>
                {item.time}
              </Text>
            </View>
          )}
        />

        {/* BARRA DE DIGITAÇÃO DE MENSAGEM */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Escreva uma mensagem..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.disabledSendBtn]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  backBtn: { padding: 5, marginRight: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarLetter: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  userStatus: { fontSize: 12, color: '#2ecc71' },
  headerAction: { padding: 5 },

  chatArea: { flex: 1 },
  messageList: { padding: 15, paddingBottom: 20 },
  
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0095f6',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  myText: { color: '#fff', fontSize: 15 },
  otherText: { color: '#222', fontSize: 15 },
  timeText: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myTime: { color: 'rgba(255,255,255,0.7)' },
  otherTime: { color: '#aaa' },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    color: '#222',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  disabledSendBtn: { backgroundColor: '#b0d9f8' },
});