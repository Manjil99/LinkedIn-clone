import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import HeaderOptions from './HeaderOptions';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { logout } from './features/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="header">
        <div className="header__left">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedin-icon" />

            <div className="header__search">
                <SearchIcon />
                <input type="text" placeholder='Search'/>
      
            </div>
        </div>

        <div className="header__right">
          <HeaderOptions  Icon={HomeIcon} title="Home" />
          <HeaderOptions  Icon={SupervisorAccountIcon} title="My Network" />
          <HeaderOptions  Icon={BusinessCenterIcon} title="Jobs" />
          <HeaderOptions  Icon={ChatIcon} title="Messaging" />
          <HeaderOptions  Icon={NotificationsIcon} title="Notification" />
          <div onClick={logoutOfApp}><HeaderOptions   avatar={true} title="me" /></div>
        </div>
    </div>
  )
}

export default Header