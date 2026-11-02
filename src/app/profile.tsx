import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const BASE_BODY = require('../../assets/avatar/base.png');
const DEFAULT_BG = require('../../assets/avatar/fundo_flores.jpg');

// TODOS OS FUNDOS DA PASTA ASSETS/AVATAR
const bgOptions = [
  require('../../assets/avatar/fundo_flores.jpg'),
  require('../../assets/avatar/fundo_campo.jpg'),
  require('../../assets/avatar/fundo_castelo.jpg'),
  require('../../assets/avatar/fundo_trem.jpg'),
];

const hairOptions = [
  require('../../assets/avatar/cabelo_1.png'),
  require('../../assets/avatar/cabelo_2.png'),
  require('../../assets/avatar/cabelo_3.png'),
  require('../../assets/avatar/cabelo_4.png'),
  require('../../assets/avatar/cabelo_5.png'),
  require('../../assets/avatar/cabelo_6.png'),
];

const eyesOptions = [
  require('../../assets/avatar/olhos_1.png'),
  require('../../assets/avatar/olhos_2.png'),
    require('../../assets/avatar/olhos_3.png'),
];

const mouthOptions = [
  require('../../assets/avatar/boca_1.png'),
  require('../../assets/avatar/boca_2.png'),
    require('../../assets/avatar/boca_3.png'),
];

const clothesOptions = [
  require('../../assets/avatar/roupa_cardiga.png'),
  require('../../assets/avatar/roupa_gakuran.png'),
  require('../../assets/avatar/roupa_quimono.png'),
  require('../../assets/avatar/roupa_riscas.png'),
  require('../../assets/avatar/roupa_totoro.png'),
];

const availableBanners = [
  'https://i.pinimg.com/736x/df/6a/75/df6a75af59645c310f7d2fd1fd1d69cb.jpg',
  'https://i.pinimg.com/1200x/60/ef/a3/60efa3a9382bf3503f0d96fc6bdd1147.jpg',
  'https://i.pinimg.com/1200x/59/c0/78/59c078c61104a92cb49624504fed7217.jpg',
  'https://i.pinimg.com/736x/2f/9a/e2/2f9ae2d0c8245115343d3450fed703e2.jpg',
  'https://i.pinimg.com/1200x/ec/85/f3/ec85f3a040718dd253198c3ec0dcbcdf.jpg',
  'https://i.pinimg.com/1200x/b7/fb/72/b7fb720f91c938f62ff6e16590c0d9d5.jpg',
  'https://i.pinimg.com/1200x/6e/2c/9a/6e2c9a00b71116446b73e3b3015d8471.jpg',
];

