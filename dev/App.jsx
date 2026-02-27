import { useState } from "react";
import { MenuSelect } from "../lib/index";

export default function App() {
  const options = [
    { text: "Sales", value: "Sales" },
    { text: "Marketing", value: "Marketing" },
    { text: "Engineering", value: "Engineering" },
    { text: "Human Resources", value: "Human Resources" },
    { text: "Legal", value: "Legal" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <MenuSelect
      options={options}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
}
