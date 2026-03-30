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

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name || workout.workout_type}</h5>
                <p className="card-text">Duration: {workout.duration} mins</p>
                <p className="card-text">Intensity: {workout.intensity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
