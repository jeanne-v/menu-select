import { useState, useEffect, useRef, useId } from "react";
import chevron from "./assets/chevron.svg";
import clsx from "clsx";
import styles from "./MenuSelect.module.css";

export default function MenuSelect({
  options,
  selectedOption,
  setSelectedOption,
  labelledby = null,
  focusedOptionBgColor = "#4552FF",
  focusedOptionTextColor = "#ffffff",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(
    options.findIndex((option) => option.value === selectedOption.value),
  );
  const wrapperRef = useRef(null);

  const listBoxId = useId();

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
    <div
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
      className={clsx(styles.wrapper, isOpen && styles.open)}
    >
      <button
        onClick={handleBtnClick}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listBoxId}
        aria-activedescendant={isOpen ? options[focusedOptionIndex].value : null}
        aria-labelledby={labelledby ? labelledby : null}
        type="button"
        role="combobox"
        data-value={selectedOption.value}
        className={styles.button}
      >
        <span>{selectedOption.text}</span>
        <img alt="" src={chevron} className={styles.icon} />
      </button>
      {isOpen && (
        <div role="listbox" id={listBoxId} className={styles.listbox}>
          {options.map((option, index) => {
            const isSelectedOption = selectedOption.value === option.value;
            const isFocusedOption = options[focusedOptionIndex].value === option.value;
            const additionalStyles = isFocusedOption
              ? { backgroundColor: focusedOptionBgColor, color: focusedOptionTextColor }
              : {};

            return (
              <div
                role="option"
                aria-selected={isSelectedOption}
                data-value={option.value}
                id={option.value}
                key={`${index}-${option.value}`}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => handleOptionMouseEnter(index)}
                className={styles.option}
                style={additionalStyles}
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
