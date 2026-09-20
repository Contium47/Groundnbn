import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../api/api";

import { BACKEND_URL } from "../api/api";

import BookingPanel from "./BookingPanel";
import ListingReviews from "./ListingReviews";

import "./ListingPage.css";

function ListingPage({ isAuth }) {
  const { id } = useParams();
  const [serverListing, setServerListing] = useState(null);
  const [reviews, setReviews] = useState([]);

  const outlet = useOutletContext();

  useEffect(() => {
    if (id) {
      async function fetchListing() {
        const response = await api.get(`/listings/${id}`);
        setServerListing(response.data);
      }

      async function fetchListingReviews() {
        const response = await api.get(`/reviews/${id}`)
        setReviews(response.data)
      }
      fetchListing();
      fetchListingReviews();
    } else {
      outlet.setIsStepValid(true);
    }
  }, []);

  const currListing = id ? serverListing : outlet.listing;
  
  if (!currListing) return <div>Loading..</div>;
  

  const floorPlan = currListing.floorPlan || {
    guests: currListing.guests,
    bedrooms: currListing.bedrooms,
    beds: currListing.beds,
    bathrooms: currListing.bathrooms,
  };

  return (
    <div className="listing">
      <div className="listing__header">
        <h1 className="listing__title">{currListing.title}</h1>
      </div>

      <div className="listing__photos">
        {currListing.images.map((image, index) => (
          <img
            key={index}
            className="listing__photo"
            src={`${BACKEND_URL}${image}`}
            alt="listing"
          />
        ))}
      </div>

      <div className="listing__main">
        <div className="listing__left">
          <div className="listing__info">
            <h2 className="listing__location">
              {currListing.structure} in{" "}
              {currListing.city_name || currListing.location.city},{" "}
              {currListing.country_name || currListing.location.country}
            </h2>

            <ul className="listing__features">
              {Object.entries(floorPlan).map(([type, qty], index) => (
                <li className="listing__feature" key={type}>
                  {qty} {type}
                  {index < Object.entries(floorPlan).length - 1 && (
                    <span className="listing__dot">·</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="listing__description">
            <p>{currListing.description}</p>
          </div>
        </div>

        <div className={`listing__right ${id ? "" : "disabled"}`}>
          {id && <BookingPanel currListing={currListing} isAuth={isAuth} />}
        </div>
      </div>

      <div className={`listing__extra ${id ? '' : 'reviews__form--hidden'}`}>
        <ListingReviews id={id} isAuth={isAuth} reviews={reviews} setReviews={setReviews} />
      </div>
    </div>
  );
}

export default ListingPage;