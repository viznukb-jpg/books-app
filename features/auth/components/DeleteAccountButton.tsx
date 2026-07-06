"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { useRouter } from "next/navigation";

export function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      setIsOpen(false);
      // Redirect and refresh page
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="md"
        onClick={() => setIsOpen(true)}
        className="hover:bg-red-50 font-semibold text-gray-500 hover:text-red-600"
      >
        Delete Account
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account? All your data, including favorite books and active sessions, will be permanently removed from the database. This action cannot be undone."
        confirmText="Delete Permanently"
        cancelText="Cancel"
        onConfirm={handleDelete}
        isDestructive={true}
        isLoading={isLoading}
      />
    </>
  );
}
