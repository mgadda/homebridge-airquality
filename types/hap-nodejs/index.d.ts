
import { EventEmitter } from 'events';

export class Accessory extends EventEmitter {
  constructor(displayName: string, UUID: string);

  displayName: string;
  UUID: string;
  aid: AID; 
  bridged: boolean;
  bridgedAccessories: Accessory[];
  reachable: boolean;
  category: Accessory.Category;
  services: Service[];
  cameraSource: Camera; 
  shouldPurgeUnusedIDs: boolean;

  addService(service: Service | Function); //TODO: add stroger typing on Function arm
  setPrimaryService(service: Service);
  removeService(service: Service);
  getService(name: string);
  updateReachability(reachable: boolean);
  addBridgedAccessory(accessory: Accessory, deferUpdate: boolean);
  addBridgedAccessories(accessories: Accessory[]);
  removeBridgedAccessory(accessory: Accessory, deferUpdate: boolean);
  removeBridgedAccessories(accessories: Accessory[]);
  removeAllBridgedAccessories();
  getCharacteristicByIID(iid: IID): Characteristic // TODO: is string correct?
  getBridgedAccessoryByAID(aid: AID): Accessory;
  findCharacteristic(aid: AID, iid: IID): Characteristic;
  configureCameraSource(cameraSource: Camera);
  setupURI(): string;
  disableUnusedIDPurge();
  enableUnusedIDPurge();
  purgeUnusedIDs();
  toHAP(opt: HAPOptions): Accessory.HAP;
  publish(info: Accessory.PublishInfo, allowInsecureRequest: boolean);  
  destroy();
}

export namespace Accessory {
  export enum Category {
    OTHER = 1,
    BRIDGE = 2,
    FAN = 3,
    GARAGE_DOOR_OPENER = 4,
    LIGHTBULB = 5,
    DOOR_LOCK = 6,
    OUTLET = 7,
    SWITCH = 8,
    THERMOSTAT = 9,
    SENSOR = 10,
    ALARM_SYSTEM = 11,
    SECURITY_SYSTEM = 11, //Added to conform to HAP naming
    DOOR = 12,
    WINDOW = 13,
    WINDOW_COVERING = 14,
    PROGRAMMABLE_SWITCH = 15,
    RANGE_EXTENDER = 16,
    CAMERA = 17,
    IP_CAMERA = 17, //Added to conform to HAP naming
    VIDEO_DOORBELL = 18,
    AIR_PURIFIER = 19,
    AIR_HEATER = 20, //Not in HAP Spec
    AIR_CONDITIONER = 21, //Not in HAP Spec
    AIR_HUMIDIFIER = 22, //Not in HAP Spec
    AIR_DEHUMIDIFIER = 23, // Not in HAP Spec
    APPLE_TV = 24,
    SPEAKER = 26,
    AIRPORT = 27,
    SPRINKLER = 28,
    FAUCET = 29,
    SHOWER_HEAD = 30
  }
  interface PublishInfo {
    username: string;
    pincode: string;
    category: Accessory.Category;
  } 
  interface HAP {
    aid: AID;
    services: Service.HAP[];
  }
}

interface HAPOptions {
  omitValues: boolean;  
}

type IID = string;
type AID = string;

export class Service extends EventEmitter {
  constructor(displayName: string, UUID: string, subtype: string | { toString(): string });
  
  displayName: string;
  UUID: string;
  subtype: string;
  iid: IID;
  characteristics: Characteristic[];
  optionalCharacteristics: Characteristic[];
  isHiddenService: boolean;
  isPrimaryService: boolean;
  linkedServices: Service[];

  addCharacteristic(characteristic: Characteristic | Function): Characteristic;
  setHiddenService(isHidden: boolean);
  addLinkedService(newLinkedService: Service);
  removeLinkedService(oldLinkedService: Service);
  removeCharacteristic(characteristic: Characteristic);
  getCharacteristic(name: Service.CharacteristicLike);
  testCharacteristic(nane: Service.CharacteristicLike): boolean;
  setCharacteristic(name: Service.CharacteristicLike, value: any): Service // TODO: define value type
  updateCharacteristic(name: Service.CharacteristicLike, value: any): Service;
  addOptionalCharacteristic(characteristic: Characteristic);
  getCharacteristicByIID(iid: IID): Characteristic;
  toHAP(opt: HAPOptions): Service.HAP;
}
export namespace Service {
  interface HAP {
    iid: IID;
    type: string;
    characteristics: Characteristic.HAP
  }
  type CharacteristicLike = string | (typeof Characteristic) | { UUID: string };
}

export class Characteristic {}
export namespace Characteristic {
  interface HAP {
    // TODO: define type
  }
}
export class Bridge {}
export class Camera {}

