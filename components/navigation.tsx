"use client";

type NavigationProps = {
  userRole?: string; // optional: "admin", "user", etc.
};

export default function Navigation({ userRole }: NavigationProps) {
  // safe to use client-side logic now
  return (
    <nav>
      <h1>Navigation</h1>
      {userRole && <p>Role: {userRole}</p>}
    </nav>
  );
}
