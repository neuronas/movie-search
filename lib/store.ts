import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { Movie } from '../app/api'; 

interface MovieStore  { 
  movieList: Movie[];
  addToList: (arg: Movie[]) => void;
  removeList: () => void;
}

interface SearchStore {
  pattern: string;
  setPattern: (arg: string) => void;
}

export const useSearchStore = create(
  persist<SearchStore>(
    (set, get) => ({
      pattern: "",
      setPattern: (newString) => set({ pattern: newString }),
    }),
    {
      name: 'search-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export const useMoviesStore = create(
  persist<MovieStore>(
    (set, get) => ({
      movieList: [],
      addToList: (newMovies) => set((state) => ({ movieList: [ ...state.movieList, ...newMovies ]})),
      removeList: () => set({ movieList: [] })
    }),
    {
      name: 'movie-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)