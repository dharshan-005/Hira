import React, { useState, useEffect, useRef } from "react";
import hiraganaData from "../data/hiragana.json";
import katakanaData from "../data/katakana.json";
import kanjiData from "../data/kanji.json";
import vocabData from "../data/vocab.json";
import grammarData from "../data/grammar.json";
import ThemeToggle from "../Components/Themes";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizType, setQuizType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");

  const [showResult, setShowResult] = useState(false);

  const [selected, setSelected] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const navigate = useNavigate();
  const allowNavigation = useRef(false);

  const isFillUp = quizType === "vocab" || quizType === "grammar";
  const QUESTION_LIMIT = 15;

  useEffect(() => {
    const handlePopState = () => {
      if (!quizType || allowNavigation.current) return;

      const confirmLeave = window.confirm(
        "You are in the middle of a quiz. Leave?",
      );

      if (confirmLeave) {
        allowNavigation.current = true;
        navigate(-1);
      } else {
        window.history.pushState({ quiz: true }, "");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [quizType, navigate]);

  const shuffleArray = (array) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  const getReading = (q) => {
    if (quizType !== "kanji") {
      return q.romanji || q.meaning || q.answer;
    }

    const readings = [
      ...(q.onyomi ? q.onyomi.split(", ") : []),
      ...(q.kunyomi ? q.kunyomi.split(", ") : []),
    ];

    return readings[Math.floor(Math.random() * readings.length)];
  };

  const startQuiz = (type) => {
    window.history.pushState({ quiz: true }, "");
    allowNavigation.current = false;
    setQuizType(type);
    setScore(0);
    setCurrent(0);
    setInputAnswer("");

    let data = [];

    switch (type) {
      case "hiragana":
        data = hiraganaData;
        break;

      case "katakana":
        data = katakanaData;
        break;

      case "kanji":
        data = kanjiData;
        break;

      case "vocab":
        data = vocabData;
        break;

      case "grammar":
        data = grammarData;
        break;

      default:
        data = [];
    }
    // console.log("data:", data);
    // console.log("isArray:", Array.isArray(data));

    const normalizedData = Array.isArray(data)
      ? data
      : Object.values(data).flat();

    setQuestions(shuffleArray(normalizedData).slice(0, QUESTION_LIMIT));
  };

  useEffect(() => {
    if (questions.length > 0 && !isFillUp) {
      const correct = getReading(questions[current]);

      const pool = shuffleArray(
        questions.map((q) => getReading(q)).filter((val) => val !== correct),
      ).slice(0, 3);

      pool.push(correct);

      setOptions(shuffleArray(pool));
    }
  }, [questions, current, quizType]);

  const handleMCQAnswer = (ans) => {
    const correct = getReading(questions[current]);

    setSelected(ans);
    setCorrectAnswer(correct);

    const newScore = ans === correct ? score + 1 : score;

    setScore(newScore);

    setTimeout(() => {
      setSelected(null);
      setCorrectAnswer(null);

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setScore(newScore);
        setShowResult(true);
      }
    }, 800);
  };

  const handleFillUpSubmit = () => {
    const q = questions[current];

    const correctRaw = q.answer || q.meaning || q.romanji || "";

    const correctOptions = correctRaw
      .toLowerCase()
      .replace(/\(.*?\)/g, "")
      .split("/")
      .map((opt) => opt.trim().replace(/^to\s+/, ""));

    const user = inputAnswer
      .toLowerCase()
      .trim()
      .replace(/^to\s+/, "");

    const isCorrect = correctOptions.includes(user);

    const newScore = isCorrect ? score + 1 : score;

    setScore(newScore);
    setInputAnswer("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!quizType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-4">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-2xl font-bold">Select a Quiz</h2>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => startQuiz("hiragana")}
            className="px-4 py-2 border border-indigo-600 rounded hover:text-indigo-800 cursor-pointer"
          >
            Hiragana
          </button>

          <button
            onClick={() => startQuiz("katakana")}
            className="px-4 py-2 border border-green-600 rounded hover:text-green-800 cursor-pointer"
          >
            Katakana
          </button>

          <button
            onClick={() => startQuiz("kanji")}
            className="px-4 py-2 border border-yellow-600 rounded hover:text-yellow-800 cursor-pointer"
          >
            Kanji
          </button>

          <button
            onClick={() => startQuiz("vocab")}
            className="px-4 py-2 border border-pink-600 rounded hover:text-pink-800 cursor-pointer"
          >
            Vocabulary
          </button>

          <button
            onClick={() => startQuiz("grammar")}
            className="px-4 py-2 border border-purple-600 rounded hover:text-purple-800 cursor-pointer"
          >
            Grammar
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) return <p className="text-white">Loading quiz...</p>;

  const currentQuestion = questions[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-300 text-black p-6">
      <h2 className="text-2xl font-bold mb-6">
        Quiz: {quizType.toUpperCase()}
      </h2>

      {/* <p className="text-xl mb-2">{currentQuestion.word}</p> */}

      {quizType === "vocab" && currentQuestion.example && (
        <p className="text-sm text-gray-700 mb-4">{currentQuestion.example}</p>
      )}
      
      <p className="text-xl mb-4">
        {isFillUp
          ? currentQuestion.question || currentQuestion.word
          : currentQuestion.char ||
            currentQuestion.kanji ||
            currentQuestion.word}
      </p>

      {isFillUp ? (
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            className="px-4 py-2 text-black rounded"
            placeholder="Type your answer..."
          />

          <button
            onClick={handleFillUpSubmit}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-800"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {options.map((opt, idx) => {
            let style = "bg-indigo-600";

            if (selected) {
              if (opt === correctAnswer) {
                style = "bg-green-600";
              } else if (opt === selected) {
                style = "bg-red-600";
              } else {
                style = "bg-gray-500";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleMCQAnswer(opt)}
                disabled={selected !== null}
                className={`px-4 py-2 rounded transition ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-6">
        Question {current + 1}/{questions.length} | Score: {score}
      </p>

      <button
        onClick={() => {
          if (quizType && !allowNavigation.current) {
            const confirmLeave = window.confirm(
              "You are in the middle of a quiz. Leave?",
            );

            if (!confirmLeave) return;
          }

          allowNavigation.current = true;
          navigate("/n5");
        }}
        className="cursor-pointer mt-6 bg-white p-2 rounded-2xl"
      >
        Exit Quiz
      </button>

      {showResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-black p-8 rounded-xl shadow-xl text-center w-80">
            <h2 className="text-2xl font-bold mb-4">Quiz Finished 🎉</h2>

            <p className="text-lg mb-6">
              Your Score: {score} / {questions.length}
            </p>

            <div className="flex gap-8 justify-center">
              <button
                onClick={() => {
                  allowNavigation.current = false;
                  startQuiz(quizType);
                  setShowResult(false);
                  setQuizType(null);
                  setQuestions([]);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800"
              >
                Retry
              </button>

              <button
                onClick={() => {
                  setShowResult(false);
                  setQuizType(null);
                  setQuestions([]);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
