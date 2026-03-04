import { useState, useEffect, useRef } from "react";
import "./index.css";
import chevron from "./assets/chevron.svg";

export default function MenuSelec({
  options,
  selectedOption,
  setSelectedOption,
  labelledby = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(
    options.findIndex((option) => option.value === selectedOption.value),
  );
  const wrapperRef = useRef(null);

  function handleBtnClick() {
    setIsOpen((prevValue) => !prevValue);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  function handleOptionMouseEnter(optionIndex) {
    setFocusedOptionIndex(optionIndex);
  }

  function handleDocumentClick(e) {
    const target = e.target;
    if (!wrapperRef.current.contains(target)) {
      setIsOpen(false);
    }
  }

  function handleKeyDown(e) {
    const key = e.key;

    if (isOpen && key === "Escape") {
      setIsOpen(false);
    } else if (isOpen && key === "Enter") {
      setSelectedOption(options[focusedOptionIndex]);
    } else if (isOpen && key === " ") {
      setSelectedOption(options[focusedOptionIndex]);
    } else if (isOpen && key === "ArrowUp") {
      handleArrowKeyDownWhenOpen("ArrowUp");
    } else if (isOpen && key === "ArrowDown") {
      handleArrowKeyDownWhenOpen("ArrowDown");
    } else if (!isOpen && key === "ArrowUp") {
      setIsOpen(true);
    } else if (!isOpen && key === "ArrowDown") {
      setIsOpen(true);
    }
  }

  function handleArrowKeyDownWhenOpen(arrowKey) {
    if (arrowKey === "ArrowUp" && focusedOptionIndex !== 0) {
      setFocusedOptionIndex((prevValue) => prevValue - 1);
    } else if (arrowKey === "ArrowDown" && focusedOptionIndex < options.length - 1) {
      setFocusedOptionIndex((prevValue) => prevValue + 1);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <div ref={wrapperRef} onKeyDown={handleKeyDown} className="relative">
      <button
        onClick={handleBtnClick}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="listbox"
        aria-activedescendant={isOpen ? options[focusedOptionIndex].value : null}
        aria-labelledby={labelledby ? labelledby : null}
        type="button"
        role="combobox"
        data-value={selectedOption.value}
        className={`p-2 cursor-pointer w-full flex justify-between items-center h-10 border border-light-middle-grey ${isOpen ? "rounded-t-sm" : "rounded-sm"}`}
      >
        <span>{selectedOption.text}</span>
        <img alt="" src={chevron} className={`h-4 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div
          role="listbox"
          id="listbox"
          className="border-l border-r border-b border-light-middle-grey absolute left-0 top-10 bg-white w-full rounded-b-sm"
        >
          {options.map((option, index) => {
            const isSelectedOption = selectedOption.value === option.value;
            const isFocusedOption = options[focusedOptionIndex].value === option.value;
            return (
              <div
                role="option"
                aria-selected={isSelectedOption}
                data-value={option.value}
                id={option.value}
                key={`${index}-${option.value}`}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => handleOptionMouseEnter(index)}
                className={`p-2 cursor-pointer ${isFocusedOption ? "bg-blue text-white" : ""}`}
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
