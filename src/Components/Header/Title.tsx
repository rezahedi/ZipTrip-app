import { useEffect } from "react";

const Title = ({
  children,
  suffix = true,
}: {
  children: string;
  suffix?: boolean;
}) => {
  useEffect(() => {
    return () => {
      document.title = "ZipTrip - Your Ultimate Trip Planner";
    };
  }, []);

  useEffect(() => {
    if (children) document.title = children + (suffix ? " - ZipTrip" : "");
  }, [children]);

  return null;
};

export default Title;
