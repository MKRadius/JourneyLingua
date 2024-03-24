import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "../styles/ImageToTextEx.css";

import { ExerciseImgTxt } from "../interfaces/Exercise";
import { fetchExercise } from "../hooks/exerciseHooks";
import { useNavigate } from "react-router-dom";
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';
import uaMessages from '../locales/ua.json';
import ruMessages from '../locales/ru.json';
import vnMessages from '../locales/vn.json';

interface Props {
  locale: "en" | "es" | "pt" | "ua" | "ru" | "vn";
}

const ImageToTextEx: React.FC<Props> = ({ locale }) => {
    const [index, setIndex] = useState<number>(0); 
    const [exercise, setExercise] = useState<ExerciseImgTxt[] | null>(null);
    const [countCorrectAnswer, setCountCorrectAnswer] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<{ word: string; isCorrect: boolean } | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error |null>(null);

    const navigate = useNavigate();

    const messages = {
        en: enMessages,
        es: esMessages,
        pt: ptMessages,
        ua: uaMessages,
        ru: ruMessages,
        vn: vnMessages
    };

    const getExerciseSet = async () => {
        try {
            const response = await fetchExercise();
            if (!response.ok) {
                console.log(error?.message);
                throw new Error("Exercise not found");
            }

            const data: ExerciseImgTxt[] = await response.json();
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

    const handleUserAnswer = (word: string) => {
        const isCorrect = exercise?.[index].wordFin === word;
        setSelectedAnswer({ word, isCorrect });
        
        if (isCorrect) {
            console.log("Correct!");
            setFeedbackMessage(messages[locale].imageToTextExercise.correctMessage);
            setCountCorrectAnswer(prevCount => prevCount + 1);
        } else {
            console.log("Incorrect!");
            setFeedbackMessage(messages[locale].imageToTextExercise.incorrectMessage);
        }

        // Wait a bit before going to the next question
        setTimeout(() => {
            setIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
        }, 800); // Delay in milliseconds
    };

    const displayExercise = () => {
        if (index < exercise?.length!) {
            return (
                <>
                    <img src={exercise?.[index].imageLink} alt="Exercise Image" className="exercise-image"/>
                    <div className="options-container">
                        {exercise?.map((ex, i) => {
                            const isAnswerSelected = selectedAnswer?.word === ex.wordFin;
                            const isCorrect = selectedAnswer?.isCorrect;
                            const buttonClass = isAnswerSelected ? (isCorrect ? "correct" : "wrong") : "";
                            
                            return (
                                <button key={i} className={`option-button ${buttonClass}`} onClick={() => {
                                    handleUserAnswer(ex.wordFin);
                                }}>
                                    {ex.wordFin}
                                </button>
                            )
                        })}
                    </div>
                    {feedbackMessage && <div className={selectedAnswer?.isCorrect ? "correct" : "wrong"}>{feedbackMessage}</div>}
                </>
            )
        } 
        else {
            return (
                <div className="message-completed">
                    <h1>
                        <FormattedMessage
                            id="exercise.completed"
                            defaultMessage={messages[locale].imageToTextExercise.completedTitle}
                        />
                    </h1>
                    <h3>
                        <FormattedMessage
                            id="exercise.completedMessage"
                            defaultMessage={messages[locale].imageToTextExercise.completedMessage}
                            values={{ countCorrectAnswer }}
                        />
                    </h3>
                    <button className="navigate-button" onClick={() => navigate("/")}>
                        <FormattedMessage
                            id="exercise.goBack"
                            defaultMessage={messages[locale].imageToTextExercise.goBackButton}
                        />
                    </button>
                </div>
            )
        }
    };
    

    return (
        <div>
            <header className="exercise-header">
                <h2>
                    <FormattedMessage
                        id="exercise.imageToText"
                        defaultMessage={messages[locale].imageToTextExercise.imageToText}
                    />
                </h2>
            </header>
            <main className="center">
                <div className="exercise-container">
                    {displayExercise()}
                </div>
            </main>
        </div>
    );
};

export default ImageToTextEx;
