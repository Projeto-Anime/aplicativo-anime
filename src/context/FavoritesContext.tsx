import React, { createContext, useContext, useState } from 'react';

export interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  duration?: string;
  rating?: string | number;
  stars?: string;
  imageUrl: string;
  synopsis?: string;
}

export interface UserReview {
  movieId: string;
  movieTitle: string;
  movieImage: string;
  stars: string;
  ratingNum: number;
  comment: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  bannerUrl: string;
  avatarHair: any;
  avatarEyes: any;
  avatarMouth: any;
  avatarClothes: any;
}

interface FavoritesContextData {
  favorites: Movie[];
  myReviews: UserReview[];
  userProfile: UserProfile;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: string) => boolean;
  addOrEditReview: (review: UserReview) => void;
  deleteReview: (movieId: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const DEFAULT_HAIR = require('../../assets/avatar/cabelo_2.png');
const DEFAULT_EYES = require('../../assets/avatar/olhos_1.png');
const DEFAULT_MOUTH = require('../../assets/avatar/boca_1.png');
const DEFAULT_CLOTHES = require('../../assets/avatar/roupa_quimono.png');

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([
    {
      id: '15',
      title: 'O Castelo Animado',
      year: '2004',
      genre: 'Fantasia/Romance',
      duration: '1h 59m',
      rating: '4.9',
      stars: '★★★★★',
      imageUrl: 'https://i.pinimg.com/736x/25/97/1d/25971d2b92e53aa2091016ad2066ac50.jpg',
      synopsis: 'Sophie busca a ajuda do Mago Howl para quebrar uma maldição.',
    },
  ]);

  const [myReviews, setMyReviews] = useState<UserReview[]>([
    {
      movieId: '15',
      movieTitle: 'O Castelo Animado',
      movieImage: 'https://i.pinimg.com/736x/25/97/1d/25971d2b92e53aa2091016ad2066ac50.jpg',
      stars: '★★★★★',
      ratingNum: 5,
      comment: 'Animação e trilha sonora inesquecíveis! Meu favorito sem dúvidas.',
    },
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Maria',
    bio: 'Explorando o universo mágico do Studio Ghibli e organizando meus filmes favoritos! ✨🌸',
    bannerUrl: 'https://i.pinimg.com/1200x/60/ef/a3/60efa3a9382bf3503f0d96fc6bdd1147.jpg',
    avatarHair: DEFAULT_HAIR,
    avatarEyes: DEFAULT_EYES,
    avatarMouth: DEFAULT_MOUTH,
    avatarClothes: DEFAULT_CLOTHES,
  });

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      return exists ? prev.filter((item) => item.id !== movie.id) : [...prev, movie];
    });
  };

  const isFavorite = (id: string) => favorites.some((item) => item.id === id);

  const addOrEditReview = (review: UserReview) => {
    setMyReviews((prev) => {
      const exists = prev.some((r) => r.movieId === review.movieId);
      if (exists) {
        return prev.map((r) => (r.movieId === review.movieId ? review : r));
      }
      return [review, ...prev];
    });
  };

  const deleteReview = (movieId: string) => {
    setMyReviews((prev) => prev.filter((r) => r.movieId !== movieId));
  };

  const updateUserProfile = (profileData: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profileData }));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        myReviews,
        userProfile,
        toggleFavorite,
        isFavorite,
        addOrEditReview,
        deleteReview,
        updateUserProfile,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);