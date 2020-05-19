import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Profile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get('/api/profile');
        console.log('data', data);
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (profile){
      
    } console.log('profile', profile);
  }, [profile]);

  return (
    <div>
      <h1>Profile</h1>
      <h3>{profile && profile.name}</h3>
    </div>
  );
};

export default Profile;
