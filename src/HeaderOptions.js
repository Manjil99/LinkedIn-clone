import React from 'react';
import './HeaderOptions.css';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

const HeaderOptions = ({avatar , Icon , title}) => {
  const user = useSelector(selectUser);
  return (
    <div className="headerOptions">
        {Icon && <Icon className='headerOption__icon'/>}
        {avatar && <Avatar className='headerOption__icon'>{user?.email[0]}</Avatar> }
        <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOptions