import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANNER_TOP = require('../../assets/ponyo.png');
const LOGO = require('../../assets/logo_kizuna.png');

interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  duration?: string;
  imageUrl: string;
  synopsis: string;
}

const featuredMovies: Movie[] = [
  {
    id: 'f1',
    title: 'A Viagem de Chihiro',
    year: '2001',
    genre: 'Fantasia/Aventura',
    duration: '2h 5m',
    imageUrl: 'https://i.pinimg.com/1200x/c6/af/97/c6af977fd003d0cc8cc7f950bb8b1338.jpg',
    synopsis: 'Chihiro entra em um mundo mágico e precisa trabalhar em uma casa de banhos para salvar seus pais.',
  },
  {
    id: 'f2',
    title: 'O Castelo Animado',
    year: '2004',
    genre: 'Fantasia/Romance',
    duration: '1h 59m',
    imageUrl: 'https://i.pinimg.com/1200x/ad/45/89/ad45898372afe4d910b75a7611367390.jpg',
    synopsis: 'Sophie busca a ajuda do Mago Howl em seu castelo ambulante para quebrar uma maldição.',
  },
  {
    id: 'f3',
    title: 'Princesa Mononoke',
    year: '1997',
    genre: 'Ação/Fantasia',
    duration: '2h 14m',
    imageUrl: 'https://i.pinimg.com/1200x/79/cf/85/79cf85e81662593ef4b3b494e48d9310.jpg',
    synopsis: 'Um jovem príncipe se envolve em uma batalha entre os deuses da floresta e uma cidade mineradora.',
  },
];

const initialRecommendations: Movie[] = [
  {
    id: 'r1',
    title: 'Meu amigo Totoro',
    year: '1988',
    genre: 'Infantil/Fantasia',
    imageUrl: 'https://i.pinimg.com/736x/73/eb/8e/73eb8e2341b7b171594479e195fb4ce0.jpg',
    synopsis: 'Duas meninas se mudam para o campo e descobrem que a floresta é habitada por espíritos mágicos.',
  },
  {
    id: 'r2',
    title: 'Túmulo dos Vagalumes',
    year: '1988',
    genre: 'Drama/Guerra',
    imageUrl: 'https://i.pinimg.com/1200x/3d/79/82/3d7982400c57619c4e64db6c0c50072a.jpg',
    synopsis: 'A trágica história de dois irmãos tentando sobreviver no Japão durante os meses finais da Segunda Guerra Mundial.',
  },
  {
    id: 'r3',
    title: 'Memórias de Ontem',
    year: '1991',
    genre: 'Drama/Romance',
    imageUrl: 'https://i.pinimg.com/1200x/8b/ea/3e/8bea3e67827977158e597824a2e57293.jpg',
    synopsis: 'Uma mulher de 27 anos viaja para o campo e relembra sua infância enquanto repensa suas escolhas de vida.',
  },
];

const extraRecommendations: Movie[] = [
  {
    id: 'r4',
    title: 'Serviço de Entregas da Kiki',
    year: '1989',
    genre: 'Aventura/Fantasia',
    imageUrl: 'https://i.pinimg.com/1200x/f9/f2/54/f9f25406a3077941ef08c0be67444fc2.jpg',
    synopsis: 'Uma jovem bruxa se muda para uma nova cidade e abre um serviço de entregas voador para se sustentar.',
  },
  {
    id: 'r5',
    title: 'Ponyo: Uma Amizade do Mar',
    year: '2008',
    genre: 'Infantil/Aventura',
    imageUrl: 'https://i.pinimg.com/1200x/ba/8d/aa/ba8daafcc0c820465f17094a6bae0f54.jpg',
    synopsis: 'Um garoto de cinco anos desenvolve uma relação especial com Ponyo, uma peixinha dourada mágica que deseja virar humana.',
  },
  {
    id: 'r6',
    title: 'O Castelo no Céu',
    year: '1986',
    genre: 'Aventura/Steampunk',
    imageUrl: 'https://i.pinimg.com/1200x/e8/d4/6c/e8d46cf11844ab7be27c48b05c8c809e.jpg',
    synopsis: 'Um jovem órfão e uma garota com um amuleto mágico buscam uma lendária cidade flutuante.',
  },
  {
    id: 'r7',
    title: 'O Menino e a Garça',
    year: '2023',
    genre: 'Fantasia/Drama',
    imageUrl: 'https://i.pinimg.com/1200x/5b/7f/ad/5b7fad7146a44318a5a89002fa80c1f2.jpg',
    synopsis: 'Após perder a mãe na guerra, o jovem Mahito se aventura em um mundo misterioso onde a vida e a morte coincidem.',
  },
  {
    id: 'r8',
    title: 'O Mundo dos Pequeninos',
    year: '2010',
    genre: 'Fantasia/Aventura',
    imageUrl: 'https://i.pinimg.com/1200x/2d/68/86/2d68861874b177aa40374f571225ee70.jpg',
    synopsis: 'A família de Arrietty vive secretamente sob o assoalho de uma casa, até ser descoberta por um menino.',
  },
  {
    id: 'r9',
    title: 'Sussurros do Coração',
    year: '1995',
    genre: 'Romance/Drama',
    imageUrl: 'https://i.pinimg.com/1200x/fe/6e/a1/fe6ea181bcacd7d485a53911fffd214e.jpg',
    synopsis: 'Uma garota apaixonada por leitura percebe que todos os livros da biblioteca que pega já foram lidos pelo mesmo menino.',
  },
];

