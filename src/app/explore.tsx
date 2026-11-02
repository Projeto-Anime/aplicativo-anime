import React, { useState } from 'react';
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
  Linking,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BANNER_TOP = require('../../assets/ponyo.png');

const documentaries = [
  {
    id: 'd1',
    title: "The Story of Yanagawa's Canals",
    year: '2003',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/06/capa-The-Story-of-Yanagawas-Canals.jpg?w=279&ssl=1',
    description: 'Documentário dirigido por Isao Takahata sobre a restauração e preservação dos canais da cidade de Yanagawa em Fukuoka, no Japão.',
  },
  {
    id: 'd2',
    title: 'A Ghibli Artisan – Kazuo Oga Exhibition',
    year: '2007',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/07/Ghibli-Artisan-Kazuo-Oga-Exhibition-A-The-One-Who-Painted-Totoros-Forest.jpg?w=279&ssl=1',
    description: 'Exibe o trabalho de Kazuo Oga, diretor de arte responsável por pintar os impressionantes cenários e florestas naturais de Totoro e vários outros clássicos do estúdio.',
  },
  {
    id: 'd3',
    title: 'The Kingdom of Dreams and Madness',
    year: '2013',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2025/01/the-kingdom-of-dreams-and-madness.jpg?w=279&ssl=1',
    description: 'Documentário que acompanha a rotina interna do Studio Ghibli durante um ano, mostrando o processo de produção de Hayao Miyazaki e Isao Takahata.',
  },
  {
    id: 'd4',
    title: 'Isao Takahata and his Tale of Princess Kaguya',
    year: '2013',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/06/capa-isao-takahata-and-his-tale-of-princess-kaguya.jpg?w=279&ssl=1',
    description: 'Bastidores detalhados sobre a dedicação e o processo de criação de Isao Takahata na produção do aclamado "O Conto da Princesa Kaguya".',
  },
  {
    id: 'd5',
    title: 'Never-ending man: Hayao Miyazaki',
    year: '2016',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/06/2016-Never-Ending-Man-Hayao-Miyazaki.jpg?w=279&ssl=1',
    description: 'Acompanha a vida de Hayao Miyazaki após seu anúncio de aposentadoria e seu retorno para criar o curta-metragem em CGI "Boro, a Lagarta".',
  },
  {
    id: 'd6',
    title: '10 Years with Hayao Miyazaki',
    year: '2019',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/06/2019-10-Years-with-Hayao-Miyazaki.jpg?w=279&ssl=1',
    description: 'Série documental exclusiva em 4 partes registrando o processo criativo, dilemas e a essência do trabalho de Hayao Miyazaki ao longo de dez anos.',
  },
  {
    id: 'd7',
    title: 'Hayao Miyazaki e a Garça',
    year: '2024',
    type: 'Documentário',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2025/01/Hayao-Miyazaki-e-a-Garca.jpg?w=279&ssl=1',
    description: 'Documentário que revela os 7 anos de produção do filme vencedor do Oscar "O Menino e a Garça".',
  },
];

const videoGames = [
  {
    id: 'g1',
    title: 'Ni no Kuni: Dominion of the Dark Djinn',
    year: '2010',
    platform: 'Nintendo DS',
    type: 'Jogo',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/07/Ni-no-Kuni-Dominion-of-the-Dark-Djinn-DS.jpg?w=279&ssl=1',
    description: 'A primeira versão do RPG lançada para Nintendo DS, acompanhada de um livro de feitiços físico para conjurar magias no jogo.',
  },
  {
    id: 'g2',
    title: 'Ni no Kuni: Wrath of the White Witch',
    year: '2011',
    platform: 'PlayStation 3',
    type: 'Jogo',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/07/Ni-No-Kuni-Wrath-Of-The-White-Witch-PS3.jpg?w=279&ssl=1',
    description: 'Animações produzidas pelo Studio Ghibli e trilha sonora composta por Joe Hisaishi. Uma jornada inesquecível do jovem Oliver.',
  },
  {
    id: 'g3',
    title: 'Ni no Kuni II: Revenant Kingdom',
    year: '2018',
    platform: 'PlayStation 4, PC',
    type: 'Jogo',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/07/Ni-no-Kuni-II-Revenant-Kingdom-PS4.jpg?w=279&ssl=1',
    description: 'Acompanha o jovem rei Evan Pettiwhisker Tildrum em sua missão para reconstruir seu reino e unir o mundo.',
  },
  {
    id: 'g4',
    title: 'Ni no Kuni: Wrath of the White Witch Remastered',
    year: '2019',
    platform: 'PlayStation 4, Switch, PC',
    type: 'Jogo',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/07/Ni-No-Kuni-Wrath-Of-The-White-Witch-Remastered-PS4.jpg?w=279&ssl=1',
    description: 'Versão remasterizada com gráficos aprimorados e melhor desempenho para consoles modernos.',
  },
  {
    id: 'g5',
    title: 'Ni no Kuni: Cross Worlds',
    year: '2021',
    platform: 'Mobile (iOS, Android), PC',
    type: 'Jogo',
    imageUrl: 'https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2025/01/Ni-no-Kuni-Cross-Worlds.jpg?w=279&ssl=1',
    description: 'MMORPG para celulares e PC desenvolvido pela Netmarble em parceria com a Level-5, mantendo a direção estética marcante do Studio Ghibli.',
  },
];

