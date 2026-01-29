import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string; // Tailwind bg color, e.g. 'bg-blue-200'
  textColor?: string; // Tailwind text color, e.g. 'text-blue-900'
  className?: string;
  onClick?: () => void;
  title?: string;
  style?: React.CSSProperties;
  forceButton?: boolean; // wymuś <button> nawet bez onClick
}

/**
 * Uniwersalny komponent Badge z obsługą koloru/tła przez propsy.
 * Domyślne style: zaokrąglenie, padding, font, flex.
 */

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "bg-emerald-100",
  textColor = "text-emerald-900",
  className = "",
  onClick,
  title,
  style,
  forceButton = false
}) => {
  const baseClass = `inline-block px-4 py-2 text-base font-semibold rounded-lg transition-colors duration-150 m-1 border shadow-sm ${color} ${textColor} ${className}`;
  const sharedProps = {
    className: baseClass + (onClick || forceButton ? ' cursor-pointer hover:bg-emerald-200 border-emerald-200' : ''),
    title,
    style: { display: 'inline-flex', alignItems: 'center', ...style },
  };
  if (onClick || forceButton) {
    return (
      <button type="button" {...sharedProps} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <span {...sharedProps}>
      {children}
    </span>
  );
};

export default Badge;
