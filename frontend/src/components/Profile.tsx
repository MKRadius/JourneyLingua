import "../styles/Profile.css";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";

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
                    <img width="150" src="../../public/UserProfileImage.png" alt="Profile" />
                </div>

                <div className="profile-details">
                    {jsonData ? (
                        <>
                            <h3>{jsonData.username}</h3>
                            <p><FormattedMessage id="placeholder.firstname"/>: {jsonData.firstname}</p>
                            <p><FormattedMessage id="placeholder.lastname"/>: {jsonData.lastname}</p>
                            <p><FormattedMessage id="placeholder.email"/>: {jsonData.email}</p>
                        </>
                    ) : (
                        <>
                            <h3>Username</h3>
                            <p><FormattedMessage id="placeholder.firstname"/>: </p>
                            <p><FormattedMessage id="placeholder.lastname"/>: </p>
                            <p><FormattedMessage id="placeholder.email"/>: </p>
                            {/*<p>Streak: </p>*/}
                        </>
                    )}

                </div>
            </div>
        </div>

    )
}

export default Profile;