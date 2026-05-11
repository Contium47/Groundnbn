import { useEffect, useState } from "react";
import { api } from "../api/api";

import UserListingCard from "../components/UserListingCard";
import EmptyState from "../components/EmptyState";

function PublishedListings() {
    const [userListings, setUserListings] = useState([]);

      useEffect(() => {
    async function fetchMyListings() {
      try {
        const response = await api.get("/listings/my");
        console.log(response.data);
        setUserListings(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMyListings();
  }, []);
    
    return (
        <div className="bookings-grid">
        {userListings.length > 0 ? (
          userListings.map((userListing) => (
            <UserListingCard
              key={userListing.id}
              userListing={userListing}
              setUserListings={setUserListings}
            />
          ))
        ) : (
          <EmptyState message={"No listings yet"} />
        )}
      </div>
    )
}

export default PublishedListings;