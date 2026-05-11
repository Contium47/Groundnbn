import { useLocation, useNavigate } from "react-router";
import { api } from "../api/api";

import "./BecomeAHostFooter.css";

function BecomeAHostFooter({
  isStepValid,
  setIsStepValid,
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
      const formData = new FormData();

      formData.append("title", listing.title);
      formData.append("description", listing.description);

      formData.append("country_name", listing.location.country);
      formData.append("city_name", listing.location.city);
      formData.append("street", listing.location.street);
      formData.append("iso2", listing.location.iso2);

      formData.append("guests", listing.floorPlan.guests);
      formData.append("bedrooms", listing.floorPlan.bedrooms);
      formData.append("beds", listing.floorPlan.beds);
      formData.append("bathrooms", listing.floorPlan.bathrooms);

      formData.append("structure", listing.structure);
      formData.append("privacy_type", listing.privacyType);

      formData.append("weekday_price", listing.weekdayPrice);
      formData.append("weekend_price", listing.weekendPrice);

      formData.append('images', JSON.stringify(listing.images || []))

      const response = await api.post("/listings", formData);
      console.log(response);

      navigate('/')

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
          iso2: '',
        },
        weekdayPrice: 8,
        weekendPrice: 2,
      });
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