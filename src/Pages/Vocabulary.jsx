import React from "react";
import vocabData from "../data/japanese_vocabulary.json";
import ThemeToggle from "../Components/Themes";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Vocabulary = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold mb-4">Vocabulary List</h2>
        <ThemeToggle />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border px-4 py-2">Kanji</th>
              <th className="border px-4 py-2">Furigana</th>
              <th className="border px-4 py-2">Romanji</th>
              <th className="border px-4 py-2">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {vocabData.map((item, idx) => (
              <tr key={idx} className="text-left">
                <td className="border px-4 py-2 font-bold">{item.kanji}</td>
                <td className="border px-4 py-2">{item.furigana}</td>
                <td className="border px-4 py-2">{item.romaji}</td>
                <td className="border px-4 py-2">{item.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vocabulary;
