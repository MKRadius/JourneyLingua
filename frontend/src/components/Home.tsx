import NavBar from "./NavBar";

const Home: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className="home-container">
                <h1>Welcome to JourneyLingua</h1>
                <p>Start your language learning journey today!</p>
                <button className="start-learning-button">Start Learning</button>
            </div>
        </div>
    );
};

export default Home;
