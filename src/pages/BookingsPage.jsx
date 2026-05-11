import { useEffect, useState } from "react";
import { api } from "../api/api";

import BookingCard from "../components/BookingCard";
import EmptyState from "../components/EmptyState";

import "./BookingsPage.css";

function BookingsPage() {
  const [bookingsInfo, setBookingsInfo] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await api.get("/bookings/my");
        console.log(response.data);
        setBookingsInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBookings();
  }, []);

  const groupedByStatus = {};
  bookingsInfo.forEach((bookingInfo) => {
    if (!groupedByStatus[bookingInfo.status]) {
      groupedByStatus[bookingInfo.status] = [];
    }

    groupedByStatus[bookingInfo.status].push(bookingInfo);
  });
  console.log(Object.entries(groupedByStatus));

  return (
    <div className="bookings">
      <h2 className="bookings-title">Your bookings</h2>
      <div className="bookings-wrapper">
        {bookingsInfo.length > 0 ?
            Object.entries(groupedByStatus).map(([status, bookings]) => {
                return (
                    <div className="booking-group" key={status}>
                        <h2 className="booking-group-title">{status}</h2>

                        <div className="bookings-grid">
                            {bookings.map(bookingInfo => {
                                return (
                                    <BookingCard key={bookingInfo.id} bookingInfo={bookingInfo} />
                                )
                            })}
                        </div>
                    </div>
                )
            }) : <EmptyState message={'No bookings yet'} />
        }
      </div>
    </div>
  );
}

export default BookingsPage;
