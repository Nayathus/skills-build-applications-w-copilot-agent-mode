import React, { useState, useEffect } from 'react';

function Leaderboard({ apiBaseUrl }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const endpoint = `${apiBaseUrl}/leaderboard/`;
        console.log('Fetching Leaderboard from:', endpoint);
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        
        const data = await response.json();
        console.log('Leaderboard API Response:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [apiBaseUrl]);

  const getRankMedal = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  if (loading) return <div className="alert alert-info"><span className="loading-spinner">⏳</span> Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning">No leaderboard data found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{width: '80px'}}>Rank</th>
                <th>Username</th>
                <th>Team</th>
                <th style={{textAlign: 'right'}}>Points</th>
                <th style={{textAlign: 'center', width: '120px'}}>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index} style={{
                  backgroundColor: index === 0 ? '#fff3cd' : index === 1 ? '#e8e8e8' : index === 2 ? '#fce4c8' : 'transparent'
                }}>
                  <td>
                    <span style={{fontSize: '1.5rem'}}>
                      {getRankMedal(index)}
                    </span>
                  </td>
                  <td>
                    <strong>{entry.username || entry.user_name || entry.name || 'N/A'}</strong>
                  </td>
                  <td>{entry.team_name || entry.team || 'N/A'}</td>
                  <td style={{textAlign: 'right'}}>
                    <strong className="text-primary" style={{fontSize: '1.1rem'}}>
                      {entry.points || entry.score || 0}
                    </strong>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <span className="badge bg-success">
                      {entry.activity_count || entry.activities || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
