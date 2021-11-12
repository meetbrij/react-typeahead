import {
   useCallback,
   useState,
   useEffect
} from "react";

function useRoveFocus(size) {
   const [currentFocus, setCurrentFocus] = useState(0);
   const [direction, setDirection] = useState('');

   const handleKeyDown = useCallback(
      e => {
         if (e.keyCode === 40) {
            // Down arrow
            e.preventDefault();
            setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
            setDirection('down');
         } else if (e.keyCode === 38) {
            // Up arrow
            e.preventDefault();
            setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
            setDirection('up');
         } else {
           setDirection('');
         }
      },
      [size, currentFocus, setCurrentFocus]
   );

   useEffect(() => {
      document.addEventListener("keydown", handleKeyDown, false);
      return () => {
         document.removeEventListener("keydown", handleKeyDown, false);
      };
   }, [handleKeyDown]);

   return [currentFocus, setCurrentFocus, direction];
}

export default useRoveFocus;
