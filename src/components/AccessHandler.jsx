'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AccessHandler({ children }) {
    const { data: session } = useSession();
    if (session === null) {
        redirect("/");
    }
    return children;
}