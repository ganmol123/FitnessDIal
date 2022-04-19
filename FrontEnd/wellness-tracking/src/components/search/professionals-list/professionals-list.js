import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import './professionals-list.scss';
import { Box, Drawer } from '@mui/material';
import { Profile } from './profile/profile';
export function ProfessionalsList({ professionalsData }) {
    const [showpProfile, setShowProfile] = useState(false);
    const [professionalData, setProfessionalData] = useState();
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setShowProfile(false);

    };
    return (
        <div className='list-container'>
            <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                {professionalsData.map(prof => <ListElement data={prof} setShowProfile={setShowProfile} setProfessionalData={setProfessionalData} key={prof._id} />)}
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
                    <Profile id={professionalData?._id}/>
                </Box>

            </Drawer>
        </div>
    )
}


const ListElement = ({ data, setShowProfile, setProfessionalData }) => {
    return (<><ListItem style={{ display: 'flex', alignItems: 'center' }} alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt={data?.first_name?.toUpperCase()} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <div className="list-item-container">
            <div className="professional-name" style={{width:200}}>{data.first_name.toUpperCase()} {data.last_name?.toUpperCase()}</div>
            <div className="icons">
                <div className='view-profile' onClick={() => {setShowProfile(true); setProfessionalData(data)}}>View Profile</div>
                <div className='chat'> <ChatIcon color='primary' style={{cursor:"pointer"}}/></div>

            </div>
        </div>
    </ListItem>
        <Divider variant="inset" component="li" style={{ marginLeft: '5px' }} /></>)
}