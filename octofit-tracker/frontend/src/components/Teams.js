import React, { useState, useEffect } from 'react';

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const endpoint = `${apiBaseUrl}/teams/`;
        console.log('Fetching Teams from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch teams');
        
        const data = await response.json();
        console.log('Teams API Response:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, [apiBaseUrl]);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <div className="row">
        {teams.map(team => (
          <div key={team.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">Members: {team.member_count || team.members?.length || 0}</p>
                <p className="card-text">{team.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
