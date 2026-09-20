import { useLocation, useNavigate } from "react-router";
import { api } from "../api/api";

import "./BecomeAHostFooter.css";

function BecomeAHostFooter({
  isStepValid,
  listing,
  setListing,
}) {
  const navigate = useNavigate();

  const steps = [
    "overview",
    "about-your-place",
    "structure",
    "privacy-type",
    "floor-plan",
    "stand-out",
    "photos",
    "title",
    "description",
    "finish-setup",
    "price",
    "weekend-price",
    "location",
    "preview",
  ];

  const location = useLocation();
  const currPage = location.pathname.split("/").pop();
  const currPageIndex = steps.indexOf(currPage);

  function onBack() {
    const prevPage = steps[currPageIndex - 1];
    navigate(prevPage);
  }

  async function onNext() {
    if (currPage === steps[steps.length - 1]) {
      const payload = {
        title: listing.title,
        description: listing.description,

        country_name: listing.location.country,
        city_name: listing.location.city,
        street: listing.location.street,
        iso2: listing.location.iso2,

        guests: listing.floorPlan.guests,
        bedrooms: listing.floorPlan.bedrooms,
        beds: listing.floorPlan.beds,
        bathrooms: listing.floorPlan.bathrooms,

        structure: listing.structure,
        privacy_type: listing.privacyType,

        weekday_price: listing.weekdayPrice,
        weekend_price: listing.weekendPrice,

        images: listing.images || [],
      };

      try {
        const response = await api.post("/listings", payload);

        console.log(response);

        navigate("/");

        setListing({
          structure: "Barn",
          privacyType: "An entire place",
          floorPlan: {
            guests: 1,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
          },
          photos: [],
          images: [],
          title: "",
          description: "",
          location: {
            country: "",
            city: "",
            street: "",
            iso2: "",
          },
          weekdayPrice: 8,
          weekendPrice: 2,
        });
      } catch (err) {
        console.error(err);
      }

      return;
    }

    const nextPage = steps[currPageIndex + 1];
    navigate(nextPage);
  }

  return (
    <footer className="bah-footer">
      <div className="bah-footer-inner">
        <button
          className="bah-btn bah-btn-secondary"
          disabled={currPageIndex === 0}
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bah-btn bah-btn-primary"
          disabled={!isStepValid}
          onClick={onNext}
        >
          {currPage === steps[steps.length - 1] ? "Create" : "Next"}
        </button>
      </div>
    </footer>
  );
}

export default BecomeAHostFooter;
