// app/sign-up/[[...sign-up]]/page.tsx
"use client";

import { SignUp, useSignUp, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function CustomSignUpPage() {
  const [selectedRole, setSelectedRole] = useState<"student" | "counselor">("student");
  const { signUp } = useSignUp();
  const { user } = useClerk();

  // Update public metadata after user signs up
  useEffect(() => {
    const updateMetadata = async () => {
      if (signUp && signUp.status === "complete") {
        try {
          await signUp.update({
            publicMetadata: {
              role: selectedRole,
            },
          });
        } catch (err) {
          console.error("Failed to update role metadata:", err);
        }
      }
    };
    updateMetadata();
  }, [signUp, selectedRole]);

  return (
    <main className="flex h-screen w-full items-center justify-center flex-col gap-4">
      <div className="flex items-center gap-4">
        <label htmlFor="role">Registering as:</label>
        <select
          id="role"
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value as "student" | "counselor")}
          className="border px-2 py-1 rounded"
        >
          <option value="student">Student</option>
          <option value="counselor">Counselor</option>
        </select>
      </div>

      <SignUp path="/sign-up" routing="path" />
    </main>
  );
}
