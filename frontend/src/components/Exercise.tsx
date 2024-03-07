import "../styles/Exercise.css";
import {Link} from "react-router-dom";

const Exercise: React.FC = () => {
    return (
        <div className="exercise-container">
            <div className="exercise">
                <div className="exercise-header">
                    <h1>Start learning</h1>
                </div>

                <div className="exercise-content">
                    <button className="exercise-button">
                        <Link to="/image-to-text">Image to text</Link></button>
                    <button className="exercise-button">Make a sentence</button>
                    <button className="exercise-button">Randomize</button>
                </div>
            </div>
        </div>
    )
}

export default Exercise;
