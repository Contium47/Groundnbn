import { useEffect, useState } from "react";
import { api } from "../api/api";

import UserCard from "../components/UserCard";

function AllUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const response = await api.get('/users');
            console.log(response.data)
            setUsers(response.data)
        }

        fetchUsers()
    }, [])
    return (
        <div>
        {users.map(user => <UserCard key={user.id} user={user} setUsers={setUsers} />)}
        </div>
    )
}

export default AllUsersPage;