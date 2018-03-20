
import { EventEmitter } from 'events';


interface HAPOptions {
  omitValues: boolean;  
}

type UUID = string;
type IID = string;
type AID = string;

type ScalarValue = boolean | number | string;
export type Value = ScalarValue | Buffer | Array<ScalarValue> | object;

// lib/accessory.js

export class Accessory extends EventEmitter {
  constructor(displayName: string, UUID: UUID);

  displayName: string;
  UUID: UUID;
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
    Other = 1,
    Bridge = 2,
    Fan = 3,
    GarageDoorOpener = 4,
    LightBulb = 5,
    DoorLock = 6,
    Outlet = 7,
    Switch = 8,
    Thermostate = 9,
    Sensor = 10,
    AlarmSystem = 11,
    SecuritySystem = 11, //Added to conform to HAP naming
    Door = 12,
    Window = 13,
    WindowCovering = 14,
    ProgrammableSwitch = 15,
    RangeExtender = 16,
    Camera = 17,
    IPCamera = 17, //Added to conform to HAP naming
    VideoDoorbell = 18,
    AirPurifier = 19,
    AirHeater = 20, //Not in HAP Spec
    AirConditioner = 21, //Not in HAP Spec
    AirHumidifier = 22, //Not in HAP Spec
    AirDehumidifier = 23, // Not in HAP Spec
    AppleTV = 24,
    Speaker = 26,
    Airport = 27,
    Sprinkler = 28,
    Faucet = 29,
    ShowerHead = 30
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

// lib/service.js 

export class Service extends EventEmitter {
  constructor(displayName: string, UUID: UUID, subtype: string | { toString(): string });
  
  displayName: string;
  UUID: UUID;
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
  type CharacteristicLike = string | (typeof Characteristic);
  type ServiceLike = string | (typeof Service);
}

// lib/characteristic.js

export class Characteristic  extends EventEmitter {
  constructor(displayName: string, UUID: UUID, props: Characteristic.Props);

  displayName: string;
  UUID: UUID;
  iid: IID;
  value: Value; // TODO: verify type
  status: string; // TODO: verify type
  eventsOnlyCharacteristic: boolean;
  props: Characteristic.Props;
  subscriptions: number;

  setProps(props: Characteristic.Props);
  subscribe();
  unsubscribe();
  getValue(
    callback: Characteristic.Callback, 
    context: any, // TODO: define type
    connectionID: any // TODO: define type
  );
  validateValue(newValue: Value): Value;
  setValue(
    newValue: Value, 
    callback: Characteristic.Callback, 
    context: any, // TODO: define type
    connectionID: any // TODO: define type
  );
  updateValue(
    newValue: Value, 
    callback: Characteristic.Callback, 
    context: any // TODO: define type
  ); 
  getDefaultValue(): Value;
  toHAP(opt: HAPOptions): Characteristic.HAP;
}

export namespace Characteristic {
  type Callback = (status: string, value: Value) => void;

  interface HAP {
    iid: IID,
    type: UUID,
    perms: Perms[],
    format: Format,
    value: Value,
    description: string
  }
  interface Props {
    format: string,
    unit: string, 
    perms: Perms[]
    ev: boolean,
    description: string,    
    minValue: number, 
    maxValue: number,
    minStep: number, 
    maxLen: number, 
    maxDataLen: number,
    'valid-values': number[],
    'valid-values-range': number[]
  }
  
  enum Format {
    Bool = 'bool',
    Int = 'int',
    Float = 'float',
    String = 'string',
    UInt8 = 'uint8',
    UInt16 = 'uint16',
    UInt32 = 'uint32',
    UInt64 = 'uint64',
    Data = 'data',
    TLV8 = 'tlv8',
    Array = 'array', //Not in HAP Spec
    Dictionary = 'dictionary' //Not in HAP Spec
  }

  enum Units {
    Celsius = 'celsius',
    Percentage = 'percentage',
    ArcDegree = 'arcdegrees',
    LUX = 'lux',
    Seconds= 'seconds'
  }

