import React, { useState, useEffect } from 'react';

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const endpoint = `${apiBaseUrl}/activities/`;
        console.log('Fetching Activities from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch activities');
        
        const data = await response.json();
        console.log('Activities API Response:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [apiBaseUrl]);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.name || activity.activity_type}</td>
              <td>{activity.description}</td>
              <td>{activity.date || activity.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
