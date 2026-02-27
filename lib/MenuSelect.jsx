import { useState, useEffect, useRef } from "react";

export default function MenuSelec({ options, selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  function handleBtnClick() {
    setIsOpen((prevValue) => !prevValue);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  function handleDocumentClick(e) {
    const target = e.target;
    if (!wrapperRef.current.contains(target)) {
      setIsOpen(false);
    }
  }

  function handleKeyDown(e) {
    const key = e.key;

    if (key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <div ref={wrapperRef} onKeyDown={handleKeyDown}>
      <button
        onClick={handleBtnClick}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="listbox"
        type="button"
        role="combobox"
        data-value={selectedOption.value}
      >
        {selectedOption.text}
      </button>
      {isOpen && (
        <div role="listbox" id="listbox">
          {options.map((option, index) => {
            return (
              <div
                role="option"
                aria-selected={selectedOption.value === option.value}
                data-value={option.value}
                id={`${index}-${option.value}`}
                key={`${index}-${option.value}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
