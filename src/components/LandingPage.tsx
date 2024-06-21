import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LandingPage: React.FC = () => {
  const [placeholder, setPlaceholder] = useState("");
  const placeholderText = "Powered by AI.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholderText.slice(0, index));
      index++;
      if (index > placeholderText.length) {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, []);

    return (
      <div className="overflow-hidden h-screen relative">
        <Helmet title="Use punctuate"/>
        <svg
          width="326"
          height="481"
          viewBox="0 0 326 481"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-40 -top-40 rotate-180 md:-right-10 md:-top-20 landscape-1024:-top-40"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M76.21 2.95805C123.75 11.9324 220.214 88.6114 256.972 130.486C291.132 169.401 304.345 189.375 317.648 246.471C330.408 301.235 317.321 387.28 314.062 444.142C309.886 517.013 348.414 619.912 302.342 658.42C254.948 698.032 196.17 626.275 141.579 606.7C105.289 593.688 70.7602 583.994 36.5056 563.1C-6.11627 537.102 -65.4808 528.983 -81.9188 470.375C-98.3333 411.849 -44.8493 360.576 -37.468 299.348C-28.3839 223.988 -72.4886 131.697 -34.3162 75.498C2.6531 21.0705 21.2074 -7.42495 76.21 2.95805Z"
            fill="url(#paint0_linear_1_496)"
            fillOpacity="0.3"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_496"
              x1="-22.6874"
              y1="577.041"
              x2="222.351"
              y2="144.828"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity="0" />
              <stop offset="1" stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>
          </defs>
        </svg>

        <div className="w-11/12 shadow-sm z-50 m-auto h-52 mt-[50%] grid place-items-center text-center text-gray-900 border md:mt-[40%] md:w-[80%] md:h-72 landscape-1024:mt-[10%] landscape-1024:w-[60%]">
          <h1 className="font-bold text-2xl md:text-4xl landscape-1024:text-2xl">
            Punctuations Simplified.
          </h1>
          <p className="font-medium -mt-5 md:text-2xl landscape-1024:text-xl">
            Apply accurate punctuations to your writing.
          </p>
          <p className="font-medium md:text-2xl landscape-1024:text-xl landscape-1024:-mt-2 ">
            {placeholder}
          </p>
          <Link to={'/Punctuate'} title="Apply punctuation" className="w-[60%]">
            <button className="bg-blue-100 font-medium w-full rounded-2xl border border-blue-100 cursor-pointer md:h-16 md:rounded-3xl md:text-2xl landscape-1024:h-[50px] landscape-1024:text-xl ">
              Use Punctuate
            </button>
          </Link>
        </div>
        <svg
          width="281"
          height="367"
          viewBox="0 0 281 367"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-[130px] -left-2 md:-bottom-[0px] md:left-0 landscape-1024:-bottom-20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M59.7867 1.08213C101.896 1.16596 143.55 13.4071 179.293 43.9531C212.51 72.3397 234.462 117.03 251.219 164.678C267.293 210.379 252.576 250.602 254.927 300.743C257.94 365.002 303.318 456.069 266.811 497.173C229.255 539.457 171.664 486.428 122.464 478.245C89.758 472.804 58.8835 469.972 27.2275 457.325C-12.1614 441.588 -64.4639 444.176 -84.0816 395.721C-103.672 347.333 -61.8906 293.883 -61.0591 239.259C-60.0362 172.029 -106.754 98.693 -78.7202 43.4396C-51.5701 -10.0705 11.0671 0.985262 59.7867 1.08213Z"
            fill="url(#paint0_linear_1_497)"
            fillOpacity="0.4"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_497"
              x1="-33.2834"
              y1="475.344"
              x2="119.695"
              y2="50.9413"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9EE6F7" stopOpacity="0" />
              <stop offset="1" stopColor="#9EE6F7" stopOpacity="0.46" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
}

export default LandingPage;