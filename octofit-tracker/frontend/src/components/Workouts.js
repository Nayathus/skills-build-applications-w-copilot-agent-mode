import React, { useState, useEffect } from 'react';

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const endpoint = `${apiBaseUrl}/workouts/`;
        console.log('Fetching Workouts from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch workouts');
        
        const data = await response.json();
        console.log('Workouts API Response:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [apiBaseUrl]);

  if (loading) return <div className="alert alert-info"><span className="loading-spinner">⏳</span> Loading workouts...</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2>💪 Workouts</h2>
      {workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Workout Name</th>
                <th>Type</th>
                <th>Duration (mins)</th>
                <th>Intensity</th>
                <th>Calories Burned</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout.id}>
                  <td><strong>{workout.id}</strong></td>
                  <td>{workout.name || workout.workout_type || 'N/A'}</td>
                  <td>{workout.workout_type || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'}</td>
                  <td>
                    <span className={`badge bg-${getIntensityColor(workout.intensity)}`}>
                      {workout.intensity || 'N/A'}
                    </span>
                  </td>
                  <td>{workout.calories_burned || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function getIntensityColor(intensity) {
  switch(intensity?.toLowerCase()) {
    case 'low': return 'info';
    case 'medium': return 'warning';
    case 'high': return 'danger';
    default: return 'secondary';
  }
}

export default Workouts;
