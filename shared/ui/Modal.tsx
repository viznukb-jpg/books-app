import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isDestructive = false,
  isLoading = false,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="z-[100] fixed inset-0 flex justify-center items-center p-4 sm:p-0">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div className="z-10 relative bg-white shadow-xl sm:my-8 border border-gray-200 rounded-lg w-full max-w-md overflow-hidden text-left">
        <div className="bg-white sm:p-6 px-4 pt-5 pb-4 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 w-full sm:text-left text-center">
              <h3 className="font-bold text-gray-900 text-lg leading-6">
                {title}
              </h3>
              {description && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">{description}</p>
                </div>
              )}
              {children && <div className="mt-4">{children}</div>}
            </div>
          </div>
        </div>
        <div className="sm:flex sm:flex-row-reverse gap-3 bg-gray-50 px-4 sm:px-6 py-3">
          {onConfirm && (
            <Button
              className="w-full sm:w-auto"
              variant={isDestructive ? "destructive" : "primary"}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : confirmText}
            </Button>
          )}
          <Button
            className="mt-3 sm:mt-0 w-full sm:w-auto"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
