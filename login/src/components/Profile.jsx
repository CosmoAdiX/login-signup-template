import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [flag, setFlag] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          credentials: 'include', // Include cookies
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFlag(data.flag);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setFlag("Unauthorized access, please login first");
      }
    }

    fetchData();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h1>{flag}</h1>
    </div>
  );
};

export default Profile;