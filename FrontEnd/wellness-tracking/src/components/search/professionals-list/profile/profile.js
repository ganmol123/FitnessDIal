import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { getProfessionalData } from '../../../../services/user.service';
import './profile.scss';
export function Profile({id}) {
    const [data, setData] = useState();
    useEffect(()=>{
        getProfileData();
    },[])

    const getProfileData = async () =>   {
        const {data} = await getProfessionalData(id);
        setData(data);
    }

    return (
        <div className="professional-profile">

        {data ? <div className="profile-container">
            <Avatar style={{width:100, height:100, margin:'2em'}} alt={data?.first_name?.toUpperCase()}></Avatar>

            <div className='profile-info'>
                <div className='profile-name'>{data.first_name} {data.last_name}</div>
            </div>
        </div> : <CircularProgress style={{margin:'auto'}}/>}

        </div>
    )
}