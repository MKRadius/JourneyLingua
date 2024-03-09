import "../styles/ImageToTextEx.css";
import { useEffect, useState } from "react";

interface Exercise {
    wordId: number;
    wordEng: string;
    wordFin: string;
    imageLink: string;
}



const ImageToTextEx: React.FC = () => {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error |null>(null);

    const fetchExercise = async () => {
        try {
            const response = await fetch("http://localhost:3000/lesson/imageToTextEx/random");
            console.log("request sent");
            if (!response.ok) {
                console.log(error?.message);
                throw new Error("Exercise not found");
            }
            const data: Exercise[] = await response.json();
            console.log(data);
            // setExercise(data);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercise();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    

    return (
        <div>
            <header className="exercise-header">
                <h2>Text-Image Exercise</h2>
            </header>
            <main className="center">
                <div className="exercise-container">
                    {/* <img src={exercise?.imageLink} alt="Exercise Image" className="exercise-image"/>
                    <div className="options-container">
                        <button className="option-button">{exercise?.wordFin}</button>
                        <button className="option-button">Option 1</button>
                        <button className="option-button">Option 2</button>
                    </div> */}

                    
                </div>
            </main>
        </div>
    );
};

export default ImageToTextEx;