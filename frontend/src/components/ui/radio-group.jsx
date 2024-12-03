import React, { createContext, useContext, useState } from "react";

const RadioContext = createContext();

export function RadioGroup({ children, onValueChange, value: groupValue }) {
  const [value, setValue] = useState(groupValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <RadioContext.Provider value={{ value, onChange: handleChange }}>
      <div role="radiogroup">{children}</div>
    </RadioContext.Provider>
  );
}

export function RadioGroupItem({ value, id, children }) {
  const { value: groupValue, onChange } = useContext(RadioContext);
  const isChecked = value === groupValue;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        checked={isChecked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {children}
      </label>
    </div>
  );
}
