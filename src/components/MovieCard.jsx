import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Movie Image */}
      <img
        src={movie.image}
        alt={movie.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-100">
          {movie.title}
        </h3>

        <Link
          to={`/booking/${movie.id}`}
          className="inline-block mt-3 w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 rounded transition"
        >
          Book Ticket
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;

