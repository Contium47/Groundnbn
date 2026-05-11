import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/ListingCard";
import { api } from "../api/api";

function WishlistPage({wishlistIds, setWishlistIds}) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      const response = await api.get("/wishlist/my");
      setWishlist(response.data);
    }

    fetchWishlist();
  }, []);

  return (
    <div className="bookings">
      <h2 className="bookings-title">Your wishlist</h2>
      <div className="bookings-grid">
        {wishlist.length > 0 ? (
          wishlist.map((listing) => {
            const imageUrl = `http://localhost:5000${listing.images[0]}`;
            return (
              <ListingCard
                key={listing.id}
                listing={listing}
                imageUrl={imageUrl}
                wishlistIds={wishlistIds}
                setWishlistIds={setWishlistIds}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            );
          })
        ) : (
          <EmptyState message={"No ads in wishlist"} />
        )}
      </div>
    </div>
  );
}

export default WishlistPage;