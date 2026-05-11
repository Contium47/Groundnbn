import { useForm } from "react-hook-form";
import { api } from "../api/api";
import "./BookingPanel.css";
import { useState } from "react";

function BookingPanel({ currListing, isAuth }) {
  const {
    register,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const [error, setError] = useState(null);

  async function handleReserve(data) {
    if (!isAuth) {
      alert('Log in or sign up first!');
      return;
    }
    console.log(data);

    const normilizedData = {
      'check_in': data.checkIn,
      'check_out': data.checkOut,
      'listing_id': currListing.id,
    }
    try {
      const response = await api.post('/bookings', normilizedData);
      console.log(response.data)
      setError(null)
    } catch(err) {
      console.log(err.response.data.error)
      setError(err.response.data.error)
    }
  }

  return (
    <div className="booking">
      <div className="booking__price">
        <span className="booking__price-value">
          ${currListing.weekday_price || currListing.weekdayPrice}
        </span>
        <span className="booking__price-text"> / night</span>
      </div>

      <form onSubmit={handleSubmit(handleReserve)}>
        <div className="booking__dates">
          <div className="booking__fields">
            <div className="booking__field">
              <label className="booking__label">Check-in</label>
              <input
                type="date"
                className="booking__input"
                {...register("checkIn", { required: true })}
              />
            </div>

            <div className="booking__field">
              <label className="booking__label">Check-out</label>
              <input
                type="date"
                className="booking__input"
                {...register("checkOut", { required: true })}
              />
            </div>
          </div>
        </div>

        <button className="booking__button">
          Reserve
        </button>
        {error && <small>{error}</small>}
      </form>
    </div>
  );
}

export default BookingPanel;
