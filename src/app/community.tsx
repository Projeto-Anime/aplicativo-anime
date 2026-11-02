import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANNER_TOP = require('../../assets/ponyo.png');

// AVATAR BASE
const BASE_BODY = require('../../assets/avatar/base.png');
const DEFAULT_BG = require('../../assets/avatar/fundo_campo.jpg');
const DEFAULT_HAIR = require('../../assets/avatar/cabelo_1.png');
const DEFAULT_EYES = require('../../assets/avatar/olhos_1.png');
const DEFAULT_MOUTH = require('../../assets/avatar/boca_1.png');
const DEFAULT_CLOTHES = require('../../assets/avatar/roupa_cardiga.png');

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

interface Review {
  movieTitle: string;
  stars: string;
  comment: string;
}

interface UserChat {
  id: string;
  name: string;
  bio: string;
  avatarBg: any;
  avatarHair: any;
  avatarEyes: any;
  avatarMouth: any;
  avatarClothes: any;
  lastMessage: string;
  time: string;
  history: Message[];
  reviews: Review[];
}

export default function CommunityScreen() {
  const [chats, setChats] = useState<UserChat[]>([
    {
      id: '1',
      name: 'Ana Clara',
      bio: 'Apaixonada por animações do Studio Ghibli e arte digital ✨',
      avatarBg: require('../../assets/avatar/fundo_flores.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_2.png'),
      avatarEyes: require('../../assets/avatar/olhos_1.png'),
      avatarMouth: require('../../assets/avatar/boca_1.png'),
      avatarClothes: require('../../assets/avatar/roupa_quimono.png'),
      lastMessage: 'Já assistiu O Castelo Animado?',
      time: '14:20',
      history: [
        { id: 'm1', text: 'Oi! Tudo bem?', sender: 'other', time: '14:15' },
        { id: 'm2', text: 'Tudo ótimo por aqui! E você?', sender: 'me', time: '14:16' },
        { id: 'm3', text: 'Estava revendo alguns clássicos hoje.', sender: 'other', time: '14:18' },
        { id: 'm4', text: 'Já assistiu O Castelo Animado?', sender: 'other', time: '14:20' },
      ],
      reviews: [
        { movieTitle: 'O Castelo Animado', stars: '★★★★★', comment: 'A trilha sonora do Joe Hisaishi nessa animação é inesquecível!' },
        { movieTitle: 'A Viagem de Chihiro', stars: '★★★★★', comment: 'Cada detalhe do mundo dos espíritos é perfeito.' },
      ],
    },
    {
      id: '2',
      name: 'Lucas',
      bio: 'Maratonando todos os filmes no final de semana 🍿',
      avatarBg: require('../../assets/avatar/fundo_campo.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_5.png'),
      avatarEyes: require('../../assets/avatar/olhos_2.png'),
      avatarMouth: require('../../assets/avatar/boca_2.png'),
      avatarClothes: require('../../assets/avatar/roupa_totoro.png'),
      lastMessage: 'Recomendo Túmulo dos Vagalumes.',
      time: '12:15',
      history: [
        { id: 'm1', text: 'Fala cara, me indica um filme emocionante?', sender: 'me', time: '12:10' },
        { id: 'm2', text: 'Prepara o lenço então hahaha.', sender: 'other', time: '12:12' },
        { id: 'm3', text: 'Recomendo Túmulo dos Vagalumes.', sender: 'other', time: '12:15' },
      ],
      reviews: [
        { movieTitle: 'Túmulo dos Vagalumes', stars: '★★★★★', comment: 'Um filme forte, poético e extremamente marcante.' },
      ],
    },
    {
      id: '3',
      name: 'Sofia',
      bio: 'Fã incondicional do Hayao Miyazaki 🍃',
      avatarBg: require('../../assets/avatar/fundo_castelo.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_3.png'),
      avatarEyes: require('../../assets/avatar/olhos_1.png'),
      avatarMouth: require('../../assets/avatar/boca_1.png'),
      avatarClothes: require('../../assets/avatar/roupa_cardiga.png'),
      lastMessage: 'Totoro é disparado meu favorito!',
      time: 'Ontem',
      history: [
        { id: 'm1', text: 'Qual seu filme conforto favorito?', sender: 'me', time: '18:00' },
        { id: 'm2', text: 'Com certeza Meu Amigo Totoro!', sender: 'other', time: '18:05' },
        { id: 'm3', text: 'Totoro é disparado meu favorito!', sender: 'other', time: '18:06' },
      ],
      reviews: [
        { movieTitle: 'Meu Amigo Totoro', stars: '★★★★★', comment: 'Conforto em forma de filme. Assisto sempre que preciso relaxar.' },
      ],
    },
    {
      id: '4',
      name: 'Mateus',
      bio: 'Colecionador de mangás e posters do Ghibli 🎨',
      avatarBg: require('../../assets/avatar/fundo_trem.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_1.png'),
      avatarEyes: require('../../assets/avatar/olhos_2.png'),
      avatarMouth: require('../../assets/avatar/boca_2.png'),
      avatarClothes: require('../../assets/avatar/roupa_cardiga.png'),
      lastMessage: 'Conseguiu o poster de Princesa Mononoke?',
      time: 'Ontem',
      history: [
        { id: 'm1', text: 'Conseguiu o poster de Princesa Mononoke?', sender: 'other', time: '16:30' },
      ],
      reviews: [
        { movieTitle: 'Princesa Mononoke', stars: '★★★★★', comment: 'Arte impecável e temática ambiental forte.' },
      ],
    },
    {
      id: '5',
      name: 'Beatriz',
      bio: 'Estudante de animação 2D e artes visuais 🖌️',
      avatarBg: require('../../assets/avatar/fundo_flores.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_2.png'),
      avatarEyes: require('../../assets/avatar/olhos_1.png'),
      avatarMouth: require('../../assets/avatar/boca_1.png'),
      avatarClothes: require('../../assets/avatar/roupa_quimono.png'),
      lastMessage: 'A animação das águas em Ponyo é surreal!',
      time: 'Segunda',
      history: [
        { id: 'm1', text: 'Já reparou nos quadros desenhados à mão?', sender: 'other', time: '10:00' },
        { id: 'm2', text: 'A animação das águas em Ponyo é surreal!', sender: 'other', time: '10:02' },
      ],
      reviews: [
        { movieTitle: 'Ponyo', stars: '★★★★★', comment: 'Fluidez de animação aquática mais bonita do cinema.' },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<UserChat | null>(null);
  const [inputText, setInputText] = useState('');
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...selectedChat.history, newMsg];

    setSelectedChat({
      ...selectedChat,
      history: updatedHistory,
      lastMessage: newMsg.text,
      time: newMsg.time,
    });

    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === selectedChat.id
          ? { ...c, history: updatedHistory, lastMessage: newMsg.text, time: newMsg.time }
          : c
      )
    );

    setInputText('');

    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Que massa! Concordo plenamente com você!',
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSelectedChat((prev) => (prev ? { ...prev, history: [...prev.history, replyMsg] } : null));
      setChats((prevChats) =>
        prevChats.map((c) =>
          c.id === selectedChat.id ? { ...c, history: [...c.history, replyMsg] } : c
        )
      );
    }, 1200);
  };

  const renderAvatar = (user: UserChat, size = 50) => (
    <ImageBackground
      source={user.avatarBg || DEFAULT_BG}
      style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}
    >
      <View style={styles.layerFull}>
        <Image source={BASE_BODY} style={styles.layerFull} resizeMode="contain" />
        <Image source={user.avatarEyes || DEFAULT_EYES} style={[styles.layerFull, { zIndex: 2 }]} resizeMode="contain" />
        <Image source={user.avatarMouth || DEFAULT_MOUTH} style={[styles.layerFull, { zIndex: 3 }]} resizeMode="contain" />
        <Image source={user.avatarClothes || DEFAULT_CLOTHES} style={[styles.layerFull, { zIndex: 4 }]} resizeMode="contain" />
        <Image source={user.avatarHair || DEFAULT_HAIR} style={[styles.layerFull, { zIndex: 5 }]} resizeMode="contain" />
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!selectedChat ? (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={BANNER_TOP}
            style={styles.headerBackground}
            imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 10 }}
          >
            <View style={styles.headerOverlay}>
              <Text style={styles.headerTitle}>Comunidade</Text>

              <View style={styles.searchBar}>
                <Ionicons name="search" size={18} color="#777" style={{ marginRight: 6 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Pesquisar usuário..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={18} color="#777" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>

          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatRow}
                onPress={() => setSelectedChat(item)}
                activeOpacity={0.7}
              >
                {renderAvatar(item, 60)}
                <View style={styles.chatInfo}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatMessage} numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                </View>
                <Text style={styles.chatTime}>{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.userHeaderClickable}
              onPress={() => setProfileModalVisible(true)}
              activeOpacity={0.8}
            >
              {renderAvatar(selectedChat, 42)}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.chatHeaderName}>{selectedChat.name}</Text>
                <Text style={styles.chatHeaderSubtitle}>Toque para ver o perfil</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={selectedChat.history}
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

          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setProfileModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {selectedChat && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.avatarLargeContainer}>
                  {renderAvatar(selectedChat, 110)}
                </View>
                <Text style={styles.profileModalName}>{selectedChat.name}</Text>
                <Text style={styles.profileModalBio}>{selectedChat.bio}</Text>

                <View style={styles.divider} />

                <Text style={styles.reviewsHeaderTitle}>Resenhas de Filmes</Text>
                {selectedChat.reviews && selectedChat.reviews.length > 0 ? (
                  selectedChat.reviews.map((rev, idx) => (
                    <View key={idx} style={styles.userReviewCard}>
                      <View style={styles.userReviewHeader}>
                        <Text style={styles.userReviewMovie}>{rev.movieTitle}</Text>
                        <Text style={styles.userReviewStars}>{rev.stars}</Text>
                      </View>
                      <Text style={styles.userReviewComment}>{rev.comment}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyReviewsText}>Este usuário ainda não publicou nenhuma resenha.</Text>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const RALEWAY_FONT = Platform.OS === 'web' ? '"Raleway", sans-serif' : 'System';
const SPECIAL_TITLE_FONT = Platform.OS === 'web' ? '"LXGW WenKai Mono TC", monospace' : 'System';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8e8d7' },

  headerBackground: { width: '100%', height: 210, overflow: 'hidden' },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: SPECIAL_TITLE_FONT,
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    maxWidth: '50%',
    width: '100%',
  },
  searchInput: { flex: 1, fontFamily: RALEWAY_FONT, fontSize: 13, color: '#333' },

  listContainer: { paddingBottom: 20, paddingHorizontal: 10, paddingTop: 10 },
  chatRow: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f5f5ea',
    borderRadius: 18,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
  },
  chatInfo: { flex: 1, marginLeft: 16 },
  chatName: { fontFamily: RALEWAY_FONT, fontSize: 17, fontWeight: 'bold', color: '#0a101d' },
  chatMessage: { fontFamily: RALEWAY_FONT, fontSize: 14, color: '#555', marginTop: 4 },
  chatTime: { fontFamily: RALEWAY_FONT, fontSize: 12, color: '#777', alignSelf: 'flex-start' },

  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  backBtn: { padding: 5, marginRight: 10 },
  userHeaderClickable: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  chatHeaderName: { fontFamily: RALEWAY_FONT, fontSize: 17, fontWeight: 'bold', color: '#222' },
  chatHeaderSubtitle: { fontFamily: RALEWAY_FONT, fontSize: 12, color: '#286879' },

  messageList: { padding: 16, paddingBottom: 20 },
  bubble: { maxWidth: '78%', padding: 12, borderRadius: 18, marginBottom: 10 },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#286879', borderBottomRightRadius: 4 },
  otherBubble: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  myText: { fontFamily: RALEWAY_FONT, color: '#fff', fontSize: 15 },
  otherText: { fontFamily: RALEWAY_FONT, color: '#222', fontSize: 15 },
  timeText: { fontFamily: RALEWAY_FONT, fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myTime: { color: 'rgba(255,255,255,0.7)' },
  otherTime: { color: '#999' },

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
    fontFamily: RALEWAY_FONT,
    backgroundColor: '#F0EEE1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#222',
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#286879',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    elevation: 5,
  },
  closeModalBtn: { alignSelf: 'flex-end', padding: 5 },
  avatarLargeContainer: { width: 110, height: 110, borderRadius: 55, overflow: 'hidden', marginBottom: 12 },
  profileModalName: { fontFamily: RALEWAY_FONT, fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  profileModalBio: { fontFamily: RALEWAY_FONT, fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20 },

  divider: { height: 1, backgroundColor: '#eee', width: '100%', marginVertical: 15 },

  reviewsHeaderTitle: { fontFamily: RALEWAY_FONT, fontSize: 16, fontWeight: 'bold', color: '#30495A', alignSelf: 'flex-start', marginBottom: 10 },
  userReviewCard: {
    width: '100%',
    backgroundColor: '#F9F8F3',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },
  userReviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userReviewMovie: { fontFamily: RALEWAY_FONT, fontSize: 14, fontWeight: 'bold', color: '#222' },
  userReviewStars: { fontFamily: RALEWAY_FONT, fontSize: 12, color: '#F39C12' },
  userReviewComment: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#555', marginTop: 4, lineHeight: 18 },
  emptyReviewsText: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#999', fontStyle: 'italic', marginTop: 5 },

  layerFull: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
});