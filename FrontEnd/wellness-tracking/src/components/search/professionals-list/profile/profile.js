import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import './profile.scss';
import store from '../../../../store';
import { getProfileData, updateProfile } from '../../../../services/profile.service';
export function Profile({ id }) {
    const [info, setInfo] = useState();
    const [color, setColor] = useState("primary");
    const user = store.getState().userDetails;
    useEffect(() => {
        getData();
    }, [])

    const subscribeProf = async ()=> {
        const details = {...info}
        details.plans_enrolled.push({
            professional_id: id,
            name: info.professional_type
        });
        details.customer_enrolled.push(user);
        const {data} = await updateProfile(user, details);
        setColor("success");
        console.log(data);

    }

    const getData = async () => {
        const { data } = await getProfileData({_id:id, user_type:user.user_type==='Professional'?'Customer':'Professional'});
        setInfo(user.user_type==='Professional' ? data.customer_info: data.professional_info)
    }

    return (
        <div className="professional-profile">

            {info ? <div className="profile-container">
                <div className="avatar">
                    <Avatar style={{ width: 100, height: 100, margin: '2em' }} alt={info.name?.toUpperCase()}></Avatar>

                    <div className='name-info'>
                        <div className='profile-name'>{info.name}</div>
                    </div>
                </div>


                <div className="profile-info" style={{fontSize:'16px'}}>
                    <div className="category prop"><strong>Category</strong>: {info.professional_type}</div>
                    <div className="description prop"><strong>Description</strong>: {info.description}</div>
                    <div className="age prop"><strong>Age</strong>: {info.age}</div>
                    <div className="gender prop"><strong>Gender</strong>: {info.gender}</div>
                    <div className="email prop"><strong>Email</strong>: {info.email}</div>
                    <div className="phone prop"><strong>Phone</strong>: {info.number}</div>
                    <div className="address prop"><strong>Address</strong>: {info.address}</div>
                    { user.user_type==='Customer' && <Button variant="contained" color={color} onClick={subscribeProf()}>{color==='primary' ? 'Subscribe': 'Subscribed'}</Button>}
                </div>
            </div> : <CircularProgress style={{ margin: 'auto' }} />}

        </div>
    )
}