import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="route-shell">
      <div className="route-bar-flash" />
      <div className="route-sheen" />
      {children}
    </div>
  );
}
