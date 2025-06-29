import React, { memo } from "react";
import { Button } from "../ui/button";

export const TransportControlsNext = memo(() => {
  return (
    <Button
      variant="ghost"
      className="w-10 h-10 rounded-full text-white hover:bg-white/10"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
      </svg>
    </Button>
  );
});

TransportControlsNext.displayName = "TransportControlsNext";
