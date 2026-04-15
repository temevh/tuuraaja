import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: Variant;
  /** Size preset */
  size?: Size;
  /** Stretch to fill parent width */
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 focus:ring-zinc-900 shadow-sm",
  secondary:
    "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 focus:ring-zinc-400 shadow-sm",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-300",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus:ring-red-600 shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-xl font-semibold tracking-wide",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-1",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        fullWidth ? "w-full" : "",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
