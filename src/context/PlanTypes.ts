export interface PlaceType {
  _id?: string;
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
  stops?: PlaceType[];
}
