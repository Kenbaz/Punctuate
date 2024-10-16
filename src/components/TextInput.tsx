import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "./FileUpload";

interface TextInputProps {
  onSubmit: (text: string[]) => void;
  text: string;
  setText: (text: string) => void;
  loading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  onSubmit,
  text,
  setText,
  loading,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleSubmit() {
    onSubmit([text]);
  }

  function handleFileRead(content: string) {
    setText(content);
  }

  return (
    <div className="border flex flex-col gap-4 h-full relative md:gap-8 xl:gap-4 landscape-1024:gap-4">
      {text.trim() === "" && (
        <div className="absolute top-[9%] flex items-center gap-2 left-[30%] text-gray-800 font-semibold md:text-3xl md:left-[33%] landscape-1024:text-xl lg:left-[25%] xl:text-2xl">
          <span>Type | Paste |</span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCloud} />
            <FileUpload onFileRead={handleFileRead} />
          </span>
        </div>
      )}
      <textarea
        className={`resize-none p-2 border text-base outline-none mt-1  m-auto textarea-container text-gray-800 transition-all duration-200 ease h-full w-11/12 rounded-lg bg-textarea_bg_color md:text-3xl landscape-1024:text-base xl:large-screen ${
          loading ? "breathing" : ""
        }`}
        value={text}
        onChange={handleChange}
        rows={10}
        cols={50}
      />
      <button
        className="ml-[31%] mb-1 bg-gray-800 md:ml-[37%] md:h-20 md:w-52 md:text-2xl xl:h-[50px] xl:ml-[35%] outline-none landscape-1024:h-12 landscape-1024:w-40 xl:large-screen-btn"
        onClick={handleSubmit}
        disabled={text.trim() === ""}
      >
        Submit
      </button>
    </div>
  );
};

export default TextInput;
