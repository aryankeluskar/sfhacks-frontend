// // import { useState, ChangeEvent, FormEvent } from "react";
// import "./Profile.css"
// // import pfp from '../assets/Unknown.jpeg'

// function Profile() {
//   return (
//     <div className="container">
//       <h1>Username</h1>
//       <div>
//         <h1>profile picture</h1>
//         <image href="../assets/Unknown.jpeg"></image>
//       </div>
//       <div>
//         <h1>personal info</h1>
//         <span>name</span>
//         <span>age</span>
//         <span>bio</span>
//       </div>
//     </div>
//   )
// }

// export default Profile





import React from 'react';
import "../css/Profile.css"

interface ProfileProps {
    name: string;
    age: number;
    bio: string;
    profilePictureUrl: string;
    interests: string[];
}

const Profile_Display: React.FC<ProfileProps> = ({ name, age, bio, profilePictureUrl, interests }) => {
    return (
        <div className="container">
            <img src={profilePictureUrl} alt={name} className="profile-picture" />
            <div className="profile-info">
                <h2>{name}</h2>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Bio:</strong> {bio}</p>
                <ul>
                    {interests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile_Display;
