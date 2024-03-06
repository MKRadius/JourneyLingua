import "../styles/Exercise.css";

const Exercise: React.FC = () => {
    return (
        <div className="exercise-container">
            <div className="exercise">
                <div className="exercise-header">
                    <h1>Start learning</h1>
                </div>

                <div className="exercise-content">
                    <button className="exercise-button">Image to text</button>
                    <button className="exercise-button">Make a sentence</button>
                    <button className="exercise-button">Randomize</button>
                </div>
            </div>
        </div>
    )
}

export default Exercise;