  enum Perms {
    Read = 'pr', //Kept for backwards compatability
    PairedRead = 'pr', //Added to match HAP's terminology
    Write = 'pw', //Kept for backwards compatability
    PairedWrite = 'pw', //Added to match HAP's terminology
    Notify = 'ev', //Kept for backwards compatability
    Events = 'ev', //Added to match HAP's terminology
    AdditionalAuthorization = 'aa',
    TimedWrite = 'tw', //Not currently supported by IP
    Hidden = 'hd'
  }
}

export class Bridge {}
export class Camera {}

// lib/util/once.js

export function once(func: Function): Function;

// lib/accessories/types.js

// lib/accessories/types.js

export namespace LegacyTypes {
  enum HomeKitTransportCategoryTypes {
    OTHER_TCTYPE = 1,
    FAN_TCTYPE = 3,
    GARAGE_DOOR_OPENER_TCTYPE = 4,
    LIGHTBULB_TCTYPE = 5,
    DOOR_LOCK_TCTYPE = 6,
    OUTLET_TCTYPE = 7,
    SWITCH_TCTYPE = 8,
    THERMOSTAT_TCTYPE = 9,
    SENSOR_TCTYPE = 10,
    ALARM_SYSTEM_TCTYPE = 11,
    DOOR_TCTYPE = 12,
    WINDOW_TCTYPE = 13,
    WINDOW_COVERING_TCTYPE = 14,
    PROGRAMMABLE_SWITCH_TCTYPE = 15,    
  }  
  
  enum HomeKitServiceTypes {  
    LIGHTBULB_STYPE = "00000043-0000-1000-8000-0026BB765291",
    SWITCH_STYPE = "00000049-0000-1000-8000-0026BB765291",
    THERMOSTAT_STYPE = "0000004A-0000-1000-8000-0026BB765291",
    GARAGE_DOOR_OPENER_STYPE = "00000041-0000-1000-8000-0026BB765291",
    ACCESSORY_INFORMATION_STYPE = "0000003E-0000-1000-8000-0026BB765291",
    FAN_STYPE = "00000040-0000-1000-8000-0026BB765291",
    OUTLET_STYPE = "00000047-0000-1000-8000-0026BB765291",
    LOCK_MECHANISM_STYPE = "00000045-0000-1000-8000-0026BB765291",
    LOCK_MANAGEMENT_STYPE = "00000044-0000-1000-8000-0026BB765291",
    ALARM_STYPE = "0000007E-0000-1000-8000-0026BB765291",
    WINDOW_COVERING_STYPE = "0000008C-0000-1000-8000-0026BB765291",
    OCCUPANCY_SENSOR_STYPE = "00000086-0000-1000-8000-0026BB765291",
    CONTACT_SENSOR_STYPE = "00000080-0000-1000-8000-0026BB765291",
    MOTION_SENSOR_STYPE = "00000085-0000-1000-8000-0026BB765291",
    HUMIDITY_SENSOR_STYPE = "00000082-0000-1000-8000-0026BB765291",
    TEMPERATURE_SENSOR_STYPE = "0000008A-0000-1000-8000-0026BB765291"
  }

