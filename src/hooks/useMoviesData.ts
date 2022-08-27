import { useState, useEffect } from 'react';

// Config
import { API_KEY, BASE_URL, POPULAR_MOVIES_ENDPOINT } from '../config/config';

/**
 * Fetch movies data based on given params
 */
const useMoviesData = () => {
    const [moviesData, setMoviesData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchMovies = (page = 1) => {
        setIsLoading(true);
        fetch(`${BASE_URL}${POPULAR_MOVIES_ENDPOINT}?api_key=${API_KEY}&page=${page}`, {  })
        .then((res) => res.json())
        .then((data) =>
            setTimeout(() => {
                // setTimeout used here to slow down the api
                setMoviesData([...moviesData, ...data?.results]);
                setIsLoading(false);
            }, 500)
        );
    };

    useEffect(() => {
        fetchMovies(1);
    }, [])

    return {
        data: moviesData,
        fetchMovies,
        isLoading: isLoading || !moviesData?.length
    };
};

export default  useMoviesData;
