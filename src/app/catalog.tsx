import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  SafeAreaView,
  Modal,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites, Movie } from '../context/FavoritesContext';

const BANNER_TOP = require('../../assets/ponyo.png');

const BASE_BODY = require('../../assets/avatar/base.png');
const DEFAULT_BG = require('../../assets/avatar/fundo_campo.jpg');
const DEFAULT_HAIR = require('../../assets/avatar/cabelo_1.png');
const DEFAULT_EYES = require('../../assets/avatar/olhos_1.png');
const DEFAULT_MOUTH = require('../../assets/avatar/boca_1.png');
const DEFAULT_CLOTHES = require('../../assets/avatar/roupa_cardiga.png');

const sampleReviews = [
  {
    id: 'r1',
    user: {
      id: '1',
      name: 'Ana Clara',
      bio: 'Apaixonada por animações do Studio Ghibli ✨',
      avatarBg: require('../../assets/avatar/fundo_flores.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_2.png'),
      avatarEyes: require('../../assets/avatar/olhos_1.png'),
      avatarMouth: require('../../assets/avatar/boca_1.png'),
      avatarClothes: require('../../assets/avatar/roupa_quimono.png'),
    },
    stars: '★★★★★',
    comment: 'Uma verdadeira obra-prima! A animação e a trilha sonora são espetaculares.',
  },
  {
    id: 'r2',
    user: {
      id: '2',
      name: 'Lucas',
      bio: 'Maratonando todos os filmes 🍿',
      avatarBg: require('../../assets/avatar/fundo_campo.jpg'),
      avatarHair: require('../../assets/avatar/cabelo_5.png'),
      avatarEyes: require('../../assets/avatar/olhos_2.png'),
      avatarMouth: require('../../assets/avatar/boca_2.png'),
      avatarClothes: require('../../assets/avatar/roupa_totoro.png'),
    },
    stars: '★★★★★',
    comment: 'Assisto sempre que preciso de aconchego.',
  },
];

