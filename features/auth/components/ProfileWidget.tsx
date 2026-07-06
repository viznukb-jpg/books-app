import React from "react";

interface ProfileWidgetProps {
  name: string;
  email: string;
}

export function ProfileWidget({ name, email }: ProfileWidgetProps) {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex flex-col text-right">
        <span className="font-semibold text-gray-900 text-sm">{name}</span>
        <span className="text-gray-500 text-xs">{email}</span>
      </div>
      <div className="flex justify-center items-center bg-blue-100 shadow-sm border border-blue-200 rounded-full w-9 h-9 font-bold text-blue-700 text-sm">
        {initials}
      </div>
    </div>
  );
}
