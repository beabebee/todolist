import "./Button.css";

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

export function Button({text, onClick, type = "button", disabled = false}: ButtonProps) {
    return (
        <button type={type} className="btn" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}
