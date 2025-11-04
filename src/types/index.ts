export interface Plan {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  cities: City[];
  type?: "Full day" | "Half day" | "Night";
  stopCount: number;
  polyline?: string;
  rate: number;
  reviewCount: number;
  startLocation: [number, number];
  finishLocation: [number, number];
  distance: number;
  duration: string;
  userId: {
    _id: string;
    name: string;
    imageURL: string;
  };
  isBookmarked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Place {
  _id?: string;
  placeId: string;
  name: string;
  state?: string;
  country: string;
  imageURL: string;
  address: string;
  location: [number, number];
  type: string;
  iconURL: string;
  iconBackground: string;
  summary: string;
  reviewSummary: string;
  rating: number;
  userRatingCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Stop {
  placeId: string;
  name: string;
  summary: string;
  type: string;
  state: string;
  country: string;
  address: string;
  imageURL: string;
  location: [number, number];
  rating: number;
  userRatingCount: number;
  reviewSummary: string;
  directionGoogleURI?: string;
  placeGoogleURI?: string;
}

export interface PlanWithStops extends Plan {
  stops: Stop[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  imageURL: string;
  token: string;
}

export interface City {
  _id: string;
  placeId: string;
  name: string;
  state?: string;
  country: string;
  imageURL: string;
  location: [number, number];
  viewport: {
    low: [number, number];
    high: [number, number];
  };
  plans: number;
}
