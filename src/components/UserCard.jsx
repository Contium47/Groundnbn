import { api } from '../api/api';
import './UserCard.css'

function UserCard({ user, setUsers }) {
  async function deleteUser() {
    await api.delete(`/users/${user.id}`);
    setUsers(prev => prev.filter(userInfo => userInfo.id !== user.id))
  }
  
  return (
    <article className="user-card">
      <div className="user-card__info">
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number}</p>
        <p>Role: {user.role}</p>
      </div>

      <div className="user-card__actions">
        <button className="btn-delete" disabled={user.role === 'admin'} onClick={deleteUser}>
          Ban
        </button>
      </div>
    </article>
  );
}

export default UserCard;
