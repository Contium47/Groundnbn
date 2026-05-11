import { useEffect, useState } from "react";
import { api } from "../api/api";
import BookingRequestCard from "../components/BookingRequestCard";
import EmptyState from "../components/EmptyState";

function BookingRequests() {
    const [bookingRequests, setBookingRequests] = useState([]);

    useEffect(() => {
        async function fetchBookingRequests() {
            const response = await api.get('/bookings/owner');
            const pendingBookings = response.data.filter(booking => booking.status === 'pending')
            console.log(response.data);
            setBookingRequests(pendingBookings);
        }

        fetchBookingRequests()
    }, [])

  return (
    <div className="bookings">
      <div className="bookings-grid">
        {bookingRequests.length > 0 ? bookingRequests.map((listing) => {
          return (
            <BookingRequestCard
              key={listing.id}
              listing={listing}
              setBookingRequests={setBookingRequests}
            />
          );
        }) : <EmptyState message={'No reqs yet'}/>}
      </div>
    </div>
  );
}

export default BookingRequests;
