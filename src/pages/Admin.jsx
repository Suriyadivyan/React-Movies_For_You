import axios from "axios";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

const Admin = () => {
  //let navigate=useNavigate();
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:3000/movies");
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to load movies:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const addMovie = async () => {
    if (!title || !image) return;

    try {
      await axios.post("http://localhost:3000/movies", { title, image });
      setTitle("");
      setImage("");
      load();
    } catch (err) {
      console.error("Failed to add movie:", err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      load();
    } catch (err) {
      console.error("Failed to delete movie:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Admin – Manage Movies</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
            placeholder="Movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          onClick={addMovie}
          className="bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded text-white"
        >
          Add Movie
        </button>
      </div>

      <div className="bg-slate-500 border border-slate-700 rounded-lg">
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex justify-between items-center px-4 py-3 border-b border-slate-200 last:border-none"
            >
              <span>{movie.title}</span>

              <button
                onClick={() => deleteMovie(movie.id)}
                className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition text-white"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
