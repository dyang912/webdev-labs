import React from 'react';

const Profile = ({profile}) => {
    return (
        <div className="profile">
            <img className="profile_pic" src={ profile.image_url } alt={"profile pic for" + profile.username } />
            <h2 className="profile_name">{profile.username}</h2>
        </div>
    );
}

export default Profile;