import React from 'react';
import LogoSearch from '../LogoSearch/LogoSearch';
import './ProfileSide.css';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
    
    <LogoSearch />
    <ProfileCard location="homePage"/>
    <FollowersCard/>
    </div>
  )
}

export default ProfileSide