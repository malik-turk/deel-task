import React, { useState, useRef, useEffect } from "react";

// Hooks
import useMoviesData from "../hooks/useMoviesData";
import useOutsideClick from "../hooks/useClickOutside";

// Styles
import '../assets/styles/autocomplete.scss';

// Types
import { Movie } from '../types/common-types';

export default function Autocomplete() {
  const { data, fetchMovies, isLoading } = useMoviesData();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const searchRef = useRef(null);
  const searchInput = useRef(null);
  const [pageCount, setPageCount] = useState(2);
  const [activeMovie, setActiveMovie] = useState<number>(0);
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Use 'useOutsideClick' hook to close the dropdown
  useOutsideClick(searchRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    setMoviesData(data);

    // @ts-ignore
    // we need to use focus inside useEffect when input is disabled
    searchInput.current.focus();
  }, [data, isLoading])

  /**
   * Filter movies data and highlight matched text
   * When user starts typing
   * @param {React.ChangeEvent<HTMLInputElement>} e change event
   */
  const handleMovieSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMovie(e.target.value);

    const filteredData = data.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    // change matched text with a span in order to highlight it using regex
    const highlightedText = filteredData.map((movie: Movie) => {
      const regex = new RegExp(e.target.value);

      return {
        ...movie,
        highlightedTitle: movie.title.replace(regex, `<span>${e.target.value}</span>`)
      };
    });

    setIsFilterActive(true);
    setMoviesData(highlightedText);
  };


  /**
   * Set input value with selected movie
   * @param {Movie} movie
   */
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie.title);
    setIsDropdownOpen(false);
    setMoviesData(data);
  };

  /**
   * Fetch new movies when scroll reached at the end
   * @param {React.UIEvent<HTMLElement>} e scroll event
   */
  const handleInfiniteScroll = (e: React.UIEvent<HTMLElement>) => {
    //@ts-ignore
    const bottom = (e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;

    if (bottom && !isFilterActive) {
      setPageCount((prevState) => prevState + 1)
      fetchMovies(pageCount);
    }
  };

  /**
   * Handle keyboard selection
   * @param {React.KeyboardEvent} e keyboard event
   */
  const handleKeyboardSelection = (e: React.KeyboardEvent) => {
    setIsFilterActive(false);

    if (e.keyCode === 13) {
      if (moviesData[activeMovie]) {
        setSelectedMovie(moviesData[activeMovie].title);
      }
    } else if (e.keyCode === 38 && activeMovie > 0) {
      setActiveMovie(activeMovie - 1);

      //@ts-ignore
      document.querySelector('.movie--active').scrollIntoView(false);
    } else if (e.keyCode === 40 && activeMovie < moviesData.length - 1) {
      setActiveMovie(activeMovie + 1);

      //@ts-ignore
      document.querySelector('.movie--active').scrollIntoView(true);
    } else {
      return;
    }
  };

  return (
    <div
      className="search-wrapper"
      ref={searchRef}
    >
      <input
        className="search-input"
        type="text"
        placeholder="Search Movies ..."
        onFocus={() => setIsDropdownOpen(true)}
        onChange={handleMovieSearch}
        onKeyDown={handleKeyboardSelection}
        value={selectedMovie}
        disabled={isLoading}
        ref={searchInput}
      />
      {moviesData.length ? (
        <div
          className={`${isDropdownOpen ? '' : 'hidden'} dropdown-items-container`}
          onScroll={handleInfiniteScroll}
        >
          <ul>
            {moviesData.map((movie: Movie, i: number) => (
              <li
                className={`${i === activeMovie ? 'movie--active' : ''}`}
                onClick={() => handleMovieClick(movie)}
                key={`${movie.id}-${i}`}
                dangerouslySetInnerHTML={{ __html: movie.highlightedTitle || movie.title }}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
