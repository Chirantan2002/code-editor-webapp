import React from "react";
import "@/styles/DeleteDialogCard.css";

const DeleteDialogCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export default DeleteDialogCard;
