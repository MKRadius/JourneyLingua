import "../styles/Profile.css";
import {useEffect, useState} from "react";

const Profile: React.FC = () => {
    const [jsonData, setJsonData] = useState<any>(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem("userData");
        if (userData) {
            setJsonData(JSON.parse(userData));
        }
    }, []);
    return (
        <div className="profile-container">
            <div className="profile">
                <div className="profile-image">
                    <img src="../../public/UserProfileImage.png" alt="Profile" />
                </div>

                <div className="profile-details">
                    {jsonData ? (
                        <>
                            <div className="user-data">
                            <h3>{jsonData.username}</h3>
                            <p>First Name: {jsonData.firstname}</p>
                            <p>Last Name: {jsonData.lastname}</p>
                            <p>Email: {jsonData.email}</p>
                            </div>
                        </>
                    ) : (
                        <>
                        <div className="user-data">
                            <h3>Username</h3>
                            <p>First Name: </p>
                            <p>Last Name: </p>
                            <p>Email: </p>
                            {/*<p>Streak: </p>*/}
                        </div>
                        </>
                    )}

                </div>
            </div>
        </div>

    )
}

export default Profile;