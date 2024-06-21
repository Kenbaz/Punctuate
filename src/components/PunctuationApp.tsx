import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../App.css";
import TextInput from "./TextInput";
import ResultOutput from "./ResultOutput";
import punctuateTextLineByLine from "../services/punctuationService";
import useDetectWindowSize from "../useDetectWindowSize";

const PunctuateApp: React.FC = () => {
  const [result, setResult] = useState<string[]>([]); // state to handle the proccessed text
  const [loading, setLoading] = useState(false); // state to handle loading state
  const [error, setError] = useState(""); // state to handle errors
  const [text, setText] = useState("");
  const { width } = useDetectWindowSize(); // Destructure width from useDetectWindowSize
  
  const isMobile = width <= 912;

  // Handle text submission
  const handleTextSubmit = async (lines: string[]) => {
    // Check if the input is empty
    const nonEmptyLines = lines.filter((line) => line.trim() !== "");

    if (nonEmptyLines.length === 0) {
      return;
    }

    setLoading(true); // start laoding
    setError(""); // clear any previous errors
    setResult([]); // clear previous results

    try {
      const processedLines = await punctuateTextLineByLine(nonEmptyLines);
      setResult(processedLines);
      if (isMobile) {
        setText(processedLines.join("\n")); //changes current text to processed text when screen is mobile sized
      } 
    } catch (err) {
      setError("Failed to process text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen overflow-hidden lg:overflow-auto lg:grid-container">
      <Helmet title="punctuate" />
      <div className="App h-full">
        <TextInput
          onSubmit={handleTextSubmit}
          text={text}
          setText={setText}
          loading={loading}
        />
        {isMobile && <ResultOutput result={result} />} 
        {error && <p className="text-gray-800">{error}</p>}
      </div>
      <div className="hidden lg:block">
        <ResultOutput result={result} />
      </div>
    </main>
  );
};

export default PunctuateApp;
