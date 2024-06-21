import { useState, useEffect } from "react";

const useDetectWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    }); // windowSize initialized with the current window size

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            }); // function to update the windowSize state with the current window
        };

        window.addEventListener('resize', handleWindowResize); //EventListener calls the handleWindowResize function to update state whenever the window size changes
        return () => window.removeEventListener('resize', handleWindowResize) // clean up function for when the component unMounts
    }, []);

    return windowSize; 
}

export default useDetectWindowSize;