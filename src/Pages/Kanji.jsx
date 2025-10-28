import React from "react";
import kanjiData from "../data/kanji.json";

const Kanji = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Basic Kanji (1–100)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border px-4 py-2">Kanji</th>
              <th className="border px-4 py-2">Meaning</th>
              <th className="border px-4 py-2">Onyomi</th>
              <th className="border px-4 py-2">Kunyomi</th>
            </tr>
          </thead>
          <tbody>
            {kanjiData.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2 font-bold">{item.kanji}</td>
                <td className="border px-4 py-2">{item.meaning}</td>
                <td className="border px-4 py-2">{item.onyomi}</td>
                <td className="border px-4 py-2">{item.kunyomi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kanji;