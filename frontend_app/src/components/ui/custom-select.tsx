import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value = "",
  onChange,
  placeholder = "Sélectionnez une option",
  name,
  required = false,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Synchroniser avec la valeur externe
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Naviguer vers le bas dans les options
          const currentIndex = options.findIndex(
            (opt) => opt.value === selectedValue
          );
          const nextIndex = Math.min(currentIndex + 1, options.length - 1);
          handleSelect(options[nextIndex].value);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          // Naviguer vers le haut dans les options
          const currentIndex = options.findIndex(
            (opt) => opt.value === selectedValue
          );
          const prevIndex = Math.max(currentIndex - 1, 0);
          handleSelect(options[prevIndex].value);
        }
        break;
    }
  };

  return (
    <div className="relative" ref={selectRef}>
      {/* Input caché pour les formulaires */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedValue}
          required={required}
        />
      )}

      {/* Trigger */}
      <div
        className={cn(
          // Base styles suivant le pattern des inputs
          "flex w-full items-center justify-between gap-2 border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow,border-color,background-color] outline-none cursor-pointer",
          "border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30 focus:ring-yellow-500 focus:ring-2 focus:border-white/40 rounded-xl backdrop-blur-sm",
          // États
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "ring-yellow-500 ring-2 border-white/40",
          className
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={cn("flex-1 truncate", !selectedOption && "text-white/50")}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDownIcon
          className={cn(
            "size-4 text-white/70 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto border border-white/20 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          <div className="p-1" role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-lg py-2 pl-3 pr-8 text-sm outline-none transition-colors duration-150",
                  "hover:bg-white/15 focus:bg-white/20 text-white",
                  selectedValue === option.value &&
                    "bg-yellow-500/20 text-yellow-300 font-medium"
                )}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={selectedValue === option.value}
              >
                <span className="flex-1 truncate font-medium">
                  {option.label}
                </span>

                {selectedValue === option.value && (
                  <CheckIcon className="size-4 text-yellow-400 absolute right-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
