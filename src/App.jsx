import { useState, useEffect } from "react";
import axios from "axios";

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  }

  const getAllMovies = () => {
    setLoading(true);
    axios.get(APIURL)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const getSearchedMovies = () => {
    setLoading(true);
    axios.get(SEARCHAPI + search)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
  }, [search]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex justify-center mb-8">
          <input
            type="search"
            placeholder="Search for movies..."
            value={search}
            onChange={changeTheSearch}
            className="w-3/4 sm:w-1/2 lg:w-1/3 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>

        {loading ? (
          <div className="text-3xl text-center mt-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.length === 0 ? (
              <div className="text-3xl text-center mt-10">No results found</div>
            ) : (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform transform hover:scale-105"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.release_date}</p>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-60 transition-all duration-300"></div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