const parkAreas = [
  {
    name: "Ghibli's Grand Warehouse",
    sub: 'O Grande Armazém',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IMsq6gc1aBYXsimZdr7_SO-PibZ0rEW6pJuvDvCdcw&s=10',
    desc: 'O coração do parque! Uma enorme instalação coberta repleta de cenários icônicos, exposições de filmes, salas de projeção e lojas exclusivas.',
  },
  {
    name: 'Hill of Youth',
    sub: 'Colina da Juventude',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRso8N6gUPs5iXzFqMz9qiGFOQwN0sJv78DpHpUgkwqyWGzqI1FzlkuWFs&s=10',
    desc: 'Abriga a loja de antiguidades Chikyu-ya de "Sussurros do Coração" e a impressionante torre inspirada em "O Castelo Animado".',
  },
  {
    name: 'Dondoko Forest',
    sub: 'Floresta Dondoko',
    imageUrl: 'https://ghibli-park.jp/site/img/about/dondokomori/img01.jpg',
    desc: 'Onde fica a réplica em tamanho real da casa de Satsuki e Mei de "Meu Amigo Totoro", rodeada pela natureza intocada.',
  },
  {
    name: 'Mononoke Village',
    sub: 'Vila Mononoke',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LInKP8CvhHovqPEN6cqgwlSYHOV_7ZhnXrahTBeDPg&s=10',
    desc: 'Inspirada nas paisagens de "Princesa Mononoke", com estruturas rurais tradicionais e imponentes esculturas dos espíritos da floresta.',
  },
  {
    name: 'Valley of Witches',
    sub: 'Vale das Bruxinhas',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-MHLLBcbukyMgRE4UBfSq0LyvBSqJQ3wuOTSj6QRYWsgB0y-EzkxUob1I&s=10',
    desc: 'Inspirado em "O Serviço de Entregas da Kiki" e "O Castelo Animado", apresentando a padaria da Kiki e a versão gigante do castelo ambulante!',
  },
];

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const [subTab, setSubTab] = useState<'curiosities' | 'park'>('curiosities');
  const [selectedDetailItem, setSelectedDetailItem] = useState<any>(null);

  const isWeb = width >= 768;
  const parkCardWidth = isWeb ? '48.5%' : '100%';

  const handleOpenOfficialWebsite = () => {
    Linking.openURL('https://ghibli-park.jp/en/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>

        {/* CABEÇALHO */}
        <ImageBackground
          source={BANNER_TOP}
          style={styles.headerBackground}
          imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.headerMainTitle}>Explorar Universo</Text>

            {/* ABAS INTERNAS CENTRALIZADAS */}
            <View style={styles.tabBarRow}>
              <TouchableOpacity
                style={[styles.tabButton, subTab === 'curiosities' && styles.tabButtonActive]}
                onPress={() => setSubTab('curiosities')}
              >
                <Ionicons
                  name="sparkles"
                  size={16}
                  color={subTab === 'curiosities' ? '#FFF' : '#286879'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.tabButtonText, subTab === 'curiosities' && styles.tabButtonTextActive]}>
                  Doc & Jogos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, subTab === 'park' && styles.tabButtonActive]}
                onPress={() => setSubTab('park')}
              >
                <Ionicons
                  name="location"
                  size={16}
                  color={subTab === 'park' ? '#FFF' : '#286879'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.tabButtonText, subTab === 'park' && styles.tabButtonTextActive]}>
                  Ghibli Park
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* CONTEÚDO 1: DOCUMENTÁRIOS E JOGOS */}
        {subTab === 'curiosities' ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* BOX VOCÊ SABIA */}
            <View style={styles.didYouKnowBox}>
              <Text style={styles.didYouKnowTitle}>Você sabia?</Text>
              <Text style={styles.didYouKnowText}>
                O Studio Ghibli também possui diversas produções além de apenas filmes! Aqui mostramos alguns documentários contando curiosidades sobre o estúdio e jogos para você se divertir.
              </Text>
            </View>

            {/* DOCUMENTÁRIOS */}
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeaderTitle}>Documentários</Text>
              <Text style={styles.sectionHeaderSub}>Toque no cartaz para ver os detalhes</Text>
            </View>

            <View style={styles.posterGridContainer}>
              {documentaries.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.posterCard}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDetailItem(item)}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.posterImageTall} resizeMode="cover" />
                  <View style={styles.posterCardContent}>
                    <Text style={styles.posterTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.posterYear}>({item.year})</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* JOGOS */}
            <View style={[styles.sectionHeaderContainer, { marginTop: 35 }]}>
              <Text style={styles.sectionHeaderTitle}>Jogos de Vídeo</Text>
              <Text style={styles.sectionHeaderSub}>Franquia Ni no Kuni e parcerias</Text>
            </View>

            <View style={styles.posterGridContainer}>
              {videoGames.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.posterCard}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDetailItem(item)}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.posterImageTall} resizeMode="cover" />
                  <View style={styles.posterCardContent}>
                    <Text style={styles.posterTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.posterYear}>({item.year})</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

          </ScrollView>
        ) : (
          /* CONTEÚDO 2: GHIBLI PARK */
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* BANNER PROMOÇÃO KIZUNA CLUB */}
            <View style={styles.vipPromoBanner}>
              <View style={styles.vipBadgeHeader}>
                <Ionicons name="ribbon" size={20} color="#FFF" />
                <Text style={styles.vipBadgeTitle}>KIZUNA CLUB • BENEFÍCIO EXCLUSIVO</Text>
              </View>
              <Text style={styles.vipPromoHeadline}>Vantagens no Ghibli Park por R$ 5,00/mês!</Text>
              <Text style={styles.vipPromoDesc}>
                Assine o plano Kizuna Club no aplicativo por apenas R$ 5,00 por mês e garanta descontos exclusivos em souvenirs oficiais, brinde de boas-vindas e fila rápida em atrações selecionadas dentro do Ghibli Park no Japão! 
              </Text>
            </View>

            {/* CARD PARA INGRESSOS E SITE OFICIAL */}
            <View style={styles.officialWebsiteCard}>
              <View style={styles.officialWebsiteInfo}>
                <Ionicons name="ticket-outline" size={26} color="#286879" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.officialWebsiteTitle}>Ingressos & Informações Oficiais</Text>
                  <Text style={styles.officialWebsiteDesc}>
                    Consulte datas de venda, preços de tickets e o calendário oficial diretamente no site oficial do parque.
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.officialWebsiteBtn} onPress={handleOpenOfficialWebsite}>
                <Text style={styles.officialWebsiteBtnText}>Acessar ghibli-park.jp</Text>
                <Ionicons name="open-outline" size={16} color="#FFF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeaderTitle}>Sobre o Ghibli Park</Text>
              <Text style={styles.sectionHeaderSub}>Aichi Earth Year Memorial Park (Japão)</Text>
            </View>
            <Text style={styles.parkIntroText}>
              Diferente de parques de diversão tradicionais, o Ghibli Park convida os visitantes a caminhar e sentir os ventos e cenários mágicos dos filmes perfeitamente integrados à natureza.
            </Text>

            <View style={[styles.sectionHeaderContainer, { marginTop: 30 }]}>
              <Text style={styles.sectionHeaderTitle}>Áreas Temáticas</Text>
            </View>

            {/* CARDS DAS ÁREAS DO PARQUE */}
            <View style={styles.parkGridContainer}>
              {parkAreas.map((area, index) => (
                <View key={index} style={[styles.parkAreaCard, { width: parkCardWidth }]}>
                  <View style={styles.parkImageContainer}>
                    <Image
                      source={{ uri: area.imageUrl }}
                      style={styles.parkAreaImage}
                      resizeMode="cover"
                    />
                    <View style={styles.parkLocationBadge}>
                      <Ionicons name="location" size={12} color="#FFF" style={{ marginRight: 4 }} />
                      <Text style={styles.parkLocationText}>Ghibli Park, Japão</Text>
                    </View>
                  </View>
                  <View style={styles.parkAreaContent}>
                    <Text style={styles.parkAreaName}>{area.name}</Text>
                    <Text style={styles.parkAreaSub}>{area.sub}</Text>
                    <Text style={styles.parkAreaDesc}>{area.desc}</Text>
                  </View>
                </View>
              ))}
            </View>

          </ScrollView>
        )}

      </View>

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!selectedDetailItem}
        onRequestClose={() => setSelectedDetailItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSideBySideCard, !isWeb && styles.modalMobileCard]}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedDetailItem(null)}>
              <Ionicons name="close-circle" size={32} color="#286879" />
            </TouchableOpacity>

            {selectedDetailItem && (
              <View style={[styles.modalLayoutRow, !isWeb && styles.modalLayoutColumn]}>
                
                {/* LADO ESQUERDO: TEXTOS E DETALHES */}
                <ScrollView 
                  style={styles.modalLeftContent} 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.modalLeftScrollContainer}
                >
                  <Text style={styles.modalTypeTag}>
                    {selectedDetailItem.type} • {selectedDetailItem.year}
                  </Text>
                  <Text style={styles.modalTitleText}>{selectedDetailItem.title}</Text>

                  {selectedDetailItem.platform && (
                    <Text style={styles.modalSubText}>
                      Plataforma: {selectedDetailItem.platform}
                    </Text>
                  )}

                  <View style={styles.modalDivider} />

                  <Text style={styles.modalSynopsisLabel}>Sinopse / Detalhes:</Text>
                  <Text style={styles.modalDescriptionText}>{selectedDetailItem.description}</Text>
                </ScrollView>

                {/* LADO DIREITO: FOTO COMPLETA */}
                <View style={styles.modalRightImageContainer}>
                  <Image
                    source={{ uri: selectedDetailItem.imageUrl }}
                    style={styles.modalFullPosterImage}
                    resizeMode="contain"
                  />
                </View>

              </View>
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
  container: { flex: 1, backgroundColor: '#e8e8d7' },
  mainContainer: { flex: 1 },

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
  headerMainTitle: {
    fontFamily: SPECIAL_TITLE_FONT,
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },

  tabBarRow: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  tabButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  tabButtonActive: { backgroundColor: '#286879' },
  tabButtonText: { fontFamily: RALEWAY_FONT, fontSize: 13, fontWeight: 'bold', color: '#286879' },
  tabButtonTextActive: { color: '#FFF' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 80 },

  // VOCÊ SABIA
  didYouKnowBox: { backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginBottom: 28, borderWidth: 1, borderColor: '#E2DEC9', elevation: 2 },
  didYouKnowTitle: { fontFamily: RALEWAY_FONT, fontSize: 16, fontWeight: 'bold', color: '#30495A', marginBottom: 8 },
  didYouKnowText: { fontFamily: RALEWAY_FONT, fontSize: 13.5, color: '#555', lineHeight: 20 },

  // CABEÇALHOS DE SEÇÃO
  sectionHeaderContainer: {
    paddingLeft: 6,
    marginBottom: 16,
  },
  sectionHeaderTitle: { fontFamily: SPECIAL_TITLE_FONT, fontSize: 26, color: '#30495A' },
  sectionHeaderSub: { fontFamily: RALEWAY_FONT, fontSize: 12.5, color: '#7F8C8D', marginTop: 2 },

  // POSTERS (DOC & JOGOS)
  posterGridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 16,
    marginBottom: 10,
  },
  posterCard: { 
    backgroundColor: '#83b6c477', 
    borderRadius: 16, 
    overflow: 'hidden', 
    elevation: 3, 
    marginBottom: 12,
    width: Platform.OS === 'web' ? 200 : '47%', 
    flexGrow: Platform.OS === 'web' ? 1 : 0,
    maxWidth: Platform.OS === 'web' ? 240 : '48%',
  },
  posterImageTall: { width: '100%', height: 200 },
  posterCardContent: { padding: 12, alignItems: 'center' },
  posterTitle: { fontFamily: RALEWAY_FONT, fontSize: 13, fontWeight: 'bold', color: '#0a101d', textAlign: 'center', lineHeight: 17 },
  posterYear: { fontFamily: RALEWAY_FONT, fontSize: 11, color: '#286879', textAlign: 'center', marginTop: 4 },

  // PROMOVIP GHIBLI PARK
  vipPromoBanner: { backgroundColor: '#286879', padding: 20, borderRadius: 20, marginBottom: 24, elevation: 3 },
  vipBadgeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  vipBadgeTitle: { fontFamily: RALEWAY_FONT, color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 },
  vipPromoHeadline: { fontFamily: RALEWAY_FONT, fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  vipPromoDesc: { fontFamily: RALEWAY_FONT, fontSize: 13.5, color: '#F0F7F2', lineHeight: 19 },

  // CARD SITE OFICIAL & TICKETS
  officialWebsiteCard: { backgroundColor: '#FFF', borderRadius: 18, padding: 18, marginBottom: 28, borderWidth: 1, borderColor: '#E2DEC9', elevation: 2 },
  officialWebsiteInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  officialWebsiteTitle: { fontFamily: RALEWAY_FONT, fontSize: 15.5, fontWeight: 'bold', color: '#30495A' },
  officialWebsiteDesc: { fontFamily: RALEWAY_FONT, fontSize: 12.5, color: '#666', marginTop: 3, lineHeight: 17 },
  officialWebsiteBtn: { flexDirection: 'row', backgroundColor: '#286879', paddingVertical: 11, paddingHorizontal: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  officialWebsiteBtnText: { fontFamily: RALEWAY_FONT, color: '#FFF', fontWeight: 'bold', fontSize: 13 },

  parkIntroText: { fontFamily: RALEWAY_FONT, fontSize: 14, color: '#555', lineHeight: 21, marginBottom: 15, paddingLeft: 6 },

  // CARDS DAS ÁREAS DO PARQUE
  parkGridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  parkAreaCard: { backgroundColor: '#83b6c477', borderRadius: 18, overflow: 'hidden', marginBottom: 20, elevation: 3 },
  parkImageContainer: { position: 'relative', width: '100%', height: 210, backgroundColor: '#222' },
  parkAreaImage: { width: '100%', height: '100%' },
  parkLocationBadge: { position: 'absolute', bottom: 10, left: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.65)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  parkLocationText: { fontFamily: RALEWAY_FONT, color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  parkAreaContent: { padding: 16 },
  parkAreaName: { fontFamily: RALEWAY_FONT, fontSize: 18, fontWeight: 'bold', color: '#0a101d' },
  parkAreaSub: { fontFamily: RALEWAY_FONT, fontSize: 12.5, fontWeight: 'bold', color: '#286879', marginTop: 2, marginBottom: 8 },
  parkAreaDesc: { fontFamily: RALEWAY_FONT, fontSize: 13.5, color: '#333', lineHeight: 20 },

  // MODAL
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalSideBySideCard: { 
    width: '90%', 
    maxWidth: 750, 
    height: '75%', 
    maxHeight: 500, 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    overflow: 'hidden', 
    position: 'relative',
    elevation: 5,
  },
  modalMobileCard: { width: '95%', height: '85%', maxHeight: 600 },
  closeBtn: { position: 'absolute', top: 12, right: 12, zIndex: 10, backgroundColor: '#FFF', borderRadius: 20 },
  
  modalLayoutRow: { flexDirection: 'row', flex: 1, height: '100%' },
  modalLayoutColumn: { flexDirection: 'column-reverse' },

  modalLeftContent: { flex: 1 },
  modalLeftScrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 28, 
  },
  modalTypeTag: { fontFamily: RALEWAY_FONT, fontSize: 12, fontWeight: 'bold', color: '#286879', textTransform: 'uppercase' },
  modalTitleText: { fontFamily: RALEWAY_FONT, fontSize: 22, fontWeight: 'bold', color: '#222', marginTop: 4 },
  modalSubText: { fontFamily: RALEWAY_FONT, fontSize: 13, color: '#666', marginTop: 2 },
  modalDivider: { height: 1, backgroundColor: '#EEE', marginVertical: 14, width: '100%' },
  modalSynopsisLabel: { fontFamily: RALEWAY_FONT, fontSize: 15, fontWeight: 'bold', color: '#30495A', marginBottom: 6 },
  modalDescriptionText: { fontFamily: RALEWAY_FONT, fontSize: 14, color: '#444', lineHeight: 22 },

  modalRightImageContainer: { 
    flex: 1, 
    backgroundColor: '#0f171e', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 15,
    minHeight: 250,
  },
  modalFullPosterImage: { width: '100%', height: '100%' },
});