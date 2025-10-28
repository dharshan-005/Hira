import React, { useState, useEffect } from "react";
import hiraganaData from "../data/hiragana.json";
import katakanaData from "../data/katakana.json";
import kanjiData from "../data/kanji.json";
import vocabData from "../data/vocab.json";
import grammarData from "../data/grammar.json";

const Quiz = () => {
  const [quizType, setQuizType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");

  const isFillUp = quizType === "vocab" || quizType === "grammar";

  const QUESTION_LIMIT = 15;

  // Shuffle utility
  const shuffleArray = (array) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  // Start quiz and shuffle questions
  const startQuiz = (type) => {
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

    // Shuffle and limit questions
    setQuestions(shuffleArray(data).slice(0, QUESTION_LIMIT));
  };

  // Generate multiple-choice options
  useEffect(() => {
    if (questions.length > 0 && !isFillUp) {
      const correct =
        questions[current].romanji ||
        questions[current].meaning ||
        questions[current].answer;

      // Get 3 random wrong answers
      const pool = shuffleArray(
        questions
          .map((q) => q.romanji || q.meaning || q.answer)
          .filter((val) => val !== correct)
      ).slice(0, 3);

      pool.push(correct); // add correct answer
      setOptions(shuffleArray(pool)); // shuffle 4 options
    }
  }, [questions, current, isFillUp]);

  // Handle multiple-choice answer
  const handleMCQAnswer = (ans) => {
    const correct =
      questions[current].romanji ||
      questions[current].meaning ||
      questions[current].answer;
    if (ans === correct) setScore(score + 1);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      alert(`Quiz finished! Your score: ${score + 1}/${questions.length}`);
      setQuizType(null);
    }
  };

  // Handle fill-up answer
  const handleFillUpSubmit = () => {
    const correct = questions[current].answer.toLowerCase().trim();
    if (inputAnswer.toLowerCase().trim() === correct) setScore(score + 1);

    setInputAnswer("");
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      alert(`Quiz finished! Your score: ${score + 1}/${questions.length}`);
      setQuizType(null);
    }
  };

  // Category selection screen
  if (!quizType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Select a Quiz</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => startQuiz("hiragana")}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-800"
          >
            Hiragana
          </button>
          <button
            onClick={() => startQuiz("katakana")}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-800"
          >
            Katakana
          </button>
          <button
            onClick={() => startQuiz("kanji")}
            className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-800"
          >
            Kanji
          </button>
          <button
            onClick={() => startQuiz("vocab")}
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-800"
          >
            Vocabulary
          </button>
          <button
            onClick={() => startQuiz("grammar")}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-800"
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Quiz: {quizType.toUpperCase()}</h2>

      {/* Question */}
      <p className="text-xl mb-4">
        {isFillUp
          ? currentQuestion.question || currentQuestion.word
          : currentQuestion.char || currentQuestion.kanji || currentQuestion.word}
      </p>

      {/* Answer section */}
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
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleMCQAnswer(opt)}
              className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-800 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      <p className="mt-6">
        Question {current + 1}/{questions.length} | Score: {score}
      </p>
    </div>
  );
};

export default Quiz;
