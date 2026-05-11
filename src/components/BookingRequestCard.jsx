import { useNavigate } from "react-router";

import './BookingRequestCard.css'
import { api } from "../api/api";

function BookingRequestCard({ listing, setBookingRequests }) {
  const navigate = useNavigate();
  const totalDays = Math.ceil(
    (new Date(listing.check_out) - new Date(listing.check_in)) /
      (1000 * 60 * 60 * 24),
  );

  async function confirmBooking(e) {
    e.stopPropagation()
    await api.patch(`/bookings/${listing.id}/confirm`);
    setBookingRequests(prev => prev.filter(b => b.id !== listing.id))
  }

  async function declineBooking(e) {
    e.stopPropagation()
    await api.patch(`/bookings/${listing.id}/reject`);
    setBookingRequests(prev => prev.filter(b => b.id !== listing.id))
  }

  return (
    <article
      className="listing-card"
      onClick={() => navigate(`/listing/${listing.listing.id}`)}
    >
      <div className="image-wrapper">
        <img
          className="listing-image"
          src={`http://localhost:5000${listing.listing.images[0]}`}
          alt=""
        />
      </div>

      <div className="listing-content">
        <h3 className="listing-title">{listing.listing.title}</h3>

        <p className="listing-location">{listing.listing.city_name}</p>

        <p className="listing-amenities">
          {listing.listing.guests} guests · {listing.listing.bedrooms} bedrooms
          · {listing.listing.beds} beds · {listing.listing.bathrooms} baths
        </p>

        <div className="booking-dates">
          <time>
            {new Date(listing.check_in).getDate()}{" "}
            {new Date(listing.check_in).toLocaleString("en-US", {
              month: "short",
            })}
          </time>
          <span> - </span>
          <time>
            {new Date(listing.check_out).getDate()}{" "}
            {new Date(listing.check_out).toLocaleString("en-US", {
              month: "short",
            })}
          </time>
          <span>
            {" "}
            ({totalDays} {totalDays === 1 ? "day" : "days"})
          </span>
        </div>

        <p className="booking-price">
          Total: ${+listing.total_price * totalDays}
        </p>

        <div className="booking-actions">
          <button className="confirm-btn" onClick={(e) => confirmBooking(e)}>
            Confirm
          </button>
          <button className="reject-btn" onClick={e => declineBooking(e)}>
            Decline
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookingRequestCard;
