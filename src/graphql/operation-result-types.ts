/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum Quality {
  EXCELLENT = "EXCELLENT",
  FAIR = "FAIR",
  GOOD = "GOOD",
  INFERIOR = "INFERIOR",
  POOR = "POOR",
  UNKNOWN = "UNKNOWN",
}


export interface AirQualityQuery {
  air_quality:  {
    __typename: "AirQuality",
    quality: Quality | null,
    particulate2_5: number | null,
  } | null,
};
