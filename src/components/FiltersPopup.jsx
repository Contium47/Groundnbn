import "./FiltersPopup.css";

import RoomsAndBedsFilter from "./RoomsAndBedsFilter";

function FiltersPopup({isFiltersOpen, setIsFiltersOpen, countryListings, setFilteredListings, selectedCity, setSelectedCity, selectedTypeOfPlace, setSelectedTypeOfPlace, selectedMinPrice, setSelectedMinPrice, selectedMaxPrice, setSelectedMaxPrice, selectedPropertyTypes, setSelectedPropertyTypes, floorPlan, setFloorPlan}) {
  if (!isFiltersOpen) return null;


  const typesOfPlace = [
    ...new Set(countryListings.map((listing) => listing.privacy_type)),
  ];
  const propertyTypes = [
    ...new Set(countryListings.map((listing) => listing.structure)),
  ];
  const cities = [
    ...new Set(countryListings.map((listing) => listing.city_name)),
  ];
  const basics = ["Bedrooms", "Beds", "Bathrooms"];

  console.log(countryListings);

  function applyFilters() {
    let filtered = countryListings;

    if (selectedCity) {
      filtered = filtered.filter(listing => listing.city_name === selectedCity);
    }
    
    if (selectedTypeOfPlace) {
      filtered = filtered.filter(listing => listing.privacy_type === selectedTypeOfPlace);
    }
    
    if (selectedMinPrice) {
      filtered = filtered.filter(listing => listing.current_price > +selectedMinPrice);
    }
    
    if (selectedMaxPrice) {
      filtered = filtered.filter(listing => listing.current_price <= +selectedMaxPrice);
    }
    
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter(listing => selectedPropertyTypes.includes(listing.structure));
    }
    
    if (floorPlan['bedrooms'] > 0) {
      filtered = filtered.filter(listing => listing.bedrooms >= floorPlan['bedrooms'])
    }

    if (floorPlan['beds'] > 0) {
      filtered = filtered.filter(listing => listing.beds >= floorPlan['beds'])
    }

    if (floorPlan['bathrooms'] > 0) {
      filtered = filtered.filter(listing => listing.bathrooms >= floorPlan['bathrooms'])
    }

    setFilteredListings(filtered)
    setIsFiltersOpen(false)
  }

  return (
    <div className="filters">
      <div className="filters__overlay"></div>

      <div className="filters__container">
        <div className="filters__header">
          <h2 className="filters__title">Filters</h2>
          <button
            className="filters__close"
            onClick={() => setIsFiltersOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="filters__section">
          <h3 className="filters__subtitle">City</h3>

          <select className="filters__select" onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
            <option value="">Any</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__section">
          <h3 className="filters__subtitle">Type of place</h3>

          <div className="filters__options">
            <button className={`filters__option  ${selectedTypeOfPlace === '' ? 'filters__option--active' : ''}`} onClick={() => setSelectedTypeOfPlace('')}>
              Any
            </button>

            {typesOfPlace.map((type, index) => (
              <button key={index} className={`filters__option ${selectedTypeOfPlace === type ? 'filters__option--active' : ''}`} onClick={() => setSelectedTypeOfPlace(type)}>
                {type === "An entire place"
                  ? "Home"
                  : type === "A room"
                    ? "Room"
                    : "Hotel"}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__section">
          <h3 className="filters__subtitle">Price range</h3>

          <div className="filters__inputs">
            <input
              type="number"
              placeholder="Minimum"
              className="filters__input"
              onChange={e => setSelectedMinPrice(e.target.value)}
              value={selectedMinPrice}
              />
            <input
              type="number"
              placeholder="Maximum"
              className="filters__input"
              onChange={e => setSelectedMaxPrice(e.target.value)}
              value={selectedMaxPrice}
            />
          </div>
        </div>

        <div className="filters__section">
          <h3 className="filters__subtitle">Rooms and beds</h3>

          <div className="filters__options">
              <RoomsAndBedsFilter floorPlan={floorPlan} setFloorPlan={setFloorPlan} basics={basics} />
          </div>
        </div>

        <div className="filters__section">
          <h3 className="filters__subtitle">Property type</h3>

          <div className="filters__options">
            {propertyTypes.map((type, index) => (
              <button 
                key={index} 
                className={`filters__option ${selectedPropertyTypes.includes(type) ? 'filters__option--active' : ''}`}
                onClick={() => setSelectedPropertyTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}>
                {type === "Flat/apartment" ? "Flat" : type}
              </button>
            ))}
          </div>
        </div>

        <div className="filters__footer">
          <button className="filters__apply" onClick={applyFilters}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default FiltersPopup;
