import React, { FC } from "react";

const Notification: FC = ({ children }) => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      {children}
    </div>
  );
};

export default Notification;
