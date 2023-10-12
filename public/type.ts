export interface Root {
  data: Data;
}

export interface Data {
  data: any;
  type: string;
  name: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  nom: string;
  lat: any;
  lng: any;
  num?: string;
  voie: string;
  ville?: string;
  codepostal?: string;
  markerinnerhtml: string;
  liinnerhtml: string;
  addresse: string;
}

export interface Geometry {
  type: string;
  coordinates: any[];
}
