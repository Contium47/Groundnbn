import { useNavigate } from 'react-router';
import { api } from '../api/api';

import './UserListingCard.css'

function UserListingCard({userListing, setUserListings}) {
    const navigate = useNavigate();

    async function deleteListing(e) {
        e.preventDefault()
        e.stopPropagation()
        await api.delete(`listings/${userListing.id}`);
        setUserListings(prev => prev.filter(listing => listing.id !== userListing.id))
    }

    return (
    <article className="listing-card" onClick={() => navigate(`/listing/${userListing.id}`)} >
      
        <img src={`http://localhost:5000${userListing.images[0]}`} alt={userListing.title} className="listing-image" />
      

      <div className="listing-content">
        <h3 className="listing-title">{userListing.title}</h3>

        <p className="listing-location">{userListing.city_name}, {userListing.country_name}</p>

        <p className="listing-amenities">
          {userListing.guests} guests · {userListing.bedrooms} bedrooms · {userListing.beds}{" "}
          beds · {userListing.bathrooms} baths
        </p>

        <div className="listing-price">
          <span className="price">${userListing.weekday_price}</span>
          <span className="per-night"> / night</span>
        </div>
      </div>

      <div className="user-listing-actions">
        <button className="delete-listing-btn" onClick={e => deleteListing(e)}>Delete listing</button>
      </div>
    </article>
  );
}

export default UserListingCard;