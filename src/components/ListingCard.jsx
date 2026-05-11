import { useNavigate } from "react-router";
import { api } from "../api/api";

import outWishlist from "../imgs/ui/out-wishlist.svg";
import inWishlist from "../imgs/ui/in-wishlist.svg";

function ListingCard({
  imageUrl,
  listing,
  wishlistIds,
  setWishlistIds,
  wishlist,
  setWishlist,
}) {
  const navigate = useNavigate();

  function handleWishlist(e) {
    e.stopPropagation();

    if (wishlistIds.includes(listing.id)) {
      api.delete(`/wishlist/${listing.id}`);
      setWishlistIds((prev) => prev.filter((id) => id !== listing.id));

      if (wishlist) {
        setWishlist((prev) =>
          prev.filter((l) => l.id !== listing.id),
        );
      }
    } else {
      api.post(`/wishlist`, { listing_id: listing.id });
      setWishlistIds((prev) => [...prev, listing.id]);
    }
  }

  return (
    <article
      className="listing-card"
      onClick={() => navigate(`/listing/${listing.id}`)}
    >
      <div className="image-wrapper">
        {imageUrl && (
          <img src={imageUrl} alt={listing.title} className="listing-image" />
        )}

        <button className="wishlist-btn" onClick={(e) => handleWishlist(e)}>
          <img
            className="wishlist-icon"
            src={wishlistIds.includes(listing.id) ? inWishlist : outWishlist}
            alt=""
          />
        </button>
      </div>

      <div className="listing-content">
        <div className="listing-header">
          <div className="listing-info">
            <h3 className="listing-title">{listing.title}</h3>
            <p className="listing-location">{listing.city_name}</p>
          </div>

          {listing.avg_rating > 0 && (
            <div className="listing-rating">
              <span className="rating-star">⭐</span>
              <span className="rating-value">{listing.avg_rating}</span>
            </div>
          )}
        </div>

        <p className="listing-amenities">
          {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds}{" "}
          beds · {listing.bathrooms} baths
        </p>

        <div className="listing-price">
          <span className="price">${listing.weekday_price}</span>
          <span className="per-night"> / night</span>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
