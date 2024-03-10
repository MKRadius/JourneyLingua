import { useEffect, useState } from "react";
import "../styles/ImageToTextEx.css";

import { ExerciseSentence } from "../interfaces/Exercise";
import { fetchSentenceExercise } from "../hooks/exerciseHooks";
import { useNavigate } from "react-router-dom";

const MakeASentenceEx: React.FC = () => {
    const [index, setIndex] = useState<number>(0); 
    const [exercise, setExercise] = useState<ExerciseSentence[] | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [countCorrectAnswer, setCountCorrectAnswer] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<{ sentence: string; isCorrect: boolean } | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
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

    useEffect(() => {
        setFeedbackMessage(null); // Reset feedback message when index changes
    }, [index]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleUserAnswer = (sentence: string) => {
        const isCorrect = exercise?.[index].sentenceFin.toLowerCase() === sentence.toLowerCase();
        setSelectedAnswer({ sentence, isCorrect });
        
        if (isCorrect) {
            console.log("Correct!");
            setFeedbackMessage("Correct!");
            setCountCorrectAnswer(prevCount => prevCount + 1);
        } else {
            console.log("Incorrect!");
            setFeedbackMessage("Incorrect!");
        }

        // Wait a bit before going to the next question
        setTimeout(() => {
            setIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setUserAnswer("");
        }, 800); // Delay in milliseconds
    };

    const displayExercise = () => {
        if (index < exercise?.length!) {
            return (
                <>
                    <div className="sentence-container">
                        <div className="sentence">{exercise?.[index].sentenceFin}</div>
                        <div hidden className="correct-sentence">Correct sentence</div>
                    </div>

                    <div className="answer-container">
                        <input onChange={e => setUserAnswer(e.target.value)} type="text" placeholder="Type your answer here" value={userAnswer}/>
                        <button onClick={() => handleUserAnswer(userAnswer)}>Submit</button>
                    </div>
                    {feedbackMessage && <div className={selectedAnswer?.isCorrect ? "correct" : "wrong"}>{feedbackMessage}</div>}
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