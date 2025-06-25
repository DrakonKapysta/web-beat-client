import type React from "react";

import { Link } from "@tanstack/react-router";
import { CornerUpLeft } from "lucide-react";

interface BackLinkProps {
  to: string;
}

export const BackLink: React.FC<BackLinkProps> = ({ to }) => {
  return (
    <Link
      to={to}
      className="absolute top-4 left-4 rounded-md bg-white/20 hover:shadow-md hover:shadow-purple-300 hover:bg-white/30 max-w-10 max-h-10 w-full h-full flex items-center justify-center transition-colors"
    >
      <CornerUpLeft className="w-6 h-6 text-white" />
    </Link>
  );
};
