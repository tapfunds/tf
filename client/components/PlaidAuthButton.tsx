"use client";
import { usePlaidLink } from "react-plaid-link";
import { useState } from "react";

export default function ConnectBank() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  // Fetch Link Token from Plaid when component mounts
  async function getLinkToken() {
    const res = await fetch("/api/plaid/link-token", { method: "POST" });
    const data = await res.json();
    setLinkToken(data.link_token);
  }

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess: async (public_token) => {
      const res = await fetch("/api/plaid/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token }),
      });
      const data = await res.json();
      console.log("Access Token:", data.access_token);
    },
  });

  return (
    <div>
      <button onClick={getLinkToken}>Generate Link Token</button>
      {linkToken && (
        <button onClick={() => open()} disabled={!ready}>
          Connect a Bank
        </button>
      )}
    </div>
  );
}
