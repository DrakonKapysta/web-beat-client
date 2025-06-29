import React, { memo, type FC } from "react";
import {
  TransportControlsContext,
  type TransportControlsContextProps,
} from "./TransportControlsContext";
import { TransportControlsStart } from "./TransportControlsStart";
import { TransportControlsNext } from "./TransportControlsNext";
import { TransportControlsPrev } from "./TransportControlsPrev";
import { TransportControlsProgress } from "./TransportControlsProgress";
import { TransportControlsTime } from "./TransportControlsTime";
import { TransportControlsVolume } from "./TransportControlsVolume";

export interface TransportControlsWrapperProps
  extends TransportControlsContextProps {
  children: React.ReactNode;
}

const TransportControlsWrapper: FC<TransportControlsWrapperProps> = memo(
  ({ children, ...props }) => {
    return (
      <TransportControlsContext.Provider value={props}>
        {children}
      </TransportControlsContext.Provider>
    );
  }
);

const TransportControls = Object.assign(TransportControlsWrapper, {
  StartButton: TransportControlsStart,
  PrevButton: TransportControlsPrev,
  NextButton: TransportControlsNext,
  Progress: TransportControlsProgress,
  Time: TransportControlsTime,
  Volume: TransportControlsVolume,
});
TransportControls.displayName = "TransportControls";

export { TransportControls };
