import React, { useState, useRef, useEffect } from "react";
import { InputBox } from "@/components/commons/InputBox";
import styles from "./SearchableInputBox.module.sass";
import clsx from "clsx";

export interface ItemDropdown {
  value: string | number;
  label: string | number;
}

interface SearchableInputBoxProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  isRequired?: boolean;
  options: ItemDropdown[];
  selected: ItemDropdown;
  onSelect: (item: ItemDropdown) => void;
  isLoading?: boolean;
}

export const SearchableInputBox = ({
  label,
  disabled,
  error,
  isRequired = false,
  selected,
  options,
  onSelect,
  isLoading = false,
}: SearchableInputBoxProps) => {
  const [query, setQuery] = useState<string>(selected?.label.toString() || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter the options based on the query
  const filteredOptions = options.filter((option) =>
    option.label.toString().toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true); // Keep dropdown open when user types
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleSelect = (item: ItemDropdown) => {
    setQuery(item.label.toString());
    setIsOpen(false);
    onSelect(item);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setQuery(selected?.label.toString() || "");
  }, [selected?.label]);

  return (
    <div className={styles.searchableInputBox}>
      <InputBox
        type="text"
        label={label}
        disabled={disabled}
        error={error}
        isRequired={isRequired}
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {/* Dropdown for filtered options */}
      {isOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <ul>
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={clsx(styles.dropdown__item, {
                  [styles["dropdown__item--selected"]]:
                    selected?.value === option.value,
                })}
              >
                {option.label}
              </li>
            ))}
            {isLoading && <li className={styles.dropdown__item}>Loading...</li>}
            {!filteredOptions.length && !isLoading && (
              <li
                key="no-data"
                className={clsx([
                  styles.dropdown__item,
                  styles["dropdown__item--nodata"],
                ])}
              >
                Data not found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
