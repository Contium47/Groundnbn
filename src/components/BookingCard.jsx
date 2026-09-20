import { useNavigate } from "react-router";
import './BookingCard.css'
import { api } from "../api/api";

import { BACKEND_URL } from "../api/api";

function BookingCard({ bookingInfo, setBookingsInfo }) {
    const navigate = useNavigate();

    async function deleteReservation(e) {
        e.preventDefault()
        e.stopPropagation()
        const response = await api.delete(`/bookings/${bookingInfo.id}`);
        console.log(response.data)
        setBookingsInfo(prev => prev.filter(booking => booking.id !== bookingInfo.id ))
    }

    const totalDays = Math.ceil((new Date(bookingInfo.check_out) - new Date(bookingInfo.check_in)) / (1000 * 60 * 60 * 24));
    return (
        <article className="booking-card" onClick={() => navigate(`/listing/${bookingInfo.listing.id}`)} >
      {/* {imageUrl && (
        <img src={imageUrl} alt={listing.title} className="listing-image" />
      )} */}

      <img className="booking-image" src={`${BACKEND_URL}${bookingInfo.listing.images[0]}`} alt="" />

      <div className="booking-content">
        <h3 className="booking-title">{bookingInfo.listing.title}</h3>

        <p className="booking-location">{bookingInfo.listing.city_name}</p>

        <p className="booking-amenities">
          {bookingInfo.listing.guests} guests · {bookingInfo.listing.bedrooms} bedrooms · {bookingInfo.listing.beds}{" "}
          beds · {bookingInfo.listing.bathrooms} baths
        </p>

        <div className="booking-dates">
          <time>{new Date(bookingInfo.check_in).getDate()} {new Date(bookingInfo.check_in).toLocaleString('en-US', { month: 'short' })}</time>
          <span> - </span>
          <time>{new Date(bookingInfo.check_out).getDate()} {new Date(bookingInfo.check_out).toLocaleString('en-US', { month: 'short' })}</time>
          <span> ({totalDays} {totalDays === 1 ? 'day' : 'days'})</span>
        </div>

        <div>
            <p>Total amount: ${+(bookingInfo.total_price) * totalDays}</p>
        </div>
      </div>

      <button onClick={(e) => deleteReservation(e)}>Cancel reservation</button>
    </article>
    )
}

export default BookingCard;