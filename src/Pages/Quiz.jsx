import React, { useState, useEffect, useRef } from "react";
import hiraganaData from "../data/hiragana.json";
import katakanaData from "../data/katakana.json";
import kanjiData from "../data/kanji.json";
import vocabData from "../data/vocab.json";
import grammarData from "../data/grammar.json";
import ThemeToggle from "../Components/Themes";
import { useNavigate } from "react-router-dom";

// ---- Design tokens -------------------------------------------------------
// Ai (indigo)   #1B2A4A / #33507D  – primary, structure
// Washi (paper) #EEEFE6 / #14161C  – background
// Sumi (ink)    #24211E / #EDEBE3  – text
// Shu (vermillion, "hanko" stamp)  #C1440E – the one accent, spent on the
//   score stamp and category marks only.
// Fonts: Shippori Mincho (display + Japanese glyphs), Inter (UI/body),
//   IBM Plex Mono (numbers / counters, "stamped ledger" feel).

const CATEGORY_META = {
  hiragana: { glyph: "あ", label: "Hiragana", sub: "phonetic · basic" },
  katakana: { glyph: "ア", label: "Katakana", sub: "phonetic · foreign" },
  kanji: { glyph: "漢", label: "Kanji", sub: "meaning · reading" },
  vocab: { glyph: "語", label: "Vocabulary", sub: "words · usage" },
  grammar: { glyph: "文", label: "Grammar", sub: "structure · particles" },
};

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

    .jp-display { font-family: 'Shippori Mincho', serif; }
    .jp-mono { font-family: 'IBM Plex Mono', monospace; }
    .jp-body { font-family: 'Inter', sans-serif; }

    @keyframes fadeSlide {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .qa-card { animation: fadeSlide .35s ease; }

    @keyframes stampIn {
      0% { opacity: 0; transform: scale(1.4) rotate(-8deg); }
      60% { opacity: 1; transform: scale(0.94) rotate(-8deg); }
      100% { opacity: 1; transform: scale(1) rotate(-8deg); }
    }
    .hanko-stamp { animation: stampIn .4s cubic-bezier(.34,1.56,.64,1); }
  `}</style>
);

// Circular vermillion "hanko" seal — the one bold signature element.
// In Japan a red stamp signifies approval, so we spend the accent color
// here rather than scattering it through the UI.
const HankoStamp = ({ value, size = "md" }) => {
  const dims = size === "lg" ? "w-28 h-28 text-3xl" : "w-14 h-14 text-sm";
  return (
    <div
      className={`hanko-stamp ${dims} rounded-full border-[3px] border-[#C1440E] text-[#C1440E] flex items-center justify-center font-semibold jp-mono select-none shrink-0`}
      style={{ transform: "rotate(-8deg)" }}
    >
      {value}
    </div>
  );
};

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
  const [feedback, setFeedback] = useState(null); // "correct" | "incorrect" | null (fill-up only)

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
    setShowResult(false);
    setFeedback(null);

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
    if (!inputAnswer.trim()) return;

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
    setFeedback(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      setInputAnswer("");
      setFeedback(null);

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    }, 700);
  };

  const requestExit = () => {
    if (quizType && !allowNavigation.current) {
      const confirmLeave = window.confirm(
        "You are in the middle of a quiz. Leave?",
      );
      if (!confirmLeave) return;
    }
    allowNavigation.current = true;
    navigate("/n5");
  };

  // ---- Selection screen ---------------------------------------------------
  if (!quizType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-10 bg-[#EEEFE6] dark:bg-[#14161C] jp-body text-[#24211E] dark:text-[#EDEBE3]">
        <FontImport />

        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex flex-row items-center gap-4">
            <h1 className="jp-display text-4xl font-bold tracking-wide">
              <span className="text-xl font-normal align-middle">
                Select a Quiz
              </span>
            </h1>
            <ThemeToggle />
          </div>
          <p className="text-sm text-[#33507D] dark:text-[#8FA6CE] jp-mono">
            15 questions · N5 level
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-3xl">
          {Object.entries(CATEGORY_META).map(([type, meta]) => (
            <button
              key={type}
              onClick={() => startQuiz(type)}
              className="group relative overflow-hidden text-left px-6 py-8 rounded-xl border border-[#33507D]/20 dark:border-[#8FA6CE]/20 bg-white/60 dark:bg-white/5 hover:border-[#1B2A4A] dark:hover:border-[#8FA6CE] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span className="jp-display absolute -right-2 -bottom-4 text-[7rem] leading-none text-[#1B2A4A]/[0.06] dark:text-white/[0.06] select-none group-hover:text-[#1B2A4A]/[0.1] dark:group-hover:text-white/[0.1] transition-colors">
                {meta.glyph}
              </span>
              <span className="relative z-10 flex flex-col gap-1">
                <span className="jp-display text-2xl font-bold">
                  {meta.label}
                </span>
                <span className="text-xs uppercase tracking-widest jp-mono text-[#33507D] dark:text-[#8FA6CE]">
                  {meta.sub}
                </span>
              </span>
              <span className="relative z-10 mt-6 block h-[2px] w-8 bg-[#C1440E] group-hover:w-14 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!questions.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEEFE6] dark:bg-[#14161C]">
        <FontImport />
        <p className="jp-mono text-[#33507D] dark:text-[#8FA6CE] animate-pulse">
          Loading quiz…
        </p>
      </div>
    );

  const currentQuestion = questions[current];
  const meta = CATEGORY_META[quizType];
  const progressPct = Math.round(
    ((current + (showResult ? 1 : 0)) / questions.length) * 100,
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#EEEFE6] dark:bg-[#14161C] jp-body text-[#24211E] dark:text-[#EDEBE3] p-6">
      <FontImport />

      {/* Progress bar */}
      <div className="w-full max-w-md h-1 rounded-full bg-[#33507D]/15 dark:bg-white/10 mt-2 mb-8 overflow-hidden">
        <div
          className="h-full bg-[#1B2A4A] dark:bg-[#8FA6CE] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="jp-display text-3xl leading-none text-[#1B2A4A] dark:text-[#8FA6CE]">
          {meta.glyph}
        </span>
        <h2 className="jp-display text-xl font-bold tracking-wide">
          {meta.label}
        </h2>
      </div>

      <p className="jp-mono text-xs uppercase tracking-widest text-[#33507D] dark:text-[#8FA6CE] mb-10">
        Question {current + 1} / {questions.length}
      </p>

      <div
        key={current}
        className="qa-card w-full max-w-md flex flex-col items-center bg-white/70 dark:bg-white/5 border border-[#33507D]/15 dark:border-white/10 rounded-2xl px-8 py-10 shadow-sm"
      >
        {quizType === "vocab" && currentQuestion.example && (
          <p className="text-sm text-[#33507D] dark:text-[#8FA6CE] mb-4 text-center">
            {currentQuestion.example}
          </p>
        )}

        <p className="jp-display text-4xl font-bold mb-8 text-center">
          {isFillUp
            ? currentQuestion.question || currentQuestion.word
            : currentQuestion.char ||
              currentQuestion.kanji ||
              currentQuestion.word}
        </p>

        {isFillUp ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFillUpSubmit()}
              disabled={feedback !== null}
              autoFocus
              className={`w-full px-4 py-3 rounded-lg text-center bg-transparent border-b-2 outline-none transition-colors jp-body
                ${feedback === "correct" ? "border-[#4E7A51] text-[#4E7A51]" : ""}
                ${feedback === "incorrect" ? "border-[#C1440E] text-[#C1440E]" : ""}
                ${feedback === null ? "border-[#33507D]/40 focus:border-[#1B2A4A] dark:border-white/30 dark:focus:border-white" : ""}
              `}
              placeholder="Type your answer…"
            />

            <button
              onClick={handleFillUpSubmit}
              disabled={feedback !== null}
              className="px-6 py-2 rounded-full bg-[#1B2A4A] text-white text-sm font-medium hover:bg-[#33507D] disabled:opacity-50 transition-colors cursor-pointer"
            >
              {feedback === "correct"
                ? "Correct ✓"
                : feedback === "incorrect"
                  ? "Incorrect ✕"
                  : "Submit"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 w-full">
            {options.map((opt, idx) => {
              let style =
                "bg-[#1B2A4A]/5 dark:bg-white/5 border-[#33507D]/20 dark:border-white/15 hover:bg-[#1B2A4A]/10 dark:hover:bg-white/10";

              if (selected) {
                if (opt === correctAnswer) {
                  style = "bg-[#4E7A51]/15 border-[#4E7A51] text-[#4E7A51]";
                } else if (opt === selected) {
                  style = "bg-[#C1440E]/10 border-[#C1440E] text-[#C1440E]";
                } else {
                  style =
                    "bg-transparent border-[#33507D]/10 dark:border-white/10 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleMCQAnswer(opt)}
                  disabled={selected !== null}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-150 cursor-pointer disabled:cursor-default ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-8">
        <HankoStamp value={`${score}/${questions.length}`} />
        <button
          onClick={requestExit}
          className="text-xs uppercase tracking-widest jp-mono text-[#33507D] dark:text-[#8FA6CE] hover:text-[#1B2A4A] dark:hover:text-white underline decoration-dotted underline-offset-4 cursor-pointer"
        >
          Exit Quiz
        </button>
      </div>

      {showResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#14161C]/70 backdrop-blur-sm z-50 p-6">
          <div className="qa-card bg-[#EEEFE6] dark:bg-[#1D2027] text-[#24211E] dark:text-[#EDEBE3] p-8 rounded-2xl shadow-2xl text-center w-full max-w-xs border border-[#33507D]/15 dark:border-white/10">
            <h2 className="jp-display text-2xl font-bold mb-6">
              Quiz Complete
            </h2>

            <div className="flex justify-center mb-6">
              <HankoStamp value={`${score}/${questions.length}`} size="lg" />
            </div>

            <p className="jp-mono text-xs uppercase tracking-widest text-[#33507D] dark:text-[#8FA6CE] mb-8">
              {meta.label} · {Math.round((score / questions.length) * 100)}%
              correct
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => startQuiz(quizType)}
                className="px-5 py-2 rounded-full bg-[#1B2A4A] text-white text-sm font-medium hover:bg-[#33507D] transition-colors cursor-pointer"
              >
                Retry
              </button>

              <button
                onClick={() => {
                  setShowResult(false);
                  setQuizType(null);
                  setQuestions([]);
                }}
                className="px-5 py-2 rounded-full border border-[#33507D]/30 dark:border-white/20 text-sm font-medium hover:bg-[#1B2A4A]/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
