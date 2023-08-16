"use client";

interface Props {
  onClick: () => void;
  text: string;
  ariaLabel: string;
  customStyles?: string;
}

const CustomButton: React.FC<Props> = ({
  onClick,
  text,
  ariaLabel,
  customStyles,
}) => {
  return (
    <button
      className={[
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded",
        customStyles && customStyles,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};

export default CustomButton;
