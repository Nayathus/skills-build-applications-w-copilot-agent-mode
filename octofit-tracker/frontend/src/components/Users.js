import React, { useState, useEffect } from 'react';

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const endpoint = `${apiBaseUrl}/users/`;
        console.log('Fetching Users from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const data = await response.json();
        console.log('Users API Response:', data);
        
        // Handle both paginated and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiBaseUrl]);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.username || user.name}</h5>
                <p className="card-text">Email: {user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
