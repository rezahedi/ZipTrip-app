import React, { useEffect, useState } from "react";
import { XIcon } from "lucide-react";

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let status = await Number(localStorage.getItem("notificationBar") || 1);
      setIsVisible(status);
      localStorage.setItem("notificationBar", "0");
    })();
  }, []);

  if (!isVisible) return;

  return (
    <div className="top-0 w-full bg-primary text-background flex justify-between p-2 items-center">
      🚀 First request may be slow, server waking up on free Render.com account.
      Thanks!
      <XIcon className="cursor-pointer" onClick={() => setIsVisible(0)} />
    </div>
  );
};

export default NotificationBar;
