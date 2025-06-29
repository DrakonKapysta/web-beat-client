import React from "react";
import { TransportControlsContext } from "./TransportControlsContext";

export const useTransportControls = () => {
  const context = React.useContext(TransportControlsContext);
  if (!context) {
    throw new Error(
      "useTransportControls must be used within a TransportControlsContextProvider"
    );
  }
  return context;
};
