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

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
            <th>Activities</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.id || index}>
              <td><strong>#{index + 1}</strong></td>
              <td>{entry.username || entry.user_name || entry.name}</td>
              <td>{entry.team_name || entry.team}</td>
              <td><strong>{entry.points || entry.score}</strong></td>
              <td>{entry.activity_count || entry.activities || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
