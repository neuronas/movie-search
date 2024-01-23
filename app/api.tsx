'use server'
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

export const fetchMovieList = (pattern: string, page: number) => {
  if (!pattern) return Promise.reject()
  const query = `${process.env.NEXT_PUBLIC_BASEURL}/search/movie?query=${pattern}&page=${page}&language=es-AR`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
  };
  const params = { params: { sort_by: 'popularity.desc' } }
  return fetch(query, options)
  .then((res)  => {
    return res.json()
  })
}