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
  const [selectedOption1, setSelectedOption1] = useState(options[0]);
  const [selectedOption2, setSelectedOption2] = useState(options[0]);

  return (
    <main>
      <p id="department-label">Select a department</p>
      <MenuSelect
        options={options}
        selectedOption={selectedOption1}
        setSelectedOption={setSelectedOption1}
        labelledby="department-label"
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in ultricies
        nisi. Aliquam magna urna, iaculis vel ante hendrerit, sollicitudin ornare nulla.
        Vivamus vitae pretium nunc. Vivamus pellentesque sagittis leo et semper. Aliquam
        vel mi vel magna pharetra auctor. Praesent sed nulla sit amet ligula porttitor
        bibendum ut consectetur lacus. Etiam est metus, sollicitudin vel dignissim non,
        mollis in metus. Pellentesque tristique sagittis blandit. Etiam in ex mattis,
        congue lacus at, auctor orci. In volutpat euismod erat, non bibendum arcu pretium
        et. Integer ut ex lacus. Nulla porttitor massa at imperdiet tristique. Sed
        aliquam, ante vitae dictum ultrices, nulla diam vehicula nisi, quis elementum
        dolor erat vel diam.
      </p>
      <MenuSelect
        options={options}
        selectedOption={selectedOption2}
        setSelectedOption={setSelectedOption2}
        labelledby="department-label"
        size="small"
      />
    </main>
  );
}
