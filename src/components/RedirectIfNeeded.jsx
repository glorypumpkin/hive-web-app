'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RedirectIfNeeded({ children }) {
    const { data: session } = useSession();
    if (session) {
        redirect("/dashboard");
    }
    return children;
}