export default function HomeScreen() {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showMore, setShowMore] = useState(false);

  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width > 768;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeFeatured = featuredMovies[currentFeaturedIndex];
  const displayedRecommendations = showMore
    ? [...initialRecommendations, ...extraRecommendations]
    : initialRecommendations;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <ImageBackground
          source={BANNER_TOP}
          style={styles.headerBackground}
          imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
        >
          <View style={styles.headerOverlay}>
            <Image
              source={LOGO}
              style={styles.logoBottomLeft}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>

        <View style={[styles.mainContent, { paddingHorizontal: isDesktop ? 60 : 16 }]}>
          <Text style={styles.sectionTitle}>Em destaque</Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedMovie(activeFeatured)}
            style={[styles.carouselContainer, { height: isDesktop ? 360 : 200 }]}
          >
            <ImageBackground
              source={{ uri: activeFeatured.imageUrl }}
              style={styles.featuredImage}
              imageStyle={{ borderRadius: 16 }}
              resizeMode="cover"
            >
              <View style={styles.featuredGradient}>
                <Text style={styles.featuredTitle}>{activeFeatured.title}</Text>
                <Text style={styles.featuredSub}>
                  {activeFeatured.year} • {activeFeatured.genre} • {activeFeatured.duration}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* INDICADORES DO CARROSSEL */}
          <View style={styles.paginationDotsContainer}>
            {featuredMovies.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentFeaturedIndex(index)}
                style={[
                  styles.dot,
                  index === currentFeaturedIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Recomendações</Text>

          {/* GRELHA DE RECOMENDAÇÕES */}
          <View style={styles.recommendationsGrid}>
            {displayedRecommendations.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                style={styles.recommendationCard}
                activeOpacity={0.8}
                onPress={() => setSelectedMovie(movie)}
              >
                <Image
                  source={{ uri: movie.imageUrl }}
                  style={styles.recommendationImage}
                  resizeMode="cover"
                />
                <Text
                  style={styles.recommendationTitle}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.seeMoreBtn}
            activeOpacity={0.8}
            onPress={() => setShowMore(!showMore)}
          >
            <Text style={styles.seeMoreBtnText}>
              {showMore ? 'Ver Menos' : 'Ver Mais Filmes'}
            </Text>
            <Ionicons
              name={showMore ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#FFF"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={!!selectedMovie}
        onRequestClose={() => setSelectedMovie(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedMovie(null)}>
              <Ionicons name="close-circle" size={32} color="#ffffffdf" />
            </TouchableOpacity>

            {selectedMovie && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: selectedMovie.imageUrl }} style={styles.modalBannerImage} />
                <View style={styles.modalBody}>
                  <Text style={styles.modalTag}>
                    {selectedMovie.genre} • {selectedMovie.year}
                  </Text>
                  <Text style={styles.modalTitle}>{selectedMovie.title}</Text>

                  <View style={styles.modalDivider} />
                  <Text style={styles.modalSynopsisLabel}>Sinopse:</Text>
                  <Text style={styles.modalDescriptionText}>{selectedMovie.synopsis}</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const RALEWAY_FONT = Platform.OS === 'web' ? 'Raleway, sans-serif' : 'System';
const SPECIAL_TITLE_FONT = Platform.OS === 'web' ? 'LXGW WenKai Mono TC, monospace' : 'System';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8d7',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  headerBackground: { 
    width: '100%', 
    height: 250, 
    overflow: 'hidden',
  },
  headerOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.45)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBottomLeft: {
    width: 250,
    height: 300,
  },
  mainContent: {
    paddingTop: 10,
    width: '100%',
    maxWidth: 1400,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontFamily: SPECIAL_TITLE_FONT,
    fontSize: 31,
    color: '#30495A',
    marginBottom: 20,
    marginTop: 25,
  },
  carouselContainer: {
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  featuredGradient: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
  },
  featuredTitle: {
    fontFamily: RALEWAY_FONT,
    fontSize: 20,
    fontWeight: '700',
    color: '#f6f5e6',
    marginBottom: 4,
  },
  featuredSub: {
    fontFamily: RALEWAY_FONT,
    fontSize: 12,
    color: '#e0e0e0e2',
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#30495A',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(48, 73, 90, 0.35)',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  recommendationCard: {
    width: '31%',
    alignItems: 'center',
    backgroundColor: '#83b6c477',
    borderRadius: 14,
    padding: 8,
    marginBottom: 8,
    elevation: 2,
  },
  recommendationImage: {
    width: '100%',
    aspectRatio: 1.15,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginBottom: 6,
  },
  recommendationTitle: {
    fontFamily: RALEWAY_FONT,
    fontSize: 12,
    fontWeight: '600',
    color: '#0a101d',
    textAlign: 'center',
    width: '100%',
    lineHeight: 15,
  },
  seeMoreBtn: {
    flexDirection: 'row',
    backgroundColor: '#184c5bb2',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 15,
    elevation: 2,
  },
  seeMoreBtnText: {
    fontFamily: RALEWAY_FONT,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  modalBannerImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  modalBody: {
    padding: 20,
  },
  modalTag: {
    fontFamily: RALEWAY_FONT,
    fontSize: 12,
    color: '#286879',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontFamily: RALEWAY_FONT,
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginTop: 4,
    marginBottom: 12,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 16,
  },
  modalSynopsisLabel: {
    fontFamily: RALEWAY_FONT,
    fontSize: 15,
    fontWeight: '700',
    color: '#30495A',
    marginBottom: 8,
  },
  modalDescriptionText: {
    fontFamily: RALEWAY_FONT,
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});