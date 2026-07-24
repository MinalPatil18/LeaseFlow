import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-md)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[var(--shadow-lg)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;