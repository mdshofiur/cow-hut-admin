import { Document, Schema } from "mongoose";

enum CowLocation {
  Dhaka = "Dhaka",
  Chattogram = "Chattogram",
  Barishal = "Barishal",
  Rajshahi = "Rajshahi",
  Sylhet = "Sylhet",
  Comilla = "Comilla",
  Rangpur = "Rangpur",
  Mymensingh = "Mymensingh",
}

enum CowBreed {
  Brahman = "Brahman",
  Nellore = "Nellore",
  Sahiwal = "Sahiwal",
  Gir = "Gir",
  Indigenous = "Indigenous",
  Tharparkar = "Tharparkar",
  Kankrej = "Kankrej",
}

enum CowLabel {
  ForSale = "for sale",
  SoldOut = "sold out",
}

enum CowCategory {
  Dairy = "Dairy",
  Beef = "Beef",
  DualPurpose = "Dual Purpose",
}

export interface ICow extends Document {
  name: string;
  age: number;
  price: number;
  location: CowLocation;
  breed: CowBreed;
  weight: number;
  label: CowLabel;
  category: CowCategory;
  seller: Schema.Types.ObjectId;
}

export { CowLocation, CowBreed, CowLabel, CowCategory };
