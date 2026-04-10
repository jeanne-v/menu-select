[![NPM Version](https://img.shields.io/npm/v/%40jeanne-v%2Fmenu-select)
](https://www.npmjs.com/package/@jeanne-v/menu-select)

# Menu Select

This is a custom dropdown React component created for the [HRnet project](https://github.com/jeanne-v/hrnet) from OpenClassrooms' JS-React path.

## Installation

```
npm i @jeanne-v/menu-select
```

## Example

Here is an example of basic usage:

```javascript
import { useState } from "react";
import { MenuSelect } from "@jeanne-v/menu-select";
import "@jeanne-v/menu-select/style.css";

function App() {
  const options = [
    { text: "French", value: "fr" },
    { text: "English", value: "en" },
    { text: "Chinese", value: "zh" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <MenuSelect
      options={options}
      selectedOption={selectedOption}
      onOptionSelect={setSelectedOption}
    />
  );
}
```

## Configuration

| **Prop**               | **Description**                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| options                | Possible dropdown options. Must be an array of objects each with a unique `value` property and a `text` property.                 |
| selectedOption         | The selected option. Must be an object held in state with a `value` property and `text` property.                                 |
| onOptionSelect         | Function that will be called when an option is selected. Will be called with the selected option object.                          |
| labelledby             | Optional. The id of the element that will label the dropdown. Default is `null`.                                                  |
| focusedOptionBgColor   | Optional. The background color of the currently focused option. Default is `"#4552FF"`.                                           |
| focusedOptionTextColor | Optional. The text color of the currently focused option. Default is `"#FFFFFF"`.                                                 |
| size                   | Optional. Configures the size variant of the dropdown. Possible values are `"small"` and `"medium"`. Default value is `"medium"`. |
| className              | Optional. Additional classes to add to the custom dropdown `<div>` container element.                                             |