const ghibliMovies: (Movie & { reviews: any[] })[] = [
  { id: '1', title: 'Nausicaä do Vale do Vento', year: '1984', genre: 'Aventura', rating: 5, stars: '★★★★★', duration: '1h 57m', imageUrl: 'https://i.pinimg.com/1200x/10/c8/0c/10c80c3c45d8149d9e8c28d11e74f8a7.jpg', synopsis: 'Princesa Nausicaä tenta entender e proteger a selva tóxica.', reviews: sampleReviews },
  { id: '2', title: 'O Castelo no Céu', year: '1986', genre: 'Aventura', rating: 5, stars: '★★★★★', duration: '2h 04m', imageUrl: 'https://i.pinimg.com/1200x/c9/82/78/c98278612ff731edec4bd1f3cd050280.jpg', synopsis: 'Um jovem garoto e uma garota procuram Laputa, uma lendária cidade flutuante no céu.', reviews: sampleReviews },
  { id: '3', title: 'Meu Amigo Totoro', year: '1988', genre: 'Infantil', rating: 5, stars: '★★★★★', duration: '1h 26m', imageUrl: 'https://i.pinimg.com/736x/5a/d6/ae/5ad6aed32dcc8e28f5af1b19cf85767b.jpg', synopsis: 'Duas meninas se mudam para o campo e fazem amizade com espíritos da floresta.', reviews: sampleReviews },
  { id: '4', title: 'Túmulo dos Vagalumes', year: '1988', genre: 'Drama', rating: 5, stars: '★★★★★', duration: '1h 29m', imageUrl: 'https://i.pinimg.com/736x/c7/41/cf/c741cff8a8e70cb9374b22e47c420ce6.jpg', synopsis: 'Dois irmãos lutam desesperadamente para sobreviver durante a Segunda Guerra Mundial.', reviews: sampleReviews },
  { id: '5', title: 'O Serviço de Entregas da Kiki', year: '1989', genre: 'Aventura', rating: 5, stars: '★★★★★', duration: '1h 43m', imageUrl: 'https://i.pinimg.com/1200x/f9/f2/54/f9f25406a3077941ef08c0be67444fc2.jpg', synopsis: 'Uma jovem bruxa se muda para uma nova cidade e inicia seu próprio negócio de entregas.', reviews: sampleReviews },
  { id: '6', title: 'Memórias de Ontem', year: '1991', genre: 'Drama', rating: 4, stars: '★★★★☆', duration: '1h 58m', imageUrl: 'https://i.pinimg.com/1200x/ed/7c/1a/ed7c1a362213576aace6dd5169c53c96.jpg', synopsis: 'Uma mulher viaja para o campo e relembra sua infância enquanto reflete sobre seu futuro.', reviews: sampleReviews },
  { id: '7', title: 'Porco Rosso: O Último Herói Romântico', year: '1992', genre: 'Ação', rating: 4, stars: '★★★★☆', duration: '1h 34m', imageUrl: 'https://i.pinimg.com/1200x/db/27/70/db2770a02602195f804397a08a9c5217.jpg', synopsis: 'Um piloto de caça amaldiçoado é transformado em um porco humanoide no Mar Adriático.', reviews: sampleReviews },
  { id: '8', title: 'Eu Posso Ouvir o Oceano', year: '1993', genre: 'Romance', rating: 4, stars: '★★★★☆', duration: '1h 12m', imageUrl: 'https://i.pinimg.com/1200x/0c/42/c0/0c42c0056544f0137388a05cee616f53.jpg', synopsis: 'Um triângulo amoroso se desenvolve entre dois melhores amigos e uma estudante transferida.', reviews: sampleReviews },
  { id: '9', title: 'PomPoko: A Grande Batalha dos Guaxinins', year: '1994', genre: 'Fantasia', rating: 4, stars: '★★★★☆', duration: '1h 59m', imageUrl: 'https://i.pinimg.com/1200x/b9/9d/54/b99d547f4fac9806c3d46488d8bcd047.jpg', synopsis: 'Uma comunidade de guaxinins metamorfos luta contra a destruição do seu habitat.', reviews: sampleReviews },
  { id: '10', title: 'Sussurros do Coração', year: '1995', genre: 'Romance', rating: 5, stars: '★★★★★', duration: '1h 51m', imageUrl: 'https://i.pinimg.com/1200x/3d/ce/de/3dcedea4a6ff4b723eff01ea4e35208c.jpg', synopsis: 'Uma jovem descobre que todos os seus livros foram emprestados pela mesma pessoa.', reviews: sampleReviews },
  { id: '11', title: 'Princesa Mononoke', year: '1997', genre: 'Ação', rating: 5, stars: '★★★★★', duration: '2h 14m', imageUrl: 'https://i.pinimg.com/1200x/78/af/a6/78afa64dd4522454b42eab443350dffa.jpg', synopsis: 'Um príncipe se vê no meio de uma guerra sangrenta entre humanos e deuses da floresta.', reviews: sampleReviews },
  { id: '12', title: 'Meus Vizinhos os Yamadas', year: '1999', genre: 'Comédia', rating: 4, stars: '★★★★☆', duration: '1h 41m', imageUrl: 'https://i.pinimg.com/1200x/ce/f8/64/cef8644301ddc9b6626b0f98d2a9fc37.jpg', synopsis: 'Episódios bem-humorados que retratam o cotidiano de uma família japonesa.', reviews: sampleReviews },
  { id: '13', title: 'A Viagem de Chihiro', year: '2001', genre: 'Fantasia', rating: 5, stars: '★★★★★', duration: '2h 05m', imageUrl: 'https://i.pinimg.com/1200x/f4/11/f8/f411f81d47185322cd4ae4e7ff451c3e.jpg', synopsis: 'Chihiro entra em um mundo secreto de espíritos e precisa salvar seus pais.', reviews: sampleReviews },
  { id: '14', title: 'O Reino dos Gatos', year: '2002', genre: 'Fantasia', rating: 4, stars: '★★★★☆', duration: '1h 15m', imageUrl: 'https://i.pinimg.com/1200x/67/e7/86/67e786fabbf2469ca821aa7b3f58ab24.jpg', synopsis: 'Haru salva um gato misterioso e é levada para o místico Reino dos Gatos.', reviews: sampleReviews },
  { id: '15', title: 'O Castelo Animado', year: '2004', genre: 'Fantasia', rating: 5, stars: '★★★★★', duration: '1h 59m', imageUrl: 'https://i.pinimg.com/736x/25/97/1d/25971d2b92e53aa2091016ad2066ac50.jpg', synopsis: 'Sophie busca a ajuda do Mago Howl em seu castelo ambulante para quebrar uma maldição.', reviews: sampleReviews },
  { id: '16', title: 'Contos de Terramar', year: '2006', genre: 'Fantasia', rating: 4, stars: '★★★★☆', duration: '1h 55m', imageUrl: 'https://i.pinimg.com/1200x/ca/d5/44/cad5440e9f5c1b995ab28470ce758f79.jpg', synopsis: 'Um arquimago e um príncipe investigam os males misteriosos que ameaçam a terra.', reviews: sampleReviews },
  { id: '17', title: 'Ponyo: Uma Amizade Que Veio do Mar', year: '2008', genre: 'Aventura', rating: 5, stars: '★★★★★', duration: '1h 43m', imageUrl: 'https://i.pinimg.com/1200x/ba/8d/aa/ba8daafcc0c820465f17094a6bae0f54.jpg', synopsis: 'Ponyo deseja se transformar em humana após criar laços com um garotinho.', reviews: sampleReviews },
  { id: '18', title: 'O Mundo dos Pequeninos', year: '2010', genre: 'Fantasia', rating: 5, stars: '★★★★★', duration: '1h 34m', imageUrl: 'https://i.pinimg.com/1200x/99/77/8e/99778e9ff46856e85d3917e296f5a9e1.jpg', synopsis: 'Arrietty e sua família são pequeninos que vivem escondidos sob o assoalho de uma casa.', reviews: sampleReviews },
  { id: '19', title: 'Da Colina Kokuriko', year: '2011', genre: 'Romance', rating: 4, stars: '★★★★☆', duration: '1h 31m', imageUrl: 'https://i.pinimg.com/1200x/03/3a/cb/033acb1275e7dff2992f56645dda05bb.jpg', synopsis: 'Dois estudantes do ensino médio se unem para evitar a demolição do clube escolar.', reviews: sampleReviews },
  { id: '20', title: 'Vidas ao Vento', year: '2013', genre: 'Drama', rating: 5, stars: '★★★★★', duration: '2h 06m', imageUrl: 'https://i.pinimg.com/1200x/2f/cc/9b/2fcc9bffad96e6945330551cae93191c.jpg', synopsis: 'Um olhar poético sobre a vida do engenheiro aeronáutico Jiro Horikoshi.', reviews: sampleReviews },
  { id: '21', title: 'O Conto da Princesa Kaguya', year: '2013', genre: 'Drama', rating: 5, stars: '★★★★★', duration: '2h 17m', imageUrl: 'https://i.pinimg.com/1200x/25/ef/ae/25efae86fe8e479d4cd06576408d120a.jpg', synopsis: 'Uma menina encontrada dentro de um broto de bambu cresce rapidamente rumo a um destino nobre.', reviews: sampleReviews },
  { id: '22', title: 'As Memórias de Marnie', year: '2014', genre: 'Drama', rating: 5, stars: '★★★★★', duration: '1h 43m', imageUrl: 'https://i.pinimg.com/1200x/6d/a0/d7/6da0d74913a029adaee90651f44148bd.jpg', synopsis: 'Anna desenvolve uma amizade misteriosa com Marnie em um casarão abandonado.', reviews: sampleReviews },
  { id: '23', title: 'Aya e a Bruxa', year: '2020', genre: 'Fantasia', rating: 3, stars: '★★★☆☆', duration: '1h 22m', imageUrl: 'https://i.pinimg.com/1200x/4d/36/49/4d36490b96a76b44dd4cc51ce57a0d1c.jpg', synopsis: 'Uma garota adotada por uma bruxa aprende truques para se impor na nova casa.', reviews: sampleReviews },
  { id: '24', title: 'O Menino e a Garça', year: '2023', genre: 'Fantasia', rating: 5, stars: '★★★★★', duration: '2h 04m', imageUrl: 'https://i.pinimg.com/1200x/de/68/ec/de68eca55ecf7775bbc3f6d815f4f7d9.jpg', synopsis: 'Mahito é guiado por uma garça cinzenta a uma torre misteriosa conectando vivos e mortos.', reviews: sampleReviews },
];

