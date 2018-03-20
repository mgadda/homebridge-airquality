import * as hap from 'hap-nodejs';
import { EventEmitter } from 'events';

// ./lib/version.js
export function getVersion(): string;

// ./lib/user.js

type Config = object; // TODO: define type

declare var config: Config;
declare var customStoragePath: any;

export class User {
  static config(): Config;
  static storagePath(): string;
  static configPath(): string;
  static persistPath(): string;
  static cachedAccessoryPath(): string;
  static setStoragePath(): void;
  test: string;
}

// ./lib/api.js

export class API extends EventEmitter {
  
  version: number;  
  serverVersion: string;
  user: typeof User;
  hap2: typeof hap;
  hap: { // TODO: is there a better way to re-export these? (typeof hap does not work)
    Accessory: typeof hap.Accessory,
    Bridge: typeof hap.Bridge,
    Camera: typeof hap.Camera,
    Characteristic: typeof hap.Characteristic,
    Service: typeof hap.Service
  };
  hapLegacyTypes: hap.LegacyTypes;
  platformAccessory: typeof PlatformAccessory;

  accessory(name: string): hap.Accessory;
  registerAccessory<T extends hap.Accessory>(
    pluginName: string, 
    accessoryName: string, 
    constructor: {new(): T; }, // TODO: verify type 
    configurationRequestHandler: API.ConfigurationRequestHandler
  );

  publishCameraAccessories(pluginName: string, accessories: hap.Accessory[]);
  platform(name: string): Platform
  registerPlatform(
    pluginName: string, 
    platformName: string, 
    constructor: typeof Platform, 
    dynamic: boolean
  );
  registerPlatformAccessories(
    pluginName: string, 
    platformName: string, 
    accessories: hap.Accessory[]
  );
  updatePlatformAccessories(accessories: hap.Accessory[]);
  unregisterPlatformAccessories(
    pluginName: string, 
    platformName: string, 
    accessories: hap.Accessory[]
  );
}

export namespace API {
  export type ConfigurationRequestHandler = (
    context: object, // TODO: verify type
    request: Request,  // TODO: verify type
    callback: API.Callback // TODO: verify type
  ) => void; // TODO: define type
  export type Callback = (
    response: any, // TODO: define type 
    type: string, 
    replace: boolean, 
    config: Config
  ) => void;
}

export abstract class Platform {
  constructor(log: Logger, api: API, config: any);
}

// lib/platformAccessory.js

export class PlatformAccessory extends EventEmitter {
  constructor(displayName: String, UUID: hap.UUID, category: hap.Accessory.Category);
  
  displayName: string;
  UUID: hap.UUID;
  category: hap.Accessory.Category;
  services: hap.Service[];
  reachable: boolean;
  context: object; // TODO: define type

  addService(service: hap.Service): hap.Service;
  removeService(service: hap.Service.ServiceLike);
  getService(name: hap.Service.ServiceLike): hap.Service;
  getServiceByUUIDAndSubType(
    UUID: hap.UUID | string | typeof hap.Service, 
    subtype: string
  ): hap.Service;

  updateReachability(reachable: boolean);
  configureCameraSource(cameraSource: hap.Camera);

}

// lib/logger.js

export class Logger {
  constructor(prefix: string);

  prefix: string;

  debug(msg: string);
  info(msg: string);
  warn(msg: string);
  error(msg: string);
  log(level: Logger.Level, msg: string);

  static withPrefix(prefix: string): Logger;
}

export namespace Logger {
  enum Level {
    Debug = 'debug',
    Warn = 'warn',
    Error = 'error',    
  }
}

export function setDebugEnabled(enabled: boolean);
