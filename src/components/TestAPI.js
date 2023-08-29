import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios.get('https://oneshot-ai-backend.onrender.com/get-user')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('An error occurred:', error);
        setLoading(false);
      });
  };

  const postData = () => {
    const obj = {name:"abc",age:123};

    axios.post('https://oneshot-ai-backend.onrender.com/post-user', obj)
      .then(response => {
        console.log('Post request successful:', response.data);
        fetchData(); // Fetch data again after successful post
      })
      .catch(error => {
        console.error('An error occurred during post request:', error);
      });
  };

  useEffect(() => {
    fetchData();

    return () => {
      // Implement any necessary cleanup
    };
  }, []);

  return (
    <div>
      <button onClick={postData}>Post User</button>
      {loading ? (
        <p>Loading data...</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
