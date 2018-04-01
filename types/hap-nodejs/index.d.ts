
import { EventEmitter } from 'events';
import * as HomeKitTypes from './HomeKitTypes';

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
  category: Accessory.Categories;
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
  export enum Categories {
    OTHER = 1,
    BRIDGE = 2,
    FAN = 3,
    GARAGE_DOOR_OPENER = 4,
    LIGHT_BULB = 5,
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
    CAMAERA = 17,
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
    category: Accessory.Categories;
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
  getCharacteristic(name: Service.CharacteristicLike): Characteristic;
  testCharacteristic(nane: Service.CharacteristicLike): boolean;
  setCharacteristic(name: Service.CharacteristicLike, value: any): Service // TODO: define value type
  updateCharacteristic(name: Service.CharacteristicLike, value: any): Service;
  addOptionalCharacteristic(characteristic: Characteristic);
  getCharacteristicByIID(iid: IID): Characteristic;
  toHAP(opt: HAPOptions): Service.HAP;

  static AccessoryInformation: typeof HomeKitTypes.AccessoryInformation;
  static AirPurifier: typeof HomeKitTypes.AirPurifier;
  static AirQualitySensor: typeof HomeKitTypes.AirQualitySensor;
  static BatteryService: typeof HomeKitTypes.BatteryService;
  static CameraRTPStreamManagement: typeof HomeKitTypes.CameraRTPStreamManagement;
  static CarbonDioxideSensor: typeof HomeKitTypes.CarbonDioxideSensor;
  static CarbonMonoxideSensor: typeof HomeKitTypes.CarbonMonoxideSensor;
  static ContactSensor: typeof HomeKitTypes.ContactSensor;
  static Door: typeof HomeKitTypes.Door;
  static Doorbell: typeof HomeKitTypes.Doorbell;
  static Fan: typeof HomeKitTypes.Fan;
  static Fanv2: typeof HomeKitTypes.Fanv2;
  static FilterMaintenance: typeof HomeKitTypes.FilterMaintenance;
  static Faucet: typeof HomeKitTypes.Faucet;
  static GarageDoorOpener: typeof HomeKitTypes.GarageDoorOpener;
  static HeaterCooler: typeof HomeKitTypes.HeaterCooler;
  static HumidifierDehumidifier: typeof HomeKitTypes.HumidifierDehumidifier;
  static HumiditySensor: typeof HomeKitTypes.HumiditySensor;
  static IrrigationSystem: typeof HomeKitTypes.IrrigationSystem;
  static LeakSensor: typeof HomeKitTypes.LeakSensor;
  static LightSensor: typeof HomeKitTypes.LightSensor;
  static Lightbulb: typeof HomeKitTypes.Lightbulb;
  static LockManagement: typeof HomeKitTypes.LockManagement;
  static LockMechanism: typeof HomeKitTypes.LockMechanism;
  static Microphone: typeof HomeKitTypes.Microphone;
  static MotionSensor: typeof HomeKitTypes.MotionSensor;
  static OccupancySensor: typeof HomeKitTypes.OccupancySensor;
  static Outlet: typeof HomeKitTypes.Outlet;
  static SecuritySystem: typeof HomeKitTypes.SecuritySystem;
  static ServiceLabel: typeof HomeKitTypes.ServiceLabel;
  static Slat: typeof HomeKitTypes.Slat;
  static SmokeSensor: typeof HomeKitTypes.SmokeSensor;
  static Speaker: typeof HomeKitTypes.Speaker;
  static StatelessProgrammableSwitch: typeof HomeKitTypes.StatelessProgrammableSwitch;
  static Switch: typeof HomeKitTypes.Switch;
  static TemperatureSensor: typeof HomeKitTypes.TemperatureSensor;
  static Thermostat: typeof HomeKitTypes.Thermostat;
  static Valve: typeof HomeKitTypes.Valve;
  static Window: typeof HomeKitTypes.Window;
  static WindowCovering: typeof HomeKitTypes.WindowCovering;
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

  static AccessoryFlags: typeof HomeKitTypes.AccessoryFlags;
  static Active: typeof HomeKitTypes.Active;
  static AdministratorOnlyAccess: typeof HomeKitTypes.AdministratorOnlyAccess;
  static AirParticulateDensity: typeof HomeKitTypes.AirParticulateDensity;
  static AirParticulateSize: typeof HomeKitTypes.AirParticulateSize;
  static AirQuality: typeof HomeKitTypes.AirQuality;
  static AudioFeedback: typeof HomeKitTypes.AudioFeedback;
  static BatteryLevel: typeof HomeKitTypes.BatteryLevel;
  static Brightness: typeof HomeKitTypes.Brightness;
  static CarbonDioxideDetected: typeof HomeKitTypes.CarbonDioxideDetected;
  static CarbonDioxideLevel: typeof HomeKitTypes.CarbonDioxideLevel;
  static CarbonDioxidePeakLevel: typeof HomeKitTypes.CarbonDioxidePeakLevel;
  static CarbonMonoxideDetected: typeof HomeKitTypes.CarbonMonoxideDetected;
  static CarbonMonoxideLevel: typeof HomeKitTypes.CarbonMonoxideLevel;
  static CarbonMonoxidePeakLevel: typeof HomeKitTypes.CarbonMonoxidePeakLevel;
  static ChargingState: typeof HomeKitTypes.ChargingState;
  static ColorTemperature: typeof HomeKitTypes.ColorTemperature;
  static ContactSensorState: typeof HomeKitTypes.ContactSensorState;
  static CoolingThresholdTemperature: typeof HomeKitTypes.CoolingThresholdTemperature;
  static CurrentAirPurifierState: typeof HomeKitTypes.CurrentAirPurifierState;
  static CurrentAmbientLightLevel: typeof HomeKitTypes.CurrentAmbientLightLevel;
  static CurrentDoorState: typeof HomeKitTypes.CurrentDoorState;
  static CurrentFanState: typeof HomeKitTypes.CurrentFanState;
  static CurrentHeaterCoolerState: typeof HomeKitTypes.CurrentHeaterCoolerState;
  static CurrentHeatingCoolingState: typeof HomeKitTypes.CurrentHeatingCoolingState;
  static CurrentHorizontalTiltAngle: typeof HomeKitTypes.CurrentHorizontalTiltAngle;
  static CurrentHumidifierDehumidifierState: typeof HomeKitTypes.CurrentHumidifierDehumidifierState;
  static CurrentPosition: typeof HomeKitTypes.CurrentPosition;
  static CurrentRelativeHumidity: typeof HomeKitTypes.CurrentRelativeHumidity;
  static CurrentSlatState: typeof HomeKitTypes.CurrentSlatState;
  static CurrentTemperature: typeof HomeKitTypes.CurrentTemperature;
  static CurrentTiltAngle: typeof HomeKitTypes.CurrentTiltAngle;
  static CurrentVerticalTiltAngle: typeof HomeKitTypes.CurrentVerticalTiltAngle;
  static DigitalZoom: typeof HomeKitTypes.DigitalZoom;
  static FilterChangeIndication: typeof HomeKitTypes.FilterChangeIndication;
  static FilterLifeLevel: typeof HomeKitTypes.FilterLifeLevel;
  static FirmwareRevision: typeof HomeKitTypes.FirmwareRevision;
  static HardwareRevision: typeof HomeKitTypes.HardwareRevision;
  static HeatingThresholdTemperature: typeof HomeKitTypes.HeatingThresholdTemperature;
  static HoldPosition: typeof HomeKitTypes.HoldPosition;
  static Hue: typeof HomeKitTypes.Hue;
  static Identify: typeof HomeKitTypes.Identify;
  static ImageMirroring: typeof HomeKitTypes.ImageMirroring;
  static ImageRotation: typeof HomeKitTypes.ImageRotation;
  static InUse: typeof HomeKitTypes.InUse;
  static IsConfigured: typeof HomeKitTypes.IsConfigured;
  static LeakDetected: typeof HomeKitTypes.LeakDetected;
  static LockControlPoint: typeof HomeKitTypes.LockControlPoint;
  static LockCurrentState: typeof HomeKitTypes.LockCurrentState;
  static LockLastKnownAction: typeof HomeKitTypes.LockLastKnownAction;
  static LockManagementAutoSecurityTimeout: typeof HomeKitTypes.LockManagementAutoSecurityTimeout;
  static LockPhysicalControls: typeof HomeKitTypes.LockPhysicalControls;
  static LockTargetState: typeof HomeKitTypes.LockTargetState;
  static Logs: typeof HomeKitTypes.Logs;
  static Manufacturer: typeof HomeKitTypes.Manufacturer;
  static Model: typeof HomeKitTypes.Model;
  static MotionDetected: typeof HomeKitTypes.MotionDetected;
  static Mute: typeof HomeKitTypes.Mute;
  static Name: typeof HomeKitTypes.Name;
  static NightVision: typeof HomeKitTypes.NightVision;
  static NitrogenDioxideDensity: typeof HomeKitTypes.NitrogenDioxideDensity;
  static ObstructionDetected: typeof HomeKitTypes.ObstructionDetected;
  static OccupancyDetected: typeof HomeKitTypes.OccupancyDetected;
  static On: typeof HomeKitTypes.On;
  static OpticalZoom: typeof HomeKitTypes.OpticalZoom;
  static OutletInUse: typeof HomeKitTypes.OutletInUse;
  static OzoneDensity: typeof HomeKitTypes.OzoneDensity;
  static PairSetup: typeof HomeKitTypes.PairSetup;
  static PairVerify: typeof HomeKitTypes.PairVerify;
  static PairingFeatures: typeof HomeKitTypes.PairingFeatures;
  static PairingPairings: typeof HomeKitTypes.PairingPairings;
  static PM10Density: typeof HomeKitTypes.PM10Density;
  static PM2_5Density: typeof HomeKitTypes.PM2_5Density;
  static PositionState: typeof HomeKitTypes.PositionState;
  static ProgramMode: typeof HomeKitTypes.ProgramMode;
  static ProgrammableSwitchEvent: typeof HomeKitTypes.ProgrammableSwitchEvent;
  static RelativeHumidityDehumidifierThreshold: typeof HomeKitTypes.RelativeHumidityDehumidifierThreshold;
  static RelativeHumidityHumidifierThreshold: typeof HomeKitTypes.RelativeHumidityHumidifierThreshold;
  static RemainingDuration: typeof HomeKitTypes.RemainingDuration;
  static ResetFilterIndication: typeof HomeKitTypes.ResetFilterIndication;
  static RotationDirection: typeof HomeKitTypes.RotationDirection;
  static RotationSpeed: typeof HomeKitTypes.RotationSpeed;
  static Saturation: typeof HomeKitTypes.Saturation;
  static SecuritySystemAlarmType: typeof HomeKitTypes.SecuritySystemAlarmType;
  static SecuritySystemCurrentState: typeof HomeKitTypes.SecuritySystemCurrentState;
  static SecuritySystemTargetState: typeof HomeKitTypes.SecuritySystemTargetState;
  static SelectedRTPStreamConfiguration: typeof HomeKitTypes.SelectedRTPStreamConfiguration;
  static SerialNumber: typeof HomeKitTypes.SerialNumber;
  static ServiceLabelIndex: typeof HomeKitTypes.ServiceLabelIndex;
  static ServiceLabelNamespace: typeof HomeKitTypes.ServiceLabelNamespace;
  static SetDuration: typeof HomeKitTypes.SetDuration;
  static SetupEndpoints: typeof HomeKitTypes.SetupEndpoints;
  static SlatType: typeof HomeKitTypes.SlatType;
  static SmokeDetected: typeof HomeKitTypes.SmokeDetected;
  static StatusActive: typeof HomeKitTypes.StatusActive;
  static StatusFault: typeof HomeKitTypes.StatusFault;
  static StatusJammed: typeof HomeKitTypes.StatusJammed;
  static StatusLowBattery: typeof HomeKitTypes.StatusLowBattery;
  static StatusTampered: typeof HomeKitTypes.StatusTampered;
  static StreamingStatus: typeof HomeKitTypes.StreamingStatus;
  static SulphurDioxideDensity: typeof HomeKitTypes.SulphurDioxideDensity;
  static SupportedAudioStreamConfiguration: typeof HomeKitTypes.SupportedAudioStreamConfiguration;
  static SupportedRTPConfiguration: typeof HomeKitTypes.SupportedRTPConfiguration;
  static SupportedVideoStreamConfiguration: typeof HomeKitTypes.SupportedVideoStreamConfiguration;
  static SwingMode: typeof HomeKitTypes.SwingMode;
  static TargetAirPurifierState: typeof HomeKitTypes.TargetAirPurifierState;
  static TargetAirQuality: typeof HomeKitTypes.TargetAirQuality;
  static TargetDoorState: typeof HomeKitTypes.TargetDoorState;
  static TargetFanState: typeof HomeKitTypes.TargetFanState;
  static TargetHeaterCoolerState: typeof HomeKitTypes.TargetHeaterCoolerState;
  static TargetHeatingCoolingState: typeof HomeKitTypes.TargetHeatingCoolingState;
  static TargetHorizontalTiltAngle: typeof HomeKitTypes.TargetHorizontalTiltAngle;
  static TargetHumidifierDehumidifierState: typeof HomeKitTypes.TargetHumidifierDehumidifierState;
  static TargetPosition: typeof HomeKitTypes.TargetPosition;
  static TargetRelativeHumidity: typeof HomeKitTypes.TargetRelativeHumidity;
  static TargetSlatState: typeof HomeKitTypes.TargetSlatState;
  static TargetTemperature: typeof HomeKitTypes.TargetTemperature;
  static TargetTiltAngle: typeof HomeKitTypes.TargetTiltAngle;
  static TargetVerticalTiltAngle: typeof HomeKitTypes.TargetVerticalTiltAngle;
  static TemperatureDisplayUnits: typeof HomeKitTypes.TemperatureDisplayUnits;
  static ValveType: typeof HomeKitTypes.ValveType;
  static Version: typeof HomeKitTypes.Version;
  static VOCDensity: typeof HomeKitTypes.VOCDensity;
  static Volume: typeof HomeKitTypes.Volume;
  static WaterLevel: typeof HomeKitTypes.WaterLevel;
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