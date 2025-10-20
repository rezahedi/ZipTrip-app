import { ColorScheme } from "@vis.gl/react-google-maps";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay = 500,
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function handleThemeSwitch() {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

export function getThemeColor(): ColorScheme {
  const userTheme = localStorage.getItem("theme") || null;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const initTheme =
    userTheme !== null ? userTheme : systemTheme.matches ? "dark" : "system";

  if (initTheme === "dark") return ColorScheme.DARK;
  if (initTheme === "light") return ColorScheme.LIGHT;
  return ColorScheme.FOLLOW_SYSTEM;
}
