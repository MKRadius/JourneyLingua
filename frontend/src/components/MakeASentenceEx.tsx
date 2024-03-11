import { useEffect, useState } from "react";
import "../styles/ImageToTextEx.css";
import "../styles/MakeASentenceEx.css";
import { ExerciseSentence } from "../interfaces/Exercise";
import { fetchSentenceExercise } from "../hooks/exerciseHooks";
import { useNavigate } from "react-router-dom";
import { shuffle } from "../utils/ArrayShuffle";

const MakeASentenceEx: React.FC = () => {
    const [index, setIndex] = useState<number>(0);
    const [exercise, setExercise] = useState<ExerciseSentence[] | null>(null);
    const [shuffledSentence, setShuffledSentence] = useState<string>("");
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [countCorrectAnswer, setCountCorrectAnswer] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<{ sentence: string; isCorrect: boolean } | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getExerciseSet = async () => {
            try {
                const response = await fetchSentenceExercise();
                if (!response.ok) {
                    throw new Error("Exercise not found");
                }
                const data: ExerciseSentence[] = await response.json();
                setExercise(data);
                shuffleAndSetSentence(data[0]?.sentenceFin); // Initialize shuffle with the first sentence
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getExerciseSet();
    }, []);

    const shuffleAndSetSentence = (sentence: string) => {
        const words = sentence.split(' ');
        const shuffledWords = shuffle(words);
        setShuffledSentence(shuffledWords.join(' '));
    };

    useEffect(() => {
        if (exercise && index < exercise.length) {
            shuffleAndSetSentence(exercise[index].sentenceFin);
        }
    }, [exercise, index]); // Recalculate when exercise or index changes

    const handleUserAnswer = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === exercise?.[index].sentenceFin.toLowerCase();
        setSelectedAnswer({ sentence: userAnswer, isCorrect });
        setFeedbackMessage(isCorrect ? "Correct!" : "Incorrect!");

        if (isCorrect) {
            setCountCorrectAnswer(prevCount => prevCount + 1);
        }

        setTimeout(() => {
            setIndex(prevIndex => prevIndex + 1);
            setUserAnswer("");
        }, 800);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <header className="exercise-header">
                <h2>Make A Sentence Exercise</h2>
            </header>
            <main className="center">
                <div className="exercise-container">
                    {index < exercise?.length! ? (
                        <>
                            <div className="sentence-container">
                                <div className="sentence">{shuffledSentence}</div>
                            </div>
                            <div className="answer-container">
                                <input onChange={e => setUserAnswer(e.target.value)} type="text" placeholder="Type your answer here" value={userAnswer}/>
                                <button onClick={handleUserAnswer}>Submit</button>
                            </div>
                            {feedbackMessage && <div className={selectedAnswer?.isCorrect ? "correct" : "wrong"}>{feedbackMessage}</div>}
                        </>
                    ) : (
                        <div className="message-completed">
                            <h1>Completed</h1>
                            <h3>You did {countCorrectAnswer} correct!</h3>
                            <button onClick={() => navigate("/")}>Go back</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MakeASentenceEx;
