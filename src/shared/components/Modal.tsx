import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  backdropClassName?: string;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  className = "",
  backdropClassName = "",
  closeOnBackdrop = true,
  showCloseButton = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === dialogRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      className={`fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/40 ${backdropClassName}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative bg-neutral-900 rounded-lg shadow-lg p-6 max-w-[90vw] max-h-[90vh] overflow-y-auto ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="absolute right-2 top-2 text-2xl text-gray-400 hover:text-gray-700"
            onClick={onClose}
            aria-label="Zamknij"
            type="button"
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