export default function ProfileScreen() {
  const { favorites, myReviews, userProfile, updateUserProfile, deleteReview, toggleFavorite } =
    useFavorites();

  const [activeTab, setActiveTab] = useState<'liked' | 'reviews'>('liked');

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [selectedBanner, setSelectedBanner] = useState(userProfile.bannerUrl);

  const [selectedBg, setSelectedBg] = useState<any>(userProfile.avatarBg || DEFAULT_BG);
  const [selectedHair, setSelectedHair] = useState<any>(userProfile.avatarHair);
  const [selectedEyes, setSelectedEyes] = useState<any>(userProfile.avatarEyes);
  const [selectedMouth, setSelectedMouth] = useState<any>(userProfile.avatarMouth);
  const [selectedClothes, setSelectedClothes] = useState<any>(userProfile.avatarClothes);

  const handleOpenEditProfile = () => {
    setEditName(userProfile.name);
    setEditBio(userProfile.bio);
    setSelectedBanner(userProfile.bannerUrl);
    setProfileModalVisible(true);
  };

  const handleSaveProfile = () => {
    updateUserProfile({
      name: editName,
      bio: editBio,
      bannerUrl: selectedBanner,
    });
    setProfileModalVisible(false);
  };

  const handleOpenEditAvatar = () => {
    setSelectedBg(userProfile.avatarBg || DEFAULT_BG);
    setSelectedHair(userProfile.avatarHair);
    setSelectedEyes(userProfile.avatarEyes);
    setSelectedMouth(userProfile.avatarMouth);
    setSelectedClothes(userProfile.avatarClothes);
    setAvatarModalVisible(true);
  };

  const handleResetAvatar = () => {
    setSelectedBg(DEFAULT_BG);
    setSelectedHair(null);
    setSelectedEyes(null);
    setSelectedMouth(null);
    setSelectedClothes(null);
  };

  const handleSaveAvatar = () => {
    updateUserProfile({
      avatarBg: selectedBg,
      avatarHair: selectedHair,
      avatarEyes: selectedEyes,
      avatarMouth: selectedMouth,
      avatarClothes: selectedClothes,
    });
    setAvatarModalVisible(false);
  };

  const renderAvatar = (
    size = 90,
    bg = userProfile.avatarBg || DEFAULT_BG,
    hair = userProfile.avatarHair,
    eyes = userProfile.avatarEyes,
    mouth = userProfile.avatarMouth,
    clothes = userProfile.avatarClothes
  ) => (
    <ImageBackground
      source={bg}
      style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}
    >
      <View style={styles.layerFull}>
        <Image source={BASE_BODY} style={styles.layerFull} resizeMode="contain" />
        {eyes && <Image source={eyes} style={[styles.layerFull, { zIndex: 2 }]} resizeMode="contain" />}
        {mouth && <Image source={mouth} style={[styles.layerFull, { zIndex: 3 }]} resizeMode="contain" />}
        {clothes && <Image source={clothes} style={[styles.layerFull, { zIndex: 4 }]} resizeMode="contain" />}
        {hair && <Image source={hair} style={[styles.layerFull, { zIndex: 5 }]} resizeMode="contain" />}
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <ImageBackground source={{ uri: userProfile.bannerUrl }} style={styles.coverBanner}>
          <TouchableOpacity style={styles.editProfileBtn} onPress={handleOpenEditProfile}>
            <Ionicons name="pencil" size={18} color="#FFF" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.profileInfoCard}>
          <View style={styles.avatarContainer}>
            {renderAvatar(95)}
            <TouchableOpacity style={styles.avatarEditBadge} onPress={handleOpenEditAvatar} activeOpacity={0.8}>
              <Ionicons name="pencil" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userBio}>{userProfile.bio}</Text>

          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'liked' && styles.tabButtonActive]}
              onPress={() => setActiveTab('liked')}
            >
              <Ionicons
                name="heart"
                size={16}
                color={activeTab === 'liked' ? '#FFF' : '#286879'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tabText, activeTab === 'liked' && styles.tabTextActive]}>
                Curtidos ({favorites.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'reviews' && styles.tabButtonActive]}
              onPress={() => setActiveTab('reviews')}
            >
              <Ionicons
                name="star"
                size={16}
                color={activeTab === 'reviews' ? '#FFF' : '#286879'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tabText, activeTab === 'reviews' && styles.tabTextActive]}>
                Avaliações ({myReviews.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {activeTab === 'liked' ? (
        <FlatList
          key="liked-list"
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="heart-dislike-outline" size={50} color="#777" />
              <Text style={styles.emptyText}>Nenhum filme curtido ainda.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.likedPosterCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.likedPosterImage} />
              <TouchableOpacity
                style={styles.favIconOverlay}
                onPress={() => toggleFavorite(item)}
              >
                <Ionicons name="heart" size={20} color="#e74c3c" />
              </TouchableOpacity>
              <View style={styles.likedCardDetails}>
                <Text style={styles.likedMovieTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          key="reviews-list"
          data={myReviews}
          keyExtractor={(item) => item.movieId}
          numColumns={1}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="chatbubble-ellipses-outline" size={50} color="#777" />
              <Text style={styles.emptyText}>Nenhuma avaliação enviada ainda.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Image source={{ uri: item.movieImage }} style={styles.reviewPoster} />
              <View style={styles.reviewInfo}>
                <View style={styles.reviewHeaderRow}>
                  <Text style={styles.reviewTitle} numberOfLines={1}>
                    {item.movieTitle}
                  </Text>
                  <TouchableOpacity onPress={() => deleteReview(item.movieId)}>
                    <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.starsText}>{item.stars}</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* MODAL 1: EDITAR INFORMAÇÕES DO PERFIL */}
      <Modal animationType="slide" transparent={true} visible={profileModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setProfileModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>

              <Text style={styles.inputLabel}>Nome</Text>
              <TextInput
                style={styles.textInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Seu nome"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Biografia</Text>
              <TextInput
                style={[styles.textInput, { minHeight: 60 }]}
                value={editBio}
                onChangeText={setEditBio}
                multiline
                placeholder="Sua bio..."
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Fundo do Perfil</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
                {availableBanners.map((url, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedBanner(url)}
                    style={[styles.bannerOption, selectedBanner === url && styles.bannerOptionSelected]}
                  >
                    <Image source={{ uri: url }} style={styles.bannerThumb} />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.saveBtnText}>Salvar Perfil</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: EDITAR O AVATAR */}
      <Modal animationType="slide" transparent={true} visible={avatarModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setAvatarModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Personalizar Avatar</Text>

              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                {renderAvatar(105, selectedBg, selectedHair, selectedEyes, selectedMouth, selectedClothes)}

                <TouchableOpacity style={styles.resetAvatarBtn} onPress={handleResetAvatar}>
                  <Ionicons name="refresh-outline" size={14} color="#e74c3c" style={{ marginRight: 4 }} />
                  <Text style={styles.resetAvatarBtnText}>Resetar</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Fundo do Avatar</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
                {bgOptions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedBg(item)}
                    style={[styles.avatarOption, selectedBg === item && styles.avatarOptionSelected]}
                  >
                    <Image source={item} style={{ width: 45, height: 45, borderRadius: 22.5 }} resizeMode="cover" />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Cabelo</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
                {hairOptions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedHair(selectedHair === item ? null : item)}
                    style={[styles.avatarOption, selectedHair === item && styles.avatarOptionSelected]}
                  >
                    <Image source={item} style={{ width: 45, height: 45 }} resizeMode="contain" />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Olhos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
                {eyesOptions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedEyes(selectedEyes === item ? null : item)}
                    style={[styles.avatarOption, selectedEyes === item && styles.avatarOptionSelected]}
                  >
                    <Image source={item} style={{ width: 45, height: 45 }} resizeMode="contain" />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Boca</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
                {mouthOptions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedMouth(selectedMouth === item ? null : item)}
                    style={[styles.avatarOption, selectedMouth === item && styles.avatarOptionSelected]}
                  >
                    <Image source={item} style={{ width: 45, height: 45 }} resizeMode="contain" />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Roupa</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerRow}>
                {clothesOptions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedClothes(selectedClothes === item ? null : item)}
                    style={[styles.avatarOption, selectedClothes === item && styles.avatarOptionSelected]}
                  >
                    <Image source={item} style={{ width: 45, height: 45 }} resizeMode="contain" />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAvatar}>
                <Text style={styles.saveBtnText}>Salvar Avatar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const RALEWAY_FONT = Platform.OS === 'web' ? 'Raleway, sans-serif' : 'System';
const SPECIAL_TITLE_FONT = Platform.OS === 'web' ? 'LXGW WenKai Mono TC, monospace' : 'System';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8e8d7' },

  profileHeaderContainer: { backgroundColor: '#b9cbdfda', borderBottomWidth: 1, borderColor: '#d6d7be' },
  coverBanner: { width: '100%', height: 140, justifyContent: 'flex-start', alignItems: 'flex-end', padding: 12 },
  editProfileBtn: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },

  profileInfoCard: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16, marginTop: -45 },
  avatarContainer: { position: 'relative', width: 95, height: 95 },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#286879',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFF',
    elevation: 3,
  },

  userName: { fontFamily: SPECIAL_TITLE_FONT, fontSize: 26, color: '#30495A', marginTop: 8 },
  userBio: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#555', textAlign: 'center', marginTop: 4, lineHeight: 18 },

  tabsRow: { flexDirection: 'row', marginTop: 15, gap: 10 },
  tabButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#286879', backgroundColor: '#FFF' },
  tabButtonActive: { backgroundColor: '#286879' },
  tabText: { fontFamily: RALEWAY_FONT, fontSize: 13, fontWeight: 'bold', color: '#286879' },
  tabTextActive: { color: '#FFF' },

  likedPosterCard: { width: '48%', backgroundColor: '#83b6c477', borderRadius: 16, overflow: 'hidden', elevation: 3 },
  likedPosterImage: { width: '100%', height: 210, resizeMode: 'cover' },
  favIconOverlay: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', padding: 6, borderRadius: 14 },
  likedCardDetails: { padding: 10, alignItems: 'center' },
  likedMovieTitle: { fontFamily: RALEWAY_FONT, fontSize: 13, fontWeight: 'bold', color: '#0a101d', textAlign: 'center' },

  reviewCard: { flexDirection: 'row', backgroundColor: '#83b6c477', borderRadius: 16, padding: 12, marginBottom: 12, elevation: 2 },
  reviewPoster: { width: 65, height: 90, borderRadius: 10 },
  reviewInfo: { flex: 1, marginLeft: 12 },
  reviewHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewTitle: { fontFamily: RALEWAY_FONT, fontSize: 15, fontWeight: 'bold', color: '#0a101d', flex: 1 },
  starsText: { fontFamily: RALEWAY_FONT, fontSize: 12, color: '#F39C12', marginVertical: 2 },
  commentText: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#333', marginTop: 4, lineHeight: 18 },

  emptyBox: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontFamily: RALEWAY_FONT, fontSize: 14, color: '#666', marginTop: 8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { height: '80%', backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  closeBtn: { alignSelf: 'flex-end', padding: 5 },
  modalTitle: { fontFamily: SPECIAL_TITLE_FONT, fontSize: 24, color: '#30495A', marginBottom: 10, textAlign: 'center' },
  inputLabel: { fontFamily: RALEWAY_FONT, fontSize: 13, fontWeight: 'bold', color: '#555', marginTop: 12, marginBottom: 6 },
  textInput: { fontFamily: RALEWAY_FONT, backgroundColor: '#F0EEE1', borderRadius: 12, padding: 12, fontSize: 14, color: '#333' },

  resetAvatarBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, backgroundColor: '#FCEAE8' },
  resetAvatarBtnText: { fontFamily: RALEWAY_FONT, fontSize: 12, fontWeight: 'bold', color: '#e74c3c' },

  pickerRow: { flexDirection: 'row', marginBottom: 5 },
  avatarOption: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#F0EEE1', justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 2, borderColor: 'transparent' },
  avatarOptionSelected: { borderColor: '#286879', backgroundColor: '#E8F0EC' },

  bannerOption: { width: 90, height: 60, borderRadius: 10, overflow: 'hidden', marginRight: 10, borderWidth: 2, borderColor: 'transparent' },
  bannerOptionSelected: { borderColor: '#286879' },
  bannerThumb: { width: '100%', height: '100%', resizeMode: 'cover' },
  saveBtn: { backgroundColor: '#286879', paddingVertical: 12, borderRadius: 20, alignItems: 'center', marginTop: 20, marginBottom: 30 },
  saveBtnText: { fontFamily: RALEWAY_FONT, color: '#FFF', fontWeight: 'bold', fontSize: 15 },

  layerFull: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
});