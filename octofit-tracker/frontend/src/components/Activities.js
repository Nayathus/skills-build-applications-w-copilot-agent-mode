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

  if (loading) return <div className="alert alert-info"><span className="loading-spinner">⏳</span> Loading activities...</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2>🏃 Activities</h2>
      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Activity Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td><strong>{activity.id}</strong></td>
                  <td>{activity.name || activity.activity_type || 'N/A'}</td>
                  <td>{activity.description || 'N/A'}</td>
                  <td>{activity.date || activity.created_at || 'N/A'}</td>
                  <td>{activity.duration || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
