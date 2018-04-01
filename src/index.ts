import { Logger, Config } from "homebridge";

import { API, User, PlatformAccessory, Platform } from "homebridge";
import * as hap from "hap-nodejs";
import { AirQualityState } from "hap-nodejs/HomeKitTypes";
import { promisify } from "util";
import fetch from "node-fetch";
import { AirQualityQuery } from "./graphql/operation-result-types";

// import * as airquality from "./graphql/queries/airquality.graphql";

var Accessory: typeof PlatformAccessory,
  Service: typeof hap.Service,
  Characteristic: typeof hap.Characteristic;

export = function(homebridge: API) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory(
    "homebridge-airquality",
    "Wheezy",
    WheezyAccessory
  );
};

type Callback = (error: Error | undefined, value: any | undefined) => void;

class WheezyAccessory extends hap.Accessory {
  log: Logger;
  service: hap.Service;

  constructor(log: Logger, config: Config) {
    super("WheezyAccessory", "22322821-3eac-4015-9898-da041bfa9851");
    this.service = new hap.Service.AirQualitySensor(
      "WheezySensor",
      "c57709e9-ae2d-4b18-82b5-b07afd7c52cc",
      "sensor1"
    );

    this.service
      .getCharacteristic(hap.Characteristic.AirQuality)
      .on("get", this.getMostRecentAirQuality.bind(this));

    this.service
      .getCharacteristic(hap.Characteristic.AirParticulateDensity)
      .on("get", this.getMostRecentAirQualityDensity.bind(this));

    this.service
      .getCharacteristic(hap.Characteristic.AirParticulateSize)
      .on("get", this.getMostRecentAirParticulateSize.bind(this));
  }

  _airQualityStateFromString(value): AirQualityState {
    switch (value) {
      case "UNKNOWN":
        return hap.Characteristic.AirQuality.UNKNOWN;
      case "EXCELLENT":
        return hap.Characteristic.AirQuality.EXCELLENT;
      case "GOOD":
        return hap.Characteristic.AirQuality.GOOD;
      case "FAIR":
        return hap.Characteristic.AirQuality.FAIR;
      case "INFERIOR":
        return hap.Characteristic.AirQuality.INFERIOR;
      case "POOR":
        return hap.Characteristic.AirQuality.POOR;
      default:
        return hap.Characteristic.AirQuality.UNKNOWN;
    }
  }

  
  async _queryAQBot<T>(query: string): Promise<T> {
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const json = await response.json()
    return json.data;
  }

  getMostRecentAirQuality(callback: Callback) {
    // this.log.info("getting recent air quality");
    // TODO: this.log does not contain an 'info' property (fix declaration)
    const query = `
      query {
        airQuality {
          quality
        }
      }
    `;

    this._queryAQBot<AirQualityQuery>(query).then(data => {
      if (data.airQuality) {
        const quality = this._airQualityStateFromString(data.airQuality.quality);
        callback(undefined, quality);
      }      
    }).catch(error => callback(error, undefined));
  }

  getMostRecentAirQualityDensity(callback: Callback) {
    const query = `
      query {
        airQuality {
          particulate2_5
        }
      }
    `;

    this._queryAQBot<AirQualityQuery>(query).then(data => {
      if (data.airQuality) {
        callback(undefined, data.airQuality.particulate2_5);
      }
    }).catch(error => callback(error, undefined));    
  }

  getMostRecentAirParticulateSize(callback: Callback) {
    callback(undefined, hap.Characteristic.AirParticulateSize._2_5_M);
  }

  getServices(): hap.Service[] {
    return [this.service];
  }
}