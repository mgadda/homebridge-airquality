import * as http from 'http';

import { API, User, Logger, Config, PlatformAccessory, Platform } from "homebridge";
import * as hap from "hap-nodejs";

var Accessory: typeof PlatformAccessory, 
    Service: typeof hap.Service, 
    Characteristic: typeof hap.Characteristic;
  

export default initializePlugin;

function initializePlugin(homebridge: API) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;  
  Accessory = homebridge.platformAccessory; 
  // homebridge.registerAccessory("airquality-plugin", "AirQuality", AirQuality, () => {});
  homebridge.registerPlatform(
    "airquality-plugin", 
    "airquality-platform", 
    AirQualityPlatform, 
    false
  );
  
}

class AirQualityPlatform extends Platform {
  log: Logger;
  api: API;
  config: any;
  accessories: PlatformAccessory[];

  constructor(log: Logger, api: API, config: any) {    
    super(log, api, config);
    this.log = log;
    this.api = api;
    this.config = config;

    this.accessories = [
      new Accessory(
        "Air Quality", 
        "6c385c44-7402-4e7a-aec1-9d16890533da", 
        hap.Accessory.Category.Sensor
      ),
    ];
  }
}
