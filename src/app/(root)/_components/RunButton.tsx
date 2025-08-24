"use client";
import useMounted from "@/hooks/useMounted";

const RunButton = () => {
  const mounted = useMounted();
  if (!mounted) return null;

  return <div>Runbutton</div>;
};

export default RunButton;
