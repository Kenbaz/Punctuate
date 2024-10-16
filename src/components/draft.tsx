// import { useEffect, FC, ChangeEvent, useCallback } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCloud } from "@fortawesome/free-solid-svg-icons";
// import punctuateTextLineByLine from "../services/punctuationService";
// import { debounce } from "lodash";

// interface TextInputProps {
//   onSubmit: (text: string[]) => void;
//   text: string;
//   setText: (text: string) => void;
//   loading: boolean;
//   isAutoCorrection: boolean;
// }

// const TextInput: FC<TextInputProps> = ({
//   onSubmit,
//   text,
//   setText,
//   loading,
//   isAutoCorrection,
// }) => {
//   const handleRealTimeProcessing = async (text: string) => {
//     if (text.trim() && !text.includes("[PROCESSED]")) {
//       try {
//         const processedText = await punctuateTextLineByLine(
//           [text],
//           isAutoCorrection
//         );
//         const markedText = `[PROCESSED]\n${processedText.join("\n")}`;
//         setText(markedText);
//       } catch (error) {
//         console.error("Failed to process text in real-time", error);
//       }
//     }
//   };

//   const debouncedHandleRealTimeProcessing = useCallback(
//     debounce((text: string) => {
//       handleRealTimeProcessing(text);
//     }, 6000),
//     [isAutoCorrection]
//   );

//   useEffect(() => {
//     debouncedHandleRealTimeProcessing(text);
//   }, [text, debouncedHandleRealTimeProcessing]);

//   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
//     setText(event.target.value.replace("[PROCESSED]\n", ""));
//   };

//   const handleSubmit = () => {
//     onSubmit([text]);
//   };

//   return (
//     <div className="border flex flex-col gap-4 h-full relative md:gap-8 xl:gap-4 landscape-1024:gap-4">
//       {text.trim() === "" && (
//         <p className="absolute pointer-events-none top-[9%] left-[30%] text-gray-800 font-semibold md:text-3xl md:left-[33%] landscape-1024:text-xl lg:left-[25%] xl:text-2xl">
//           Type | Paste | <FontAwesomeIcon icon={faCloud} />
//         </p>
//       )}
//       <textarea
//         className={`resize-none overflow-auto p-2 border text-base outline-none mt-1 m-auto textarea-container text-gray-800 transition-all duration-200 ease h-full w-11/12 rounded-lg bg-textarea_bg_color md:text-3xl landscape-1024:text-base xl:large-screen ${
//           loading ? "breathing" : ""
//         }`}
//         value={text.replace("[PROCESSED]\n", "")}
//         onChange={handleChange}
//         rows={10}
//         cols={50}
//       />
//       <button
//         className="ml-[31%] mb-1 bg-gray-800 md:ml-[37%] md:h-20 md:w-52 md:text-2xl xl:h-[50px] xl:ml-[35%] outline-none landscape-1024:h-12 landscape-1024:w-40 xl:large-screen-btn"
//         onClick={handleSubmit}
//         disabled={text.trim() === ""}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default TextInput;




// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import "../App.css";
// import TextInput from "./TextInput";
// import ResultOutput from "./ResultOutput";
// import punctuateTextLineByLine from "../services/punctuationService";
// import useDetectWindowSize from "../useDetectWindowSize";

// const PunctuateApp: React.FC = () => {
//   const [result, setResult] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [text, setText] = useState("");
//   const [isAutoCorrection, setIsAutoCorrection] = useState(true);
//   const { width } = useDetectWindowSize();

//   const isMobile = width <= 912;

//   const handleTextSubmit = async (lines: string[]) => {
//     const nonEmptyLines = lines.filter((line) => line.trim() !== "");

//     if (nonEmptyLines.length === 0) {
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult([]);

//     try {
//       const processedLines = await punctuateTextLineByLine(
//         nonEmptyLines,
//         isAutoCorrection
//       );
//       setResult(processedLines);
//       if (isMobile) {
//         setText(processedLines.join("\n"));
//       }
//     } catch (err) {
//       setError("Failed to process text");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="h-screen overflow-hidden lg:overflow-auto lg:grid-container">
//       <Helmet title="punctuate" />
//       <div className="App h-full">
//         <label>
//           <input
//             type="checkbox"
//             checked={isAutoCorrection}
//             onChange={() => setIsAutoCorrection(!isAutoCorrection)}
//           />
//           Automatic Corrections
//         </label>
//         <TextInput
//           onSubmit={handleTextSubmit}
//           text={text}
//           setText={setText}
//           loading={loading}
//           isAutoCorrection={isAutoCorrection}
//         />
//         {isMobile && <ResultOutput result={result} />}
//         {error && <p className="text-gray-800">{error}</p>}
//       </div>
//       <div className="hidden lg:block">
//         <ResultOutput result={result} />
//       </div>
//     </main>
//   );
// };

// export default PunctuateApp;



// import openai from "../config/openaiConfig";

// async function punctuateTextLineByLine(
//   text: string[],
//   isAutoCorrection: boolean
// ): Promise<string[]> {
//   const results: string[] = [];

//   for (const line of text) {
//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: isAutoCorrection
//               ? "You are an English Language Professor. You correct wrong punctuations and apply the punctuations in its right position."
//               : "You are an English Language Professor. You highlight wrong punctuation, spellings, and grammar. Mark spelling errors with [SPELL], punctuation errors with [PUNC], and grammar errors with [GRAM]. Provide the suggestions after the marked errors.",
//           },
//           {
//             role: "user",
//             content: isAutoCorrection
//               ? `Correct the punctuation, spelling and grammar of the following text:\n\n${line}`
//               : `Highlight and suggest corrections for the punctuation spelling, and grammatical errors in the following text without correcting the text:\n\n${line}`,
//           },
//         ],
//         n: 1,
//         stop: null,
//         temperature: 0.5,
//       });

//       const processedLine = response.choices?.[0]?.message?.content?.trim();
//       if (processedLine) {
//         results.push(processedLine);
//       } else {
//         console.log("Invalid response format:", response);
//         results.push(line);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       results.push(line);
//     }
//   }
//   return results;
// }

// export default punctuateTextLineByLine;
