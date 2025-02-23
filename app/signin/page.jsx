"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign In</h1>
      <button onClick={() => signIn("google", { callbackUrl: "/" })} style={{ padding: "10px 20px", marginTop: "20px" }}>
        Sign in with Google
      </button>
      <br />
      <button onClick={() => signIn("github", { callbackUrl: "/" })} style={{ padding: "10px 20px", marginTop: "20px" }}>
        Sign in with GitHub
      </button>
    </div>
  );
}
