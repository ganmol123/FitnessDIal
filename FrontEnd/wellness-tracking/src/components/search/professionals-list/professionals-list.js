import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import './professionals-list.scss';
import store from '../../../store';
import { Box, Drawer } from '@mui/material';
import { Profile } from './profile/profile';
export function ProfessionalsList({ professionalsData }) {
    const [showpProfile, setShowProfile] = useState(false);
    const [professionalData, setProfessionalData] = useState();
    const [id, setId] = useState();
    const isCustomer = store.getState().userDetails.ser_type==='Customer';
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setShowProfile(false);

    };
    const ListElement = ({ data, id }) => {
        return (<><ListItem style={{ display: 'flex', alignItems: 'center' }} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={data?.name?.toUpperCase()} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <div className="list-item-container">
                <div className="professional-name" style={{width:200}}>{data?.name}</div>
                <div className="icons">
                    <div className='view-profile' onClick={() => {setShowProfile(true); setId(id)}}>View Profile</div>
                    { isCustomer &&  <div className='chat'> <ChatIcon color='primary' style={{cursor:"pointer"}}/></div>}
    
                </div>
            </div>
        </ListItem>
            <Divider variant="inset" component="li" style={{ marginLeft: '5px' }} /></>)
    }
    return (
        <div className='list-container'>
            <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                {professionalsData.map(prof => <ListElement data={prof.professional_info} id={prof._id} key={prof._id} />)}
            </List>
            <Drawer
                anchor="right"
                open={showpProfile}
                onClose={toggleDrawer('right', false)}
            >
                <Box
                    sx={{ width: 800 }}
                    role="presentation"
                    onClick={toggleDrawer('right', false)}
                    onKeyDown={toggleDrawer('right', false)}
                >
                    <Profile id={id}/>
                </Box>

            </Drawer>
        </div>
    )

    
}


