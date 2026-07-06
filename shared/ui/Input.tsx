import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