  enum HomeKitCharacteristicsTypes {
    ALARM_CURRENT_STATE_CTYPE = "00000066-0000-1000-8000-0026BB765291",
    ALARM_TARGET_STATE_CTYPE = "00000067-0000-1000-8000-0026BB765291",
    ADMIN_ONLY_ACCESS_CTYPE = "00000001-0000-1000-8000-0026BB765291",
    AUDIO_FEEDBACK_CTYPE = "00000005-0000-1000-8000-0026BB765291",
    BRIGHTNESS_CTYPE = "00000008-0000-1000-8000-0026BB765291",
    BATTERY_LEVEL_CTYPE = "00000068-0000-1000-8000-0026BB765291",
    COOLING_THRESHOLD_CTYPE = "0000000D-0000-1000-8000-0026BB765291",
    CONTACT_SENSOR_STATE_CTYPE = "0000006A-0000-1000-8000-0026BB765291",
    CURRENT_DOOR_STATE_CTYPE = "0000000E-0000-1000-8000-0026BB765291",
    CURRENT_LOCK_MECHANISM_STATE_CTYPE = "0000001D-0000-1000-8000-0026BB765291",
    CURRENT_RELATIVE_HUMIDITY_CTYPE = "00000010-0000-1000-8000-0026BB765291",
    CURRENT_TEMPERATURE_CTYPE = "00000011-0000-1000-8000-0026BB765291",
    HEATING_THRESHOLD_CTYPE = "00000012-0000-1000-8000-0026BB765291",
    HUE_CTYPE = "00000013-0000-1000-8000-0026BB765291",
    IDENTIFY_CTYPE = "00000014-0000-1000-8000-0026BB765291",
    LOCK_MANAGEMENT_AUTO_SECURE_TIMEOUT_CTYPE = "0000001A-0000-1000-8000-0026BB765291",
    LOCK_MANAGEMENT_CONTROL_POINT_CTYPE = "00000019-0000-1000-8000-0026BB765291",
    LOCK_MECHANISM_LAST_KNOWN_ACTION_CTYPE = "0000001C-0000-1000-8000-0026BB765291",
    LOGS_CTYPE = "0000001F-0000-1000-8000-0026BB765291",
    MANUFACTURER_CTYPE = "00000020-0000-1000-8000-0026BB765291",
    MODEL_CTYPE = "00000021-0000-1000-8000-0026BB765291",
    MOTION_DETECTED_CTYPE = "00000022-0000-1000-8000-0026BB765291",
    NAME_CTYPE = "00000023-0000-1000-8000-0026BB765291",
    OBSTRUCTION_DETECTED_CTYPE = "00000024-0000-1000-8000-0026BB765291",
    OUTLET_IN_USE_CTYPE = "00000026-0000-1000-8000-0026BB765291",
    OCCUPANCY_DETECTED_CTYPE = "00000071-0000-1000-8000-0026BB765291",
    POWER_STATE_CTYPE = "00000025-0000-1000-8000-0026BB765291",
    PROGRAMMABLE_SWITCH_SWITCH_EVENT_CTYPE = "00000073-0000-1000-8000-0026BB765291",
    PROGRAMMABLE_SWITCH_OUTPUT_STATE_CTYPE = "00000074-0000-1000-8000-0026BB765291",
    ROTATION_DIRECTION_CTYPE = "00000028-0000-1000-8000-0026BB765291",
    ROTATION_SPEED_CTYPE = "00000029-0000-1000-8000-0026BB765291",
    SATURATION_CTYPE = "0000002F-0000-1000-8000-0026BB765291",
    SERIAL_NUMBER_CTYPE = "00000030-0000-1000-8000-0026BB765291",
    STATUS_LOW_BATTERY_CTYPE = "00000079-0000-1000-8000-0026BB765291",
    STATUS_FAULT_CTYPE = "00000077-0000-1000-8000-0026BB765291",
    TARGET_DOORSTATE_CTYPE = "00000032-0000-1000-8000-0026BB765291",
    TARGET_LOCK_MECHANISM_STATE_CTYPE = "0000001E-0000-1000-8000-0026BB765291",
    TARGET_RELATIVE_HUMIDITY_CTYPE = "00000034-0000-1000-8000-0026BB765291",
    TARGET_TEMPERATURE_CTYPE = "00000035-0000-1000-8000-0026BB765291",
    TEMPERATURE_UNITS_CTYPE = "00000036-0000-1000-8000-0026BB765291",
    VERSION_CTYPE = "00000037-0000-1000-8000-0026BB765291",
    WINDOW_COVERING_TARGET_POSITION_CTYPE = "0000007C-0000-1000-8000-0026BB765291",
    WINDOW_COVERING_CURRENT_POSITION_CTYPE = "0000006D-0000-1000-8000-0026BB765291",
    WINDOW_COVERING_OPERATION_STATE_CTYPE = "00000072-0000-1000-8000-0026BB765291",
    CURRENTHEATINGCOOLING_CTYPE = "0000000F-0000-1000-8000-0026BB765291",
    TARGETHEATINGCOOLING_CTYPE = "00000033-0000-1000-8000-0026BB765291"
  }
}

// TOOD: avoid this double declaration of legacy type constants
export interface LegacyTypes {
  
