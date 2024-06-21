import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'

interface ResultOutputProps {
  result: string[];
}

const ResultOutput: React.FC<ResultOutputProps> = ({ result }) => {
  return (
    <div className="border border-gray-800 h-full">
      <div className="text-gray-800 lg:h-full lg:overflow-auto lg:text-3xl w-11/12 m-auto p-2 border landscape-1024:text-[17px] xl:large-screen-result-output">
        {result.length == 0 ? <p className="text-center mt-[120px]">Punctuation suggestions here <FontAwesomeIcon icon={faEye}/></p> : result}
      </div>
    </div>
  );
};

export default ResultOutput