const genreList = ['Todos', 'Fantasia', 'Aventura', 'Drama', 'Ação', 'Romance', 'Infantil', 'Comédia'];
const ratingList = [
  { label: 'Todas as Classificações', value: 0 },
  { label: '5 Estrelas', value: 5 },
  { label: '4 Estrelas', value: 4 },
];

export default function CatalogScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { toggleFavorite, isFavorite, myReviews, addOrEditReview, deleteReview } = useFavorites();

  const isWeb = width >= 768;
  const numColumns = isWeb ? 4 : 2;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedRating, setSelectedRating] = useState(0);

  const [genreModalVisible, setGenreModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const fontId = 'custom-anime-font';
      if (!document.getElementById(fontId)) {
        const style = document.createElement('style');
        style.id = fontId;
        style.type = 'text/css';
        style.appendChild(
          document.createTextNode(`
            @import url('https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
          `)
        );
        document.head.appendChild(style);
      }
    }
  }, []);

  const filteredMovies = ghibliMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Todos' || movie.genre === selectedGenre;
    const matchesRating = selectedRating === 0 || movie.rating === selectedRating;
    return matchesSearch && matchesGenre && matchesRating;
  });

  const handleOpenMovie = (movie: any) => {
    setSelectedMovie(movie);
    const existing = myReviews.find((r) => r.movieId === movie.id);
    if (existing) {
      setUserRating(existing.ratingNum);
      setUserComment(existing.comment);
      setIsEditing(false);
    } else {
      setUserRating(5);
      setUserComment('');
      setIsEditing(true);
    }
  };

  const handleSaveReview = () => {
    if (!userComment.trim() || !selectedMovie) return;
    const starsStr = '★'.repeat(userRating) + '☆'.repeat(5 - userRating);

    addOrEditReview({
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      movieImage: selectedMovie.imageUrl,
      stars: starsStr,
      ratingNum: userRating,
      comment: userComment.trim(),
    });

    setIsEditing(false);
  };

  const myCurrentReview = selectedMovie ? myReviews.find((r) => r.movieId === selectedMovie.id) : null;

  const renderAvatar = (user: any, size = 42) => (
    <ImageBackground
      source={user?.avatarBg || DEFAULT_BG}
      style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}
    >
      <View style={styles.layerFull}>
        <Image source={BASE_BODY} style={styles.layerFull} resizeMode="contain" />
        <Image source={user?.avatarEyes || DEFAULT_EYES} style={[styles.layerFull, { zIndex: 2 }]} resizeMode="contain" />
        <Image source={user?.avatarMouth || DEFAULT_MOUTH} style={[styles.layerFull, { zIndex: 3 }]} resizeMode="contain" />
        <Image source={user?.avatarClothes || DEFAULT_CLOTHES} style={[styles.layerFull, { zIndex: 4 }]} resizeMode="contain" />
        <Image source={user?.avatarHair || DEFAULT_HAIR} style={[styles.layerFull, { zIndex: 5 }]} resizeMode="contain" />
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>

        {/* CABEÇALHO */}
        <ImageBackground
          source={BANNER_TOP}
          style={styles.headerBackground}
          imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 10 }}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.headerMainTitle}>Catálogo</Text>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#777" style={{ marginRight: 6 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nome..."
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

            <View style={styles.compactButtonsRow}>
              <TouchableOpacity
                style={[styles.compactFilterBtn, selectedGenre !== 'Todos' && styles.compactFilterActive]}
                onPress={() => setGenreModalVisible(true)}
              >
                <Text style={styles.compactFilterText}>
                  {selectedGenre === 'Todos' ? 'Gêneros' : `Gênero: ${selectedGenre}`}
                </Text>
                <Ionicons name="chevron-down" size={14} color="#FFF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.compactFilterBtn, selectedRating !== 0 && styles.compactFilterActive]}
                onPress={() => setRatingModalVisible(true)}
              >
                <Text style={styles.compactFilterText}>
                  {selectedRating === 0 ? 'Classificação' : `Classificação: ${selectedRating} ★`}
                </Text>
                <Ionicons name="chevron-down" size={14} color="#FFF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>

        {/* GRELHA DOS FILMES */}
        <FlatList
          key={numColumns}
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={isWeb ? styles.columnWrapperWeb : styles.columnWrapperMobile}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="film-outline" size={50} color="#aaa" />
              <Text style={styles.emptyText}>Nenhum filme encontrado com estes filtros.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.movieCard, { width: isWeb ? '23.5%' : '48%' }]}
              activeOpacity={0.8}
              onPress={() => handleOpenMovie(item)}
            >
              <View style={styles.posterContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.posterImage} />
                <TouchableOpacity
                  style={styles.smallFavoriteButton}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons
                    name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                    size={20}
                    color={isFavorite(item.id) ? '#e74c3c' : '#ffffff'}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.movieGenre}>{item.genre} • {item.year}</Text>
                <Text style={styles.starsText}>{item.stars}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>

      {/* MODAL GÊNEROS */}
      <Modal animationType="fade" transparent={true} visible={genreModalVisible} onRequestClose={() => setGenreModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setGenreModalVisible(false)}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Selecione um Gênero</Text>
            {genreList.map((g) => (
              <TouchableOpacity key={g} style={[styles.popupOption, selectedGenre === g && styles.popupOptionSelected]} onPress={() => { setSelectedGenre(g); setGenreModalVisible(false); }}>
                <Text style={[styles.popupOptionText, selectedGenre === g && styles.popupOptionTextSelected]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* MODAL CLASSIFICAÇÃO */}
      <Modal animationType="fade" transparent={true} visible={ratingModalVisible} onRequestClose={() => setRatingModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setRatingModalVisible(false)}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Selecione a Classificação</Text>
            {ratingList.map((r) => (
              <TouchableOpacity key={r.value} style={[styles.popupOption, selectedRating === r.value && styles.popupOptionSelected]} onPress={() => { setSelectedRating(r.value); setRatingModalVisible(false); }}>
                <Text style={[styles.popupOptionText, selectedRating === r.value && styles.popupOptionTextSelected]}>{r.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* MODAL DETALHES + RESENHA ÚNICA */}
      <Modal animationType="slide" transparent={true} visible={!!selectedMovie} onRequestClose={() => setSelectedMovie(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedMovie(null)}>
              <Ionicons name="close-circle" size={32} color="#fff" />
            </TouchableOpacity>

            {selectedMovie && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: selectedMovie.imageUrl }} style={styles.modalPoster} />
                <View style={styles.modalDetails}>
                  <View style={styles.modalHeaderTitleRow}>
                    <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(selectedMovie)}>
                      <Ionicons
                        name={isFavorite(selectedMovie.id) ? 'heart' : 'heart-outline'}
                        size={28}
                        color={isFavorite(selectedMovie.id) ? '#e74c3c' : '#333'}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.modalMeta}>{selectedMovie.year} • {selectedMovie.genre} • {selectedMovie.duration}</Text>
                  <Text style={styles.modalSynopsis}>{selectedMovie.synopsis}</Text>

                  <View style={styles.divider} />

                  {myCurrentReview && !isEditing ? (
                    <View style={styles.myReviewCard}>
                      <View style={styles.myReviewHeader}>
                        <Text style={styles.myReviewUser}>Você</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.myReviewStars}>{myCurrentReview.stars}</Text>
                          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsEditing(true)}>
                            <Ionicons name="pencil" size={18} color="#286879" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => {
                              deleteReview(selectedMovie.id);
                              setUserComment('');
                              setUserRating(5);
                              setIsEditing(true);
                            }}
                          >
                            <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.myReviewComment}>{myCurrentReview.comment}</Text>
                    </View>
                  ) : (
                    <View style={styles.addReviewBox}>
                      <Text style={styles.rateLabel}>Sua avaliação:</Text>
                      <View style={styles.starsPickerRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                            <Ionicons
                              name={star <= userRating ? 'star' : 'star-outline'}
                              size={26}
                              color="#F39C12"
                              style={{ marginRight: 6 }}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      <TextInput
                        style={styles.reviewInput}
                        placeholder="Escreva sua resenha sobre o filme..."
                        placeholderTextColor="#999"
                        multiline
                        value={userComment}
                        onChangeText={setUserComment}
                      />

                      <TouchableOpacity style={styles.publishBtn} onPress={handleSaveReview}>
                        <Ionicons name="checkmark-circle-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                        <Text style={styles.publishBtnText}>
                          {myCurrentReview ? 'Atualizar Resenha' : 'Publicar Resenha'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.divider} />

                  <Text style={styles.modalSectionTitle}>Outras Avaliações</Text>
                  {selectedMovie.reviews?.map((rev: any, idx: number) => (
                    <View key={idx} style={styles.reviewCard}>
                      {renderAvatar(rev.user, 38)}
                      <View style={styles.reviewContent}>
                        <View style={styles.reviewHeaderRow}>
                          <Text style={styles.reviewUserName}>{rev.user.name}</Text>
                          <Text style={styles.reviewStars}>{rev.stars}</Text>
                        </View>
                        <Text style={styles.reviewCommentText}>{rev.comment}</Text>
                      </View>
                    </View>
                  ))}
                </View>
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
  safeArea: { flex: 1, backgroundColor: '#e8e8d7' },
  mainContainer: { flex: 1 },

  headerBackground: { width: '100%', height: 210, overflow: 'hidden' },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 10,
    justifyContent: 'center', // Centraliza verticalmente o conteúdo para descer do topo
    alignItems: 'center',
  },
  headerMainTitle: {
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
    marginBottom: 10,
    maxWidth: '50%',
    width: '100%',
  },
  searchInput: { flex: 1, fontFamily: RALEWAY_FONT, fontSize: 13, color: '#333' },

  compactButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  compactFilterBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#286879', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  compactFilterActive: { backgroundColor: '#1d4d5a' },
  compactFilterText: { color: '#FFF', fontFamily: RALEWAY_FONT, fontSize: 12, fontWeight: 'bold' },

  listContainer: { padding: 16, paddingBottom: 20 },
  columnWrapperWeb: { justifyContent: 'flex-start', gap: 16, marginBottom: 16 },
  columnWrapperMobile: { justifyContent: 'space-between', marginBottom: 16 },
  movieCard: { backgroundColor: '#83b6c477', borderRadius: 16, padding: 8, elevation: 3 },
  posterContainer: { position: 'relative', width: '100%' },
  posterImage: { width: '100%', height: 180, borderRadius: 12, resizeMode: 'cover' },
  smallFavoriteButton: { position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(0,0,0,0.5)', padding: 6, borderRadius: 14 },
  cardInfo: { marginTop: 8, alignItems: 'center' },
  movieTitle: { fontFamily: RALEWAY_FONT, fontSize: 14, fontWeight: 'bold', color: '#0a101dcc', textAlign: 'center' },
  movieGenre: { fontFamily: RALEWAY_FONT, fontSize: 11, color: '#4A6B58', marginTop: 2, textAlign: 'center' },
  starsText: { fontFamily: RALEWAY_FONT, fontSize: 11, color: '#F39C12', marginTop: 3 },

  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontFamily: RALEWAY_FONT, marginTop: 10, fontSize: 14, color: '#777', textAlign: 'center' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  popupContainer: { width: '85%', maxWidth: 350, backgroundColor: '#FFF', borderRadius: 20, padding: 20 },
  popupTitle: { fontFamily: RALEWAY_FONT, fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15, textAlign: 'center' },
  popupOption: { paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10, marginBottom: 5 },
  popupOptionSelected: { backgroundColor: '#E8F0EC' },
  popupOptionText: { fontFamily: RALEWAY_FONT, fontSize: 15, color: '#333' },
  popupOptionTextSelected: { fontWeight: 'bold', color: '#286879' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  modalContent: { height: '85%', backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, overflow: 'hidden' },
  closeBtn: { position: 'absolute', top: 15, right: 15, zIndex: 10 },
  modalPoster: { width: '100%', height: 260, resizeMode: 'cover' },
  modalDetails: { padding: 20 },
  modalHeaderTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontFamily: RALEWAY_FONT, fontSize: 24, fontWeight: 'bold', color: '#222', flex: 1 },
  modalMeta: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#666', marginVertical: 4 },
  modalSectionTitle: { fontFamily: RALEWAY_FONT, fontSize: 17, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8, marginTop: 10 },
  modalSynopsis: { fontFamily: RALEWAY_FONT, fontSize: 14, color: '#555', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },

  myReviewCard: { backgroundColor: '#E8F0EC', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#286879' },
  myReviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  myReviewUser: { fontFamily: RALEWAY_FONT, fontWeight: 'bold', fontSize: 14, color: '#2C3E50' },
  myReviewStars: { fontFamily: RALEWAY_FONT, color: '#F39C12', fontSize: 13 },
  myReviewComment: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#333', lineHeight: 18 },

  addReviewBox: { backgroundColor: '#F9F8F3', padding: 14, borderRadius: 16, marginBottom: 10 },
  rateLabel: { fontFamily: RALEWAY_FONT, fontSize: 13, fontWeight: 'bold', color: '#444', marginBottom: 6 },
  starsPickerRow: { flexDirection: 'row', marginBottom: 10 },
  reviewInput: { fontFamily: RALEWAY_FONT, backgroundColor: '#fff', borderRadius: 12, padding: 10, minHeight: 70, textAlignVertical: 'top', fontSize: 14, color: '#333', borderWidth: 1, borderColor: '#E5E2D0', marginBottom: 10 },
  publishBtn: { flexDirection: 'row', backgroundColor: '#286879', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-end', alignItems: 'center' },
  publishBtnText: { fontFamily: RALEWAY_FONT, color: '#fff', fontWeight: 'bold', fontSize: 13 },

  reviewCard: { flexDirection: 'row', backgroundColor: '#F9F8F3', padding: 12, borderRadius: 14, marginBottom: 10, alignItems: 'flex-start' },
  reviewContent: { flex: 1, marginLeft: 12 },
  reviewHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewUserName: { fontFamily: RALEWAY_FONT, fontSize: 14, fontWeight: 'bold', color: '#222' },
  reviewStars: { fontFamily: RALEWAY_FONT, fontSize: 11, color: '#F39C12' },
  reviewCommentText: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#555', marginTop: 4, lineHeight: 18 },

  layerFull: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
});