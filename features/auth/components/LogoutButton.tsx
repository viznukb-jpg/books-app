"use client";

import { Button } from "@/shared/ui/Button";
import { authClient } from "@/shared/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <Button 
      variant="outline" 
      size="md" 
      onClick={handleLogout} 
      disabled={isLoading}
      className="font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-sm"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}
