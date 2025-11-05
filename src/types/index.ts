// Used when fetching list of plans (cities field not populated and stops not included)
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
// Type of cities[] in plan document
export type City = {
  placeId: string;
  name: string;
};
// Type of Place when fetched from place collection
export interface Place {
  _id?: string;
  placeId: string;
  name: string;
  summary: string;
  type: string;
  state?: string;
  country: string;
  address: string;
  imageURL: string;
  location: [number, number];
  iconURL: string;
  iconBackground: string;
  reviewSummary: string;
  rating: number;
  userRatingCount: number;
  directionGoogleURI?: string;
  placeGoogleURI?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
// Type of stops[] in plan document
export interface Stop {
  placeId: string;
  name: string;
  note?: string;
  expense?: number;
  imageURL: string;
  address: string;
  location: [number, number];
}

// extend Stop with Place properties, both have common properties and unique properties
export interface StopDetail extends Stop, Place {}

// Used when plan fetched by id (in planDetail page and create/edit Plan page)
export interface PlanWithDetail extends Plan {
  stops: StopDetail[];
  cities: CityDetail[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  imageURL: string;
  token: string;
}

export interface CityDetail {
  _id: string;
  placeId: string;
  name: string;
  state?: string;
  country: string;
  imageURL: string;
  location: [number, number];
  viewport?: {
    low: [number, number];
    high: [number, number];
  };
  plans?: number;
}
// Used when sending plan detail to backend API for create or update plan operation
export type PlanDTO = {
  title: string;
  description?: string;
  images?: string[];
  cities?: { placeId: string; name: string }[];
  type?: "Full day" | "Half day" | "Night";
  stops: Place[];
};
