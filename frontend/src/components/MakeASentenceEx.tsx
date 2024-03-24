import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "../styles/MakeASentenceEx.css";
import { ExerciseSentence } from "../interfaces/Exercise";
import { fetchSentenceExercise } from "../hooks/exerciseHooks";
import { useNavigate } from "react-router-dom";
import { shuffle } from "../utils/ArrayShuffle";
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';

interface Props {
  locale: "en" | "es" | "pt";
}

const MakeASentenceEx: React.FC<Props> = ({ locale }) => {
  const [index, setIndex] = useState<number>(0);
  const [exercise, setExercise] = useState<ExerciseSentence[] | null>(null);
  const [shuffledSentence, setShuffledSentence] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [countCorrectAnswer, setCountCorrectAnswer] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    sentence: string;
    isCorrect: boolean;
  } | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const messages = {
    en: enMessages,
    es: esMessages,
    pt: ptMessages
  };

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
    const words = sentence.split(" ");
    const shuffledWords = shuffle(words);
    setShuffledSentence(shuffledWords.join(" "));
  };

  useEffect(() => {
    if (exercise && index < exercise.length) {
      shuffleAndSetSentence(exercise[index].sentenceFin);
    }
  }, [exercise, index]); // Recalculate when exercise or index changes

  const handleUserAnswer = () => {
    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      exercise?.[index].sentenceFin.toLowerCase();
    setSelectedAnswer({ sentence: userAnswer, isCorrect });
    setFeedbackMessage(isCorrect ? messages[locale].exercise.correctMessage : messages[locale].exercise.incorrectMessage);

    if (isCorrect) {
      setCountCorrectAnswer((prevCount) => prevCount + 1);
    }

    setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1);
      setUserAnswer("");
    }, 800);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <header className="exercise-header">
        <h2>
          <FormattedMessage
            id="exercise.makeASentence"
            defaultMessage={messages[locale].exercise.makeASentenceExercise}
          />
        </h2>
      </header>
      <main className="center">
        <div className="exercise-container">
          {index < exercise?.length! ? (
            <>
              <div className="sentence-container">
                <div className="sentence">{shuffledSentence}</div>
              </div>
              <div className="answer-container">
                <input
                  onChange={(e) => setUserAnswer(e.target.value)}
                  type="text"
                  placeholder={messages[locale].exercise.answerPlaceholder}
                  value={userAnswer}
                />
                <button onClick={handleUserAnswer}>
                  <FormattedMessage
                    id="exercise.submit"
                    defaultMessage={messages[locale].exercise.submitButton}
                  />
                </button>
              </div>
              {feedbackMessage && (
                <div
                  className={selectedAnswer?.isCorrect ? "correct" : "wrong"}
                >
                  {feedbackMessage}
                </div>
              )}
            </>
          ) : (
            <div className="message-completed">
              <h1>
                <FormattedMessage
                  id="exercise.completed"
                  defaultMessage={messages[locale].exercise.completedTitle}
                />
              </h1>
              <h3>
                <FormattedMessage
                    id="exercise.completedMessage"
                    defaultMessage={messages[locale].exercise.completedMessage}
                    values={{ countCorrectAnswer }} // Directly pass the variable
                />
                </h3>
              <button className="navigate-button" onClick={() => navigate("/")}>
                <FormattedMessage
                  id="exercise.goBack"
                  defaultMessage={messages[locale].exercise.goBackButton}
                />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MakeASentenceEx;