  // HomeKitTransportCategoryTypes
  OTHER_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.OTHER_TCTYPE,  
  FAN_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.FAN_TCTYPE,
  GARAGE_DOOR_OPENER_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.GARAGE_DOOR_OPENER_TCTYPE,
  LIGHTBULB_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.LIGHTBULB_TCTYPE,
  DOOR_LOCK_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.DOOR_LOCK_TCTYPE,
  OUTLET_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.OUTLET_TCTYPE,
  SWITCH_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.SWITCH_TCTYPE,
  THERMOSTAT_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.THERMOSTAT_TCTYPE,
  SENSOR_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.SENSOR_TCTYPE,
  ALARM_SYSTEM_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.ALARM_SYSTEM_TCTYPE,
  DOOR_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.DOOR_TCTYPE,
  WINDOW_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.WINDOW_TCTYPE,
  WINDOW_COVERING_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.WINDOW_COVERING_TCTYPE,
  PROGRAMMABLE_SWITCH_TCTYPE: LegacyTypes.HomeKitTransportCategoryTypes.PROGRAMMABLE_SWITCH_TCTYPE,    

  // HomeKitServiceTypes
  LIGHTBULB_STYPE: LegacyTypes.HomeKitServiceTypes.LIGHTBULB_STYPE,
  SWITCH_STYPE: LegacyTypes.HomeKitServiceTypes.SWITCH_STYPE,
  THERMOSTAT_STYPE: LegacyTypes.HomeKitServiceTypes.THERMOSTAT_STYPE,
  GARAGE_DOOR_OPENER_STYPE: LegacyTypes.HomeKitServiceTypes.GARAGE_DOOR_OPENER_STYPE,
  ACCESSORY_INFORMATION_STYPE: LegacyTypes.HomeKitServiceTypes.ACCESSORY_INFORMATION_STYPE,
  FAN_STYPE: LegacyTypes.HomeKitServiceTypes.FAN_STYPE,
  OUTLET_STYPE: LegacyTypes.HomeKitServiceTypes.OUTLET_STYPE,
  LOCK_MECHANISM_STYPE: LegacyTypes.HomeKitServiceTypes.LOCK_MECHANISM_STYPE,
  LOCK_MANAGEMENT_STYPE: LegacyTypes.HomeKitServiceTypes.LOCK_MANAGEMENT_STYPE,
  ALARM_STYPE: LegacyTypes.HomeKitServiceTypes.ALARM_STYPE,
  WINDOW_COVERING_STYPE: LegacyTypes.HomeKitServiceTypes.WINDOW_COVERING_STYPE,
  OCCUPANCY_SENSOR_STYPE: LegacyTypes.HomeKitServiceTypes.OCCUPANCY_SENSOR_STYPE,
  CONTACT_SENSOR_STYPE: LegacyTypes.HomeKitServiceTypes.CONTACT_SENSOR_STYPE,
  MOTION_SENSOR_STYPE: LegacyTypes.HomeKitServiceTypes.MOTION_SENSOR_STYPE,
  HUMIDITY_SENSOR_STYPE: LegacyTypes.HomeKitServiceTypes.HUMIDITY_SENSOR_STYPE,
  TEMPERATURE_SENSOR_STYPE: LegacyTypes.HomeKitServiceTypes.TEMPERATURE_SENSOR_STYPE

