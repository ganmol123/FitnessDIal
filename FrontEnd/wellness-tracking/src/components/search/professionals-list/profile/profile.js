import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { getProfessionalData } from '../../../../services/professional.service';
import './profile.scss';
export function Profile({id}) {
    const [data, setData] = useState();
    const [info, setInfo] = useState();
    useEffect(()=>{
        getProfileData();
    },[])

    const getProfileData = async () =>   {
        const {data} = await getProfessionalData(id);
        setData(data);
        setInfo(data.professional_info)
    }

    return (
        <div className="professional-profile">

        {info ? <div className="profile-container">
            <Avatar style={{width:100, height:100, margin:'2em'}} alt={info.name?.toUpperCase()}></Avatar>

            <div className='profile-info'>
                <div className='profile-name'>{info.name}</div>
            </div>
        </div> : <CircularProgress style={{margin:'auto'}}/>}

        </div>
    )
}