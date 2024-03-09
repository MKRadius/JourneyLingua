import { useEffect, useState } from "react";
import "../styles/ImageToTextEx.css";

import { ExerciseSentence } from "../interfaces/Exercise";
import { fetchSentenceExercise } from "../hooks/exerciseHooks";
import { useNavigate } from "react-router-dom";

const MakeASentenceEx: React.FC = () => {
    const [index, setIndex] = useState<number>(0); 
    const [exercise, setExercise] = useState<ExerciseSentence[] | null>(null);
    const [countCorrectAnswer, setCountCorrectAnswer] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error |null>(null);

    const navigate = useNavigate();

    const getExerciseSet = async () => {
        try {
            const response = await fetchSentenceExercise();
            if (!response.ok) {
                console.log(error?.message);
                throw new Error("Exercise not found");
            }

            const data: ExerciseSentence[] = await response.json();
            console.log(data);
            setExercise(data);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getExerciseSet();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleUserAnswer = (sentence: string) => {
        // if (exercise?.[index].wordFin === word) {
        //     setCountCorrectAnswer(countCorrectAnswer + 1);
        // }
        setIndex(index + 1);
    };

    const displayExercise = () => {
        if (index < exercise?.length!) {
            return (
                <>
                    <div className="sentence-container">
                        <div className="sentence">{exercise?.[index].sentenceFin}</div>
                    </div>
                </>
            )
        } 
        else {
            return (
                <>
                    <div>Exercise Completed</div>
                    <div>You did {countCorrectAnswer}/3 correct!</div>
                    <button onClick={() => navigate("/")}>Go back</button>
                </>
            )
        }
    };
    

    return (
        <div>
            <header className="exercise-header">
                <h2>Make A Sentence Exercise</h2>
            </header>
            <main className="center">
                <div className="exercise-container">
                    {displayExercise()}
                </div>
            </main>
        </div>
    );
};

export default MakeASentenceEx;