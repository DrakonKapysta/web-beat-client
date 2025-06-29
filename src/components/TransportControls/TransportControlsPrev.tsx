import React, { memo } from "react";
import { Button } from "../ui/button";

export const TransportControlsPrev = memo(() => {
  return (
    <Button
      variant="ghost"
      className="w-10 h-10 rounded-full text-white hover:bg-white/10"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
      </svg>
    </Button>
  );
});

TransportControlsPrev.displayName = "TransportControlsPrev";
