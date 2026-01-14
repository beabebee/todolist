import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger";

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: ButtonVariant;
}

export function Button({ 
    text, 
    onClick, 
    type = "button", 
    disabled = false, 
    variant = "primary"
}: ButtonProps) {

    const className = variant === "primary" 
        ? "btn btn-primary" 
        : `btn btn-ghost btn-${variant}`;

    return (
        <button 
            type={type} 
            className={className} 
            onClick={onClick} 
            disabled={disabled}
        >
            {text}
        </button>
    );
}