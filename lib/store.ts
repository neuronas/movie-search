import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { Root } from '../app/api';

interface MovieStore  { 
  movieList: MovieList | undefined
  addToList: (arg: MovieList) => void;
  removeList: () => void;
}

export interface MovieList {
  pageParams: number[];
  pages: Root[];
}

interface SearchStore {
  pattern: string;
  setPattern: (arg: string) => void;
}

interface BoundStore {
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
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
      movieList: undefined,
      addToList: (newMovies) => set((state) => ({ movieList: newMovies })),
      removeList: () => set({ movieList: undefined }),
    }),
    {
      name: 'movie-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export const useBoundStore = create(
  persist<BoundStore>(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      }
    }),
    {
      name: '',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
);