
export interface Movie {
  id: number
  original_title: string; 
  overview: string 
  popularity: number; 
  poster_path: string
  title: string;
  vote_average: number; 
  vote_count: number; 
}

export interface Root {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovieList = (settings: string) => {
  const url =`${process.env.NEXT_PUBLIC_BASEURL}/discover/movie${settings}`

  const params = { params: { sort_by: 'popularity.desc' } }
  return fetch(url)
  .then((res)  => {
    return res.json()
  })
}