import Avatar from '@mui/material/Avatar';
import './profile.scss';
export function Profile({data}) {
    return (
        <div className="professional-profile">

        {data && <div className="profile-container">
            <Avatar style={{width:100, height:100, margin:'2em'}} alt={data.username.toUpperCase()}></Avatar>

            <div className='profile-info'>
                <div className='profile-name'>{data.first_name} {data.last_name}</div>
            </div>
        </div>}

        </div>
    )
}