  // HomeKitCharacteristicsTypes
  ALARM_CURRENT_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.ALARM_CURRENT_STATE_CTYPE,
  ALARM_TARGET_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.ALARM_TARGET_STATE_CTYPE,
  ADMIN_ONLY_ACCESS_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.ADMIN_ONLY_ACCESS_CTYPE,
  AUDIO_FEEDBACK_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.AUDIO_FEEDBACK_CTYPE,
  BRIGHTNESS_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.BRIGHTNESS_CTYPE,
  BATTERY_LEVEL_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.BATTERY_LEVEL_CTYPE,
  COOLING_THRESHOLD_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.COOLING_THRESHOLD_CTYPE,
  CONTACT_SENSOR_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.CONTACT_SENSOR_STATE_CTYPE,
  CURRENT_DOOR_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.CURRENT_DOOR_STATE_CTYPE,
  CURRENT_LOCK_MECHANISM_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.CURRENT_LOCK_MECHANISM_STATE_CTYPE,
  CURRENT_RELATIVE_HUMIDITY_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.CURRENT_RELATIVE_HUMIDITY_CTYPE,
  CURRENT_TEMPERATURE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.CURRENT_TEMPERATURE_CTYPE,
  HEATING_THRESHOLD_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.HEATING_THRESHOLD_CTYPE,
  HUE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.HUE_CTYPE,
  IDENTIFY_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.IDENTIFY_CTYPE,
  LOCK_MANAGEMENT_AUTO_SECURE_TIMEOUT_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.LOCK_MANAGEMENT_AUTO_SECURE_TIMEOUT_CTYPE,
  LOCK_MANAGEMENT_CONTROL_POINT_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.LOCK_MANAGEMENT_CONTROL_POINT_CTYPE,
  LOCK_MECHANISM_LAST_KNOWN_ACTION_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.LOCK_MECHANISM_LAST_KNOWN_ACTION_CTYPE,
  LOGS_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.LOGS_CTYPE,
  MANUFACTURER_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.MANUFACTURER_CTYPE,
  MODEL_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.MODEL_CTYPE,
  MOTION_DETECTED_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.MOTION_DETECTED_CTYPE,
  NAME_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.NAME_CTYPE,
  OBSTRUCTION_DETECTED_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.OBSTRUCTION_DETECTED_CTYPE,
  OUTLET_IN_USE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.OUTLET_IN_USE_CTYPE,
  OCCUPANCY_DETECTED_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.OCCUPANCY_DETECTED_CTYPE,
  POWER_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.POWER_STATE_CTYPE,
  PROGRAMMABLE_SWITCH_SWITCH_EVENT_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.PROGRAMMABLE_SWITCH_SWITCH_EVENT_CTYPE,
  PROGRAMMABLE_SWITCH_OUTPUT_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.PROGRAMMABLE_SWITCH_OUTPUT_STATE_CTYPE,
  ROTATION_DIRECTION_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.ROTATION_DIRECTION_CTYPE,
  ROTATION_SPEED_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.ROTATION_SPEED_CTYPE,
  SATURATION_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.SATURATION_CTYPE,
  SERIAL_NUMBER_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.SERIAL_NUMBER_CTYPE,
  STATUS_LOW_BATTERY_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.STATUS_LOW_BATTERY_CTYPE,
  STATUS_FAULT_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.STATUS_FAULT_CTYPE,
  TARGET_DOORSTATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.TARGET_DOORSTATE_CTYPE,
  TARGET_LOCK_MECHANISM_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.TARGET_LOCK_MECHANISM_STATE_CTYPE,
  TARGET_RELATIVE_HUMIDITY_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.TARGET_RELATIVE_HUMIDITY_CTYPE,
  TARGET_TEMPERATURE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.TARGET_TEMPERATURE_CTYPE,
  TEMPERATURE_UNITS_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.TEMPERATURE_UNITS_CTYPE,
  VERSION_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.VERSION_CTYPE,
  WINDOW_COVERING_TARGET_POSITION_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.WINDOW_COVERING_TARGET_POSITION_CTYPE,
  WINDOW_COVERING_CURRENT_POSITION_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.WINDOW_COVERING_CURRENT_POSITION_CTYPE,
  WINDOW_COVERING_OPERATION_STATE_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.WINDOW_COVERING_OPERATION_STATE_CTYPE,
  CURRENTHEATINGCOOLING_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.CURRENTHEATINGCOOLING_CTYPE,
  TARGETHEATINGCOOLING_CTYPE: LegacyTypes.HomeKitCharacteristicsTypes.TARGETHEATINGCOOLING_CTYPE
}