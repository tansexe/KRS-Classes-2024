import React from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) {
    return null; // or you can render a loading state or an empty component
  }

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Assuming you have a token stored as well

    // Navigate to the sign-in page
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