import { useEffect } from "react";

function useOutsideClick(
  openRef: React.RefObject<HTMLElement>,
  close: () => void,
  buttonRef?: React.RefObject<HTMLButtonElement>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (
        openRef.current &&
        !openRef.current.contains(event.target as Node) &&
        (!buttonRef ||
          (buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)))
      ) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "ESC") {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRef, buttonRef, close]);
}

export default useOutsideClick;
