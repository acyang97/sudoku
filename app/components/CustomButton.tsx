"use client";

interface Props {
  onClick: () => void;
  text: string;
  customStyles?: string;
}

const CustomButton: React.FC<Props> = ({ onClick, text, customStyles }) => {
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
    >
      {text}
    </button>
  );
};

export default CustomButton;
