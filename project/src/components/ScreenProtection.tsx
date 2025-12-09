import { useEffect } from "react";

const ScreenProtection = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" || 
        (e.ctrlKey && e.key === "p") || 
        (e.ctrlKey && e.shiftKey && e.key === "s") || 
        (e.ctrlKey && e.shiftKey && e.key === "i") || 
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};

export default ScreenProtection;