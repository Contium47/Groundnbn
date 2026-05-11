import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../api/api";

import ListingCard from "../components/ListingCard";
import FilterButton from "../components/FilterButton";
import FiltersPopup from "../components/FiltersPopup";

function CountryListingsPage({isFiltersOpen, setIsFiltersOpen, wishlistIds, setWishlistIds}) {
  const [countryListings, setCountryListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [countryName, setCountryName] = useState('');

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTypeOfPlace, setSelectedTypeOfPlace] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [floorPlan, setFloorPlan] = useState({bedrooms: 0, beds: 0, bathrooms: 0})

  const { iso2 } = useParams();
  console.log(iso2);
  console.log(floorPlan)

  useEffect(() => {
    async function fetchCountryListings() {
      const response = await api.get(`/listings/country/${iso2}`);
      console.log(response.data);
      const countryName = response.data[0].country_name;
      console.log(countryName)
      setCountryName(countryName)
      setCountryListings(response.data);
      setFilteredListings(response.data);
    }
    fetchCountryListings();
  }, []);

  return (
    <div className="bookings">
        <div className="bookings-header">
            <h2 className="bookings-title">Accommodations in {countryName}</h2>
            <FilterButton isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />
            <FiltersPopup 
              isFiltersOpen={isFiltersOpen} 
              setIsFiltersOpen={setIsFiltersOpen} 
              countryListings={countryListings} 
              setFilteredListings={setFilteredListings}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedTypeOfPlace={selectedTypeOfPlace}
              setSelectedTypeOfPlace={setSelectedTypeOfPlace}
              selectedMinPrice={selectedMinPrice}
              setSelectedMinPrice={setSelectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              setSelectedMaxPrice={setSelectedMaxPrice}
              selectedPropertyTypes={selectedPropertyTypes}
              setSelectedPropertyTypes={setSelectedPropertyTypes}
              floorPlan={floorPlan}
              setFloorPlan={setFloorPlan}
            />
        </div>
      <div className="bookings-grid">
        {filteredListings.map((listing) => {
          const imageUrl = listing.images[0]
            ? `http://localhost:5000${listing.images[0]}`
            : null;
          return (
            <ListingCard
              key={listing.id}
              listing={listing}
              imageUrl={imageUrl}
              wishlistIds={wishlistIds} 
              setWishlistIds={setWishlistIds}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CountryListingsPage;
