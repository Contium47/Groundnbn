import { Routes, Route } from "react-router";

import ListingsPage from "./pages/ListingsPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AuthChoicePage from "./pages/auth/AuthChoicePage";
import BecomeAHostPage from "./pages/BecomeAHostPage";
import ListingPage from "./components/ListingPage";
import UserListingsPage from "./pages/UserListingsPage";
import BookingRequests from "./pages/BookingRequests";
import PublishedListings from "./pages/PublishedListings";
import BookingsPage from "./pages/BookingsPage";
import WishlistPage from "./pages/WishlistPage";
import AllUsersPage from "./pages/AllUsersPage";
import AllListingsPage from "./pages/AllListingsPage";
import CountryListingsPage from "./pages/CountryListingsPage";

import Overview from "./pages/create-listing/Overview";

import AboutYourPlace from "./pages/create-listing/first-step/AboutYourPlace";
import StructureStep from "./pages/create-listing/first-step/StructureStep";
import PrivacyTypeStep from "./pages/create-listing/first-step/PrivacyTypeStep";
import FloorPlanStep from "./pages/create-listing/first-step/FloorPlanStep";

import StandOut from "./pages/create-listing/second-step/StandOut";
import PhotosStep from "./pages/create-listing/second-step/PhotosStep";
import TitleStep from "./pages/create-listing/second-step/TitleStep";
import DescriptionStep from "./pages/create-listing/second-step/DescriptionStep";

import FinishSetup from "./pages/create-listing/third-step/FinishSetup";
import WeekdayPriceStep from "./pages/create-listing/third-step/WeekdayPriceStep";
import WeekendPriceStep from "./pages/create-listing/third-step/WeekendPriceStep";
import LocationStep from "./pages/create-listing/third-step/LocationStep";

import MainLayout from "./layouts/MainLayout";
import WizardLayout from "./layouts/WizardLayout";

import ProtectedRoutes from "./protect/ProtectedRoutes";
import ProtectedAdmin from "./protect/ProtectedAdmin";

import "./App.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { api } from "./api/api";
import AdminPanelPage from "./pages/AdminPanelPage";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [listing, setListing] = useState(() => {
    const saved = localStorage.getItem("listing");
    return saved
      ? JSON.parse(saved)
      : {
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
        };
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [userInfo, setUserInfo] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );

  const isAdmin = userInfo?.role === "admin";
  // const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchWishlistIds() {
      const response = await api.get("/wishlist/ids");
      console.log(response.data);
      setWishlistIds(response.data);
    }

    if (isAuth) {
      fetchWishlistIds();
    }
  }, [isAuth]);

  useEffect(() => {
    const listingToSave = {
      ...listing,
      photos: [],
    };

    localStorage.setItem("listing", JSON.stringify(listingToSave));
  }, [listing]);

  return (
    <>
      <Routes>
        <Route
          element={
            <MainLayout
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              isUserMenuOpen={isUserMenuOpen}
              setIsUserMenuOpen={setIsUserMenuOpen}
              isAdmin={isAdmin}
            />
          }
        >
          <Route
            path="/"
            element={
              <ListingsPage
                isAuth={isAuth}
                wishlistIds={wishlistIds}
                setWishlistIds={setWishlistIds}
              />
            }
          />
          <Route
            path="/listing/:id"
            element={<ListingPage isAuth={isAuth} />}
          />
          <Route
            path="/country/:iso2"
            element={
              <CountryListingsPage
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen}
                wishlistIds={wishlistIds}
                setWishlistIds={setWishlistIds}
              />
            }
          />
          <Route path="/auth">
            <Route index element={<AuthChoicePage />} />
            <Route
              path="login"
              element={<LoginPage setUserInfo={setUserInfo} />}
            />
            <Route
              path="signup"
              element={<SignupPage setUserInfo={setUserInfo} />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedAdmin isAuth={isAuth} isAdmin={isAdmin} />}>
          <Route
            element={
              <MainLayout
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                isUserMenuOpen={isUserMenuOpen}
                setIsUserMenuOpen={setIsUserMenuOpen}
                isAdmin={isAdmin}
              />
            }
          >
            <Route path="/admin-panel" element={<AdminPanelPage />}>
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<AllUsersPage />} />
              <Route path="listings" element={<AllListingsPage />} />
            </Route>
          </Route>
        </Route>

        <Route
          element={<ProtectedRoutes isAuth={isAuth} setIsAuth={setIsAuth} />}
        >
          <Route
            element={
              <MainLayout
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                isUserMenuOpen={isUserMenuOpen}
                setIsUserMenuOpen={setIsUserMenuOpen}
                isAdmin={isAdmin}
              />
            }
          >
            <Route path="/my-listings" element={<UserListingsPage />}>
              <Route index element={<PublishedListings />} />
              <Route path="requests" element={<BookingRequests />} />
            </Route>
            <Route path="/bookings" element={<BookingsPage />} />
            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  wishlistIds={wishlistIds}
                  setWishlistIds={setWishlistIds}
                />
              }
            />
          </Route>
          <Route path="/become-a-host">
            <Route
              index
              element={
                <BecomeAHostPage
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  isUserMenuOpen={isUserMenuOpen}
                  setIsUserMenuOpen={setIsUserMenuOpen}
                />
              }
            />
            <Route
              element={
                <WizardLayout listing={listing} setListing={setListing} />
              }
            >
              <Route path="overview" element={<Overview />} />
              <Route path="about-your-place" element={<AboutYourPlace />} />
              <Route path="structure" element={<StructureStep />} />
              <Route path="privacy-type" element={<PrivacyTypeStep />} />
              <Route path="floor-plan" element={<FloorPlanStep />} />
              <Route path="stand-out" element={<StandOut />} />
              <Route path="photos" element={<PhotosStep />} />
              <Route path="title" element={<TitleStep />} />
              <Route path="description" element={<DescriptionStep />} />
              <Route path="finish-setup" element={<FinishSetup />} />
              <Route path="price" element={<WeekdayPriceStep />} />
              <Route path="weekend-price" element={<WeekendPriceStep />} />
              <Route path="location" element={<LocationStep />} />
              <Route path="preview" element={<ListingPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
