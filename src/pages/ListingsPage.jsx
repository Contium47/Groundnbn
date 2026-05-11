import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListingCard from "../components/ListingCard";

import { api } from "../api/api";
import "./ListingsPage.css";

function ListingsPage({isAuth, wishlistIds, setWishlistIds}) {
  const [listings, setListings] = useState([]);
  const [groupedListings, setGroupedListings] = useState([]);

  const navigate = useNavigate();

  async function fetchISO2Country(country) {
    const response = await api.post('https://countriesnow.space/api/v0.1/countries/iso', {
      'country': country,
    })
    const iso2 = (response.data.data.Iso2).toLowerCase()

    navigate(`/country/${iso2}`)
  }

  useEffect(() => {
    const grouped = {};

    listings.forEach((listing) => {
      if (!grouped[listing.country_name]) {
        grouped[listing.country_name] = [];
      }

        grouped[listing.country_name].push(listing);
    });

    setGroupedListings(Object.entries(grouped));
  }, [listings]);

  useEffect(() => {
    api.get("/listings").then((response) => {
      console.log(response.data);
      setListings(response.data);
    });
  }, []);

  return (
    <main className="listings">
      {groupedListings.map(([country, listings]) => (
        <div key={country} className="city-group">
          <div className="city-header">
            <h2 className="city-title">{country}</h2>
            {listings.length > 4 && <button className="show-all-btn" onClick={() => fetchISO2Country(country)}>Show all</button>}
          </div>

          <div className="listings-grid">
            {listings.slice(0, 4).map((listing) => {
              const imageUrl = listing.images?.[0] ? `http://localhost:5000${listing.images[0]}` : null;

              return (
                <ListingCard key={listing.id} imageUrl={imageUrl} listing={listing} wishlistIds={wishlistIds} setWishlistIds={setWishlistIds} />
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}

export default ListingsPage;