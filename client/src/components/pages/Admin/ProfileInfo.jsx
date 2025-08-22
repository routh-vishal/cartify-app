import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div className="profile-card">
      <img
        src={userInfo.profileImg || "https://via.placeholder.com/250"}
        alt="Profile"
        className="profile-image"
      />
      <h2 className="profile-name">{userInfo.username}</h2>
      <p className="profile-email">Email: {userInfo.email}</p>
    </div>
  );
};

export default ProfileInfo;
