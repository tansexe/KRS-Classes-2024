import React from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  let user;

  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    user = null;
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
   
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    
    navigate('/signin');
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(user.name)}
      </div>
      <div>
        <p className="text-sm text-white font-medium">{user.name}</p>
        <button className="text-white underline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;