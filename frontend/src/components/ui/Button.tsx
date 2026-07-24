import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-2xl
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        transition-all
        duration-300
        bg-gradient-to-r
        from-pink-500
        to-violet-500
        hover:-translate-y-1
        hover:shadow-xl
        active:translate-y-0
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;