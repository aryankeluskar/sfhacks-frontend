

import React, { useState } from 'react';
import "../css/Profile_Input.css"

const Profile_Input: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bio: '',
        profilePicture: null as File | null,
        profilePictureUrl: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({
                    ...formData,
                    profilePicture: file,
                    profilePictureUrl: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can handle form submission here, for example, by submitting the form data to an API
    };

    return (
        <div className="container">
            <form className="profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />

                <label htmlFor="bio">Bio:</label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />

                <label htmlFor="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleImageChange} />

                <br></br>
                <br></br>
                {formData.profilePictureUrl && (
                    <img src={formData.profilePictureUrl} alt={formData.name} className="profile-picture-preview" />
                )}
                <br></br>
                <div id="submitDiv">
                    <input id="submit" type="submit" value="Submit"/>
                </div>
            </form>

        </div>
    );
};

export default Profile_Input;
