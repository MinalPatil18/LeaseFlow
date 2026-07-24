import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-[var(--border)]
          bg-white
          px-4
          py-3
          text-[15px]
          text-[var(--text-primary)]
          outline-none
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-pink-400
          focus:ring-4
          focus:ring-pink-100
          ${className}
        `}
      />
    </div>
  );
}

export default Input;