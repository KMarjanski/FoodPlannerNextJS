import React from "react";

interface SectionBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements; // np. 'div', 'section', 'article'
}

/**
 * Uniwersalny kontener z borderem, shadow, rounded, tłem, paddingiem.
 * Domyślnie <div>, można zmienić przez prop as.
 */
const SectionBox: React.FC<SectionBoxProps> = ({
  children,
  className = "",
  style = {},
  as = "div"
}) => {
  const Tag = as;
  return (
    <Tag
      className={`bg-neutral-900 rounded-lg shadow-md border border-gray-200 p-4 ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default SectionBox;
