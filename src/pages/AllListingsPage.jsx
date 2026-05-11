import { useEffect, useState } from "react";
import { api } from "../api/api";

import UserListingCard from "../components/UserListingCard";

import './AllListingsPage.css'

function AllListingsPage() {
    const [listings, setUserListings] = useState([]);

    useEffect(() => {
        async function fetchListings() {
            const response = await api.get('/listings')
            console.log(response.data)
            setUserListings(response.data)
        }

        fetchListings()
    }, [])
    return (
        <div className="admin-listings">
        {listings.map(userListing => <UserListingCard key={userListing.id} userListing={userListing} setUserListings={setUserListings} />)}
        </div>
    )
}

export default AllListingsPage;