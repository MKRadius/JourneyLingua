import "../styles/Exercise.css";
import { useNavigate } from "react-router-dom";

const Exercise: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="exercise-container">
            <div className="exercise">
                <div className="exercise-header">
                    <h1>Start learning</h1>
                </div>

                <div className="exercise-content">
                    <button className="exercise-button" onClick={() => navigate("/image-to-text")}>Image to text</button>
                    <button className="exercise-button" onClick={() => navigate("/make-a-sentence")}>Make a sentence</button>
                    <button disabled className="exercise-button">Randomize</button>
                </div>
            </div>
        </div>
    )
}

export default Exercise;
