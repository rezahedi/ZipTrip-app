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

export function getBoundsFromViewport(viewport: {
  high: [number, number];
  low: [number, number];
}) {
  return {
    north: viewport.high[0],
    south: viewport.low[0],
    east: viewport.high[1],
    west: viewport.low[1],
  };
}

export function calculateBounds(locations: [number, number][], buffer = 0.1) {
  if (locations.length < 2) return null;

  let north = -90;
  let south = 90;
  let east = -180;
  let west = 180;

  locations.forEach((location) => {
    const [lat, lng] = location;
    if (lat > north) north = lat;
    if (lat < south) south = lat;
    if (lng > east) east = lng;
    if (lng < west) west = lng;
  });

  // 10% bounds buffer zone
  const latPadding = (north - south) * buffer;
  const lngPadding = (east - west) * buffer;

  north += latPadding;
  south -= latPadding;
  east += lngPadding;
  west -= lngPadding;

  return { north, south, east, west };
}
