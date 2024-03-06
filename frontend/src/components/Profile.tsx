import "../styles/Profile.css";

const Profile: React.FC = () => {
    return (
        <div className="profile-container">
            <div className="profile">
                <div className="profile-image">
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                </div>

                <div className="profile-details">
                    <h3>Username</h3>
                    <p>First Name: </p>
                    <p>Last Name: </p>
                    <p>Email: </p>
                    <p>Streak: </p>
                </div>
            </div>
        </div>

    )
}

export default Profile;