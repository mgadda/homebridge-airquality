import * as hap from 'hap-nodejs';

// ./lib/version.js
export function getVersion(): string;

// ./lib/user.js

type Config = any;  // TODO: what is this type?

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


// export interface User {
//   // static config(): Config;
//   // static storagePath(): string;
//   // static configPath(): string;
//   // static persistPath(): string;
//   // static cachedAccessoryPath(): string;
//   // static setStoragePath(): void;
//   test: string
// }

// export var User: { 
//   new(): User 
//   config(): Config
// }

// ./lib/api.js

export interface API {
  version: number;  
  serverVersion: string;
  user: typeof User;
  hap2: typeof hap;
  hap: { // TODO: is there a better way to re-export these? (typeof hap does not work)
    Accessory: hap.Accessory,
    Bridge: hap.Bridge,
    Camera: hap.Camera,
    Characteristic: hap.Characteristic,
    Service: hap.Service
  };
}

