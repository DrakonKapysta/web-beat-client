import { useNavigate } from "@tanstack/react-router";
import React from "react";

export const RedirectTimer: React.FC = () => {
  const [timer, setTimer] = React.useState(5);
  const navigate = useNavigate();
  if (timer == 0) {
    navigate({ to: "/" });
  }
  return <div>RedirectTimer:React.FC</div>;
};
