import { useState } from "react";

export default function MenuSelec({ options, selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleBtnClick() {
    setIsOpen((prevValue) => !prevValue);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div>
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
