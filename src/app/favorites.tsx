import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO DA PÁGINA */}
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/1200x/c6/af/97/c6af977fd003d0cc8cc7f950bb8b1338.jpg' }}
        style={styles.headerBackground}
        imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.headerBrand}>KIZUNA</Text>
          <Text style={styles.headerTitle}>Filmes Curtidos ({favorites.length})</Text>
        </View>
      </ImageBackground>

      {/* LISTA DE FAVORITOS SINCRONIZADA */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.favoriteCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.poster} />
              <View style={styles.info}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieMeta}>{item.genre} • {item.year}</Text>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => toggleFavorite(item)}
              >
                <Ionicons name="heart" size={26} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color="#aaa" />
          <Text style={styles.emptyText}>Nenhum filme curtido ainda.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F1E1' },
  headerBackground: { width: '100%', height: 150, overflow: 'hidden' },
  headerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', padding: 20, justifyContent: 'flex-end' },
  headerBrand: { fontSize: 12, fontWeight: 'bold', color: '#80B396', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', marginTop: 2 },
  favoriteCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', elevation: 2 },
  poster: { width: 70, height: 95, borderRadius: 10 },
  info: { flex: 1, marginLeft: 15 },
  movieTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  movieMeta: { fontSize: 13, color: '#777', marginVertical: 4 },
  removeBtn: { padding: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 15, color: '#888', marginTop: 10, textAlign: 'center' },
});