import React from "react";
import katakanaData from "../data/katakana.json";
import ThemeToggle from "../Components/Themes";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Katakana = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold mb-4">Katakana Chart</h2>
        {/* <ThemeToggle /> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border px-4 py-2">Character</th>
              <th className="border px-4 py-2">Romanji</th>
            </tr>
          </thead>
          <tbody>
            {katakanaData.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2 font-bold">{item.char}</td>
                <td className="border px-4 py-2">{item.romanji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Katakana;
