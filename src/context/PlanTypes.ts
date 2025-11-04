export interface PlaceType {
  _id?: string;
  placeId: string;
  name: string;
  imageURL: string;
  address: string;
  location: [number, number];
}

export interface PlanType {
  _id?: string;
  title?: string;
  description?: string;
  images?: string[];
  cities?: CityType[];
  stops?: PlaceType[];
  polyline?: string;
}

export interface CityType {
  placeId: string;
  name: string;
  imageURL?: string;
  location?: [number, number];
  plans?: number;
  viewport?: {
    high: [number, number];
    low: [number, number];
  };
}
