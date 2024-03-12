import "../styles/Profile.css";
import { useLocation } from "react-router-dom";

const Profile: React.FC = () => {
    const location = useLocation();
    const jsonData = location.state?.jsonData;
    return (
        <div className="profile-container">
            <div className="profile">
                <div className="profile-image">
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                </div>

                <div className="profile-details">
                    {jsonData ? (
                        <>
                            <h3>{jsonData.username}</h3>
                            <p>First Name: {jsonData.firstname}</p>
                            <p>Last Name: {jsonData.lastname}</p>
                            <p>Email: {jsonData.email}</p>
                        </>
                    ) : (
                        <>
                            <h3>Username</h3>
                            <p>First Name: </p>
                            <p>Last Name: </p>
                            <p>Email: </p>
                            {/*<p>Streak: </p>*/}
                        </>
                    )}

                </div>
            </div>
        </div>

    )
}

export default Profile;