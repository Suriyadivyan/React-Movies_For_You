import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const seatsLayout = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Load movie details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Seat toggle logic
  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  // Confirm booking
  const confirmBooking = async () => {
    if (selectedSeats.length === 0) return;

    await axios.post("http://localhost:3000/bookings", {
      movieId: id,
      seats: selectedSeats,
    });

    alert("Booking successful!");
    navigate("/");
  };

  if (!movie) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-2">
        Book Tickets
      </h2>
      <p className="text-slate-800 mb-6">{movie.title}</p>

      {/* Seat Selection */}
      <div className="bg-slate-500 border border-slate-700 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Select Seats</h3>

        <div className="grid grid-cols-4 gap-4 justify-center max-w-xs mx-auto">
          {seatsLayout.map((seat) => (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`py-2 rounded text-sm font-medium transition
                ${
                  selectedSeats.includes(seat)
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-700 hover:bg-slate-600"
                }
              `}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-between items-center">
        <p className="text-slate-800">
          Selected Seats:{" "}
          <span className="text-white font-medium">
            {selectedSeats.join(", ") || "None"}
          </span>
        </p>

        <button
          onClick={confirmBooking}
          disabled={selectedSeats.length === 0}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 px-6 py-2 rounded text-white transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
