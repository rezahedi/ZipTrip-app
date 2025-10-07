export interface Plan {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  type?: "Full day" | "Half day" | "Night";
  stopCount: number;
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
  categoryId: {
    _id: string;
    name: string;
    imageURL: string;
  };
  isBookmarked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Place {
  _id: string;
  name: string;
  imageURL: string;
  address: string;
  location: [number, number];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Stop {
  _id: string;
  planId: string;
  name: string;
  imageURL: string;
  address: string;
  description: string;
  location: [number, number];
  sequence: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlanWithStops extends Plan {
  stops: Stop[];
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  imageURL: string;
  token: string;
}
