import React from "react";

interface ProfileWidgetProps {
  name: string;
  email: string;
}

export function ProfileWidget({ name, email }: ProfileWidgetProps) {
  // Take the first 2 letters of the name for the avatar
  const initials = name.substring(0, 2).toUpperCase();
  
  return (
    <div className="flex items-center gap-3">
      <div className="hidden flex-col text-right sm:flex">
        <span className="text-sm font-semibold text-gray-900">{name}</span>
        <span className="text-xs text-gray-500">{email}</span>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 shadow-sm border border-blue-200">
        {initials}
      </div>
    </div>
  );
}
