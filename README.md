# Menu Select

This is a custom dropdown React component.

## Example

Here is an example of basic usage :

```
import { useState } from "react";
import { MenuSelect } from "menu-select";
import "menu-select/style.css";

function App() {
  const languagesOptions = [
    { text: "French", value: "fr" },
    { text: "English", value: "en" },
    { text: "Chinese", value: "zh" },
  ];
  const [selectedLanguageOption, setSelectedLanguageOption] = useState(
    languagesOptions[0],
  );

  return (
      <MenuSelect
        options={languagesOptions}
        selectedOption={selectedLanguageOption}
        setSelectedOption={setSelectedLanguageOption}
      />
  );
}

```

## Configuration

| **Propname**           | **Description**                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| options                | Possible dropdown options. Must be an array of objects with each a unique value property and a text property.                |
| selectedOption         | The selected option. Must be an object held in state with a value property and text property.                                |
| setSelectedOption      | State setter function for the selectedOption value.                                                                          |
| labelledby             | Optionnal. The id of the element that will label the dropdown. Default is null.                                              |
| focusedOptionBgColor   | Optionnal. The background color of the currently focused option. Default is "#4552FF".                                       |
| focusedOptionTextColor | Optionnal. The text color of the currently focused option. Default is "#FFFFFF".                                             |
| size                   | Optionnal. Configures the size variant of the dropdown. Possible values are "small" and "medium". Default value is "medium". |
| className              | Optionnal. Additional classes to add to the custom dropdown &lt;div> container element.                                      |
