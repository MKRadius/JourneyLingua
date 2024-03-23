// Inside your component
import { FormattedMessage } from 'react-intl'; // Import FormattedMessage component

const Home: React.FC = () => {
    return (
        <div>
            <div className="home-container">
                <h1><FormattedMessage id="home.welcome"/></h1>
                <p><FormattedMessage id="home.start_learning" /></p>
                <button className="start-learning-button"><FormattedMessage id="home.start_learning"/></button>
            </div>
        </div>
    );
};

export default Home;
