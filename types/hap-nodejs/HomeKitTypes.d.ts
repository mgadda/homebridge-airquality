import { Characteristic, Service } from "./index";
export class AccessoryFlags extends Characteristic {

}

export class Active extends Characteristic {
      static INACTIVE: ActiveState;
      static ACTIVE: ActiveState;
}
export enum ActiveState {
      INACTIVE = 0,
      ACTIVE = 1,
}
export class AdministratorOnlyAccess extends Characteristic {

}

export class AirParticulateDensity extends Characteristic {

}

export class AirParticulateSize extends Characteristic {
      static _2_5_M: AirParticulateSizeState;
      static _10_M: AirParticulateSizeState;
}
export enum AirParticulateSizeState {
      _2_5_M = 0,
      _10_M = 1,
}
export class AirQuality extends Characteristic {
      static UNKNOWN: AirQualityState;
      static EXCELLENT: AirQualityState;
      static GOOD: AirQualityState;
      static FAIR: AirQualityState;
      static INFERIOR: AirQualityState;
      static POOR: AirQualityState;
}
export enum AirQualityState {
      UNKNOWN = 0,
      EXCELLENT = 1,
      GOOD = 2,
      FAIR = 3,
      INFERIOR = 4,
      POOR = 5,
}
export class AudioFeedback extends Characteristic {

}

export class BatteryLevel extends Characteristic {

}

export class Brightness extends Characteristic {

}

export class CarbonDioxideDetected extends Characteristic {
      static CO2_LEVELS_NORMAL: CarbonDioxideDetectedState;
      static CO2_LEVELS_ABNORMAL: CarbonDioxideDetectedState;
}
export enum CarbonDioxideDetectedState {
      CO2_LEVELS_NORMAL = 0,
      CO2_LEVELS_ABNORMAL = 1,
}
export class CarbonDioxideLevel extends Characteristic {

}

export class CarbonDioxidePeakLevel extends Characteristic {

}

export class CarbonMonoxideDetected extends Characteristic {
      static CO_LEVELS_NORMAL: CarbonMonoxideDetectedState;
      static CO_LEVELS_ABNORMAL: CarbonMonoxideDetectedState;
}
export enum CarbonMonoxideDetectedState {
      CO_LEVELS_NORMAL = 0,
      CO_LEVELS_ABNORMAL = 1,
}
export class CarbonMonoxideLevel extends Characteristic {

}

export class CarbonMonoxidePeakLevel extends Characteristic {

}

export class ChargingState extends Characteristic {
      static NOT_CHARGING: ChargingStateState;
      static CHARGING: ChargingStateState;
      static NOT_CHARGEABLE: ChargingStateState;
}
export enum ChargingStateState {
      NOT_CHARGING = 0,
      CHARGING = 1,
      NOT_CHARGEABLE = 2,
}
export class ColorTemperature extends Characteristic {

}

export class ContactSensorState extends Characteristic {
      static CONTACT_DETECTED: ContactSensorStateState;
      static CONTACT_NOT_DETECTED: ContactSensorStateState;
}
export enum ContactSensorStateState {
      CONTACT_DETECTED = 0,
      CONTACT_NOT_DETECTED = 1,
}
export class CoolingThresholdTemperature extends Characteristic {

}

export class CurrentAirPurifierState extends Characteristic {
      static INACTIVE: CurrentAirPurifierStateState;
      static IDLE: CurrentAirPurifierStateState;
      static PURIFYING_AIR: CurrentAirPurifierStateState;
}
export enum CurrentAirPurifierStateState {
      INACTIVE = 0,
      IDLE = 1,
      PURIFYING_AIR = 2,
}
export class CurrentAmbientLightLevel extends Characteristic {

}

export class CurrentDoorState extends Characteristic {
      static OPEN: CurrentDoorStateState;
      static CLOSED: CurrentDoorStateState;
      static OPENING: CurrentDoorStateState;
      static CLOSING: CurrentDoorStateState;
      static STOPPED: CurrentDoorStateState;
}
export enum CurrentDoorStateState {
      OPEN = 0,
      CLOSED = 1,
      OPENING = 2,
      CLOSING = 3,
      STOPPED = 4,
}
export class CurrentFanState extends Characteristic {
      static INACTIVE: CurrentFanStateState;
      static IDLE: CurrentFanStateState;
      static BLOWING_AIR: CurrentFanStateState;
}
export enum CurrentFanStateState {
      INACTIVE = 0,
      IDLE = 1,
      BLOWING_AIR = 2,
}
export class CurrentHeaterCoolerState extends Characteristic {
      static INACTIVE: CurrentHeaterCoolerStateState;
      static IDLE: CurrentHeaterCoolerStateState;
      static HEATING: CurrentHeaterCoolerStateState;
      static COOLING: CurrentHeaterCoolerStateState;
}
export enum CurrentHeaterCoolerStateState {
      INACTIVE = 0,
      IDLE = 1,
      HEATING = 2,
      COOLING = 3,
}
export class CurrentHeatingCoolingState extends Characteristic {
      static OFF: CurrentHeatingCoolingStateState;
      static HEAT: CurrentHeatingCoolingStateState;
      static COOL: CurrentHeatingCoolingStateState;
}
export enum CurrentHeatingCoolingStateState {
      OFF = 0,
      HEAT = 1,
      COOL = 2,
}
export class CurrentHorizontalTiltAngle extends Characteristic {

}

export class CurrentHumidifierDehumidifierState extends Characteristic {
      static INACTIVE: CurrentHumidifierDehumidifierStateState;
      static IDLE: CurrentHumidifierDehumidifierStateState;
      static HUMIDIFYING: CurrentHumidifierDehumidifierStateState;
      static DEHUMIDIFYING: CurrentHumidifierDehumidifierStateState;
}
export enum CurrentHumidifierDehumidifierStateState {
      INACTIVE = 0,
      IDLE = 1,
      HUMIDIFYING = 2,
      DEHUMIDIFYING = 3,
}
export class CurrentPosition extends Characteristic {

}

export class CurrentRelativeHumidity extends Characteristic {

}

export class CurrentSlatState extends Characteristic {
      static FIXED: CurrentSlatStateState;
      static JAMMED: CurrentSlatStateState;
      static SWINGING: CurrentSlatStateState;
}
export enum CurrentSlatStateState {
      FIXED = 0,
      JAMMED = 1,
      SWINGING = 2,
}
export class CurrentTemperature extends Characteristic {

}

export class CurrentTiltAngle extends Characteristic {

}

export class CurrentVerticalTiltAngle extends Characteristic {

}

export class DigitalZoom extends Characteristic {

}

export class FilterChangeIndication extends Characteristic {
      static FILTER_OK: FilterChangeIndicationState;
      static CHANGE_FILTER: FilterChangeIndicationState;
}
export enum FilterChangeIndicationState {
      FILTER_OK = 0,
      CHANGE_FILTER = 1,
}
export class FilterLifeLevel extends Characteristic {

}

export class FirmwareRevision extends Characteristic {

}

export class HardwareRevision extends Characteristic {

}

export class HeatingThresholdTemperature extends Characteristic {

}

export class HoldPosition extends Characteristic {

}

export class Hue extends Characteristic {

}

export class Identify extends Characteristic {

}

export class ImageMirroring extends Characteristic {

}

export class ImageRotation extends Characteristic {

}

export class InUse extends Characteristic {
      static NOT_IN_USE: InUseState;
      static IN_USE: InUseState;
}
export enum InUseState {
      NOT_IN_USE = 0,
      IN_USE = 1,
}
export class IsConfigured extends Characteristic {
      static NOT_CONFIGURED: IsConfiguredState;
      static CONFIGURED: IsConfiguredState;
}
export enum IsConfiguredState {
      NOT_CONFIGURED = 0,
      CONFIGURED = 1,
}
export class LeakDetected extends Characteristic {
      static LEAK_NOT_DETECTED: LeakDetectedState;
      static LEAK_DETECTED: LeakDetectedState;
}
export enum LeakDetectedState {
      LEAK_NOT_DETECTED = 0,
      LEAK_DETECTED = 1,
}
export class LockControlPoint extends Characteristic {

}

export class LockCurrentState extends Characteristic {
      static UNSECURED: LockCurrentStateState;
      static SECURED: LockCurrentStateState;
      static JAMMED: LockCurrentStateState;
      static UNKNOWN: LockCurrentStateState;
}
export enum LockCurrentStateState {
      UNSECURED = 0,
      SECURED = 1,
      JAMMED = 2,
      UNKNOWN = 3,
}
export class LockLastKnownAction extends Characteristic {
      static SECURED_PHYSICALLY_INTERIOR: LockLastKnownActionState;
      static UNSECURED_PHYSICALLY_INTERIOR: LockLastKnownActionState;
      static SECURED_PHYSICALLY_EXTERIOR: LockLastKnownActionState;
      static UNSECURED_PHYSICALLY_EXTERIOR: LockLastKnownActionState;
      static SECURED_BY_KEYPAD: LockLastKnownActionState;
      static UNSECURED_BY_KEYPAD: LockLastKnownActionState;
      static SECURED_REMOTELY: LockLastKnownActionState;
      static UNSECURED_REMOTELY: LockLastKnownActionState;
      static SECURED_BY_AUTO_SECURE_TIMEOUT: LockLastKnownActionState;
}
export enum LockLastKnownActionState {
      SECURED_PHYSICALLY_INTERIOR = 0,
      UNSECURED_PHYSICALLY_INTERIOR = 1,
      SECURED_PHYSICALLY_EXTERIOR = 2,
      UNSECURED_PHYSICALLY_EXTERIOR = 3,
      SECURED_BY_KEYPAD = 4,
      UNSECURED_BY_KEYPAD = 5,
      SECURED_REMOTELY = 6,
      UNSECURED_REMOTELY = 7,
      SECURED_BY_AUTO_SECURE_TIMEOUT = 8,
}
export class LockManagementAutoSecurityTimeout extends Characteristic {

}

export class LockPhysicalControls extends Characteristic {
      static CONTROL_LOCK_DISABLED: LockPhysicalControlsState;
      static CONTROL_LOCK_ENABLED: LockPhysicalControlsState;
}
export enum LockPhysicalControlsState {
      CONTROL_LOCK_DISABLED = 0,
      CONTROL_LOCK_ENABLED = 1,
}
export class LockTargetState extends Characteristic {
      static UNSECURED: LockTargetStateState;
      static SECURED: LockTargetStateState;
}
export enum LockTargetStateState {
      UNSECURED = 0,
      SECURED = 1,
}
export class Logs extends Characteristic {

}

export class Manufacturer extends Characteristic {

}

export class Model extends Characteristic {

}

export class MotionDetected extends Characteristic {

}

export class Mute extends Characteristic {

}

export class Name extends Characteristic {

}

export class NightVision extends Characteristic {

}

export class NitrogenDioxideDensity extends Characteristic {

}

export class ObstructionDetected extends Characteristic {

}

export class OccupancyDetected extends Characteristic {
      static OCCUPANCY_NOT_DETECTED: OccupancyDetectedState;
      static OCCUPANCY_DETECTED: OccupancyDetectedState;
}
export enum OccupancyDetectedState {
      OCCUPANCY_NOT_DETECTED = 0,
      OCCUPANCY_DETECTED = 1,
}
export class On extends Characteristic {

}

export class OpticalZoom extends Characteristic {

}

export class OutletInUse extends Characteristic {

}

export class OzoneDensity extends Characteristic {

}

export class PairSetup extends Characteristic {

}

export class PairVerify extends Characteristic {

}

export class PairingFeatures extends Characteristic {

}

export class PairingPairings extends Characteristic {

}

export class PM10Density extends Characteristic {

}

export class PM2_5Density extends Characteristic {

}

export class PositionState extends Characteristic {
      static DECREASING: PositionStateState;
      static INCREASING: PositionStateState;
      static STOPPED: PositionStateState;
}
export enum PositionStateState {
      DECREASING = 0,
      INCREASING = 1,
      STOPPED = 2,
}
export class ProgramMode extends Characteristic {
      static NO_PROGRAM_SCHEDULED: ProgramModeState;
      static PROGRAM_SCHEDULED: ProgramModeState;
      static PROGRAM_SCHEDULED_MANUAL_MODE_: ProgramModeState;
}
export enum ProgramModeState {
      NO_PROGRAM_SCHEDULED = 0,
      PROGRAM_SCHEDULED = 1,
      PROGRAM_SCHEDULED_MANUAL_MODE_ = 2,
}
export class ProgrammableSwitchEvent extends Characteristic {
      static SINGLE_PRESS: ProgrammableSwitchEventState;
      static DOUBLE_PRESS: ProgrammableSwitchEventState;
      static LONG_PRESS: ProgrammableSwitchEventState;
}
export enum ProgrammableSwitchEventState {
      SINGLE_PRESS = 0,
      DOUBLE_PRESS = 1,
      LONG_PRESS = 2,
}
export class RelativeHumidityDehumidifierThreshold extends Characteristic {

}

export class RelativeHumidityHumidifierThreshold extends Characteristic {

}

export class RemainingDuration extends Characteristic {

}

export class ResetFilterIndication extends Characteristic {

}

export class RotationDirection extends Characteristic {
      static CLOCKWISE: RotationDirectionState;
      static COUNTER_CLOCKWISE: RotationDirectionState;
}
export enum RotationDirectionState {
      CLOCKWISE = 0,
      COUNTER_CLOCKWISE = 1,
}
export class RotationSpeed extends Characteristic {

}

export class Saturation extends Characteristic {

}

export class SecuritySystemAlarmType extends Characteristic {

}

export class SecuritySystemCurrentState extends Characteristic {
      static STAY_ARM: SecuritySystemCurrentStateState;
      static AWAY_ARM: SecuritySystemCurrentStateState;
      static NIGHT_ARM: SecuritySystemCurrentStateState;
      static DISARMED: SecuritySystemCurrentStateState;
      static ALARM_TRIGGERED: SecuritySystemCurrentStateState;
}
export enum SecuritySystemCurrentStateState {
      STAY_ARM = 0,
      AWAY_ARM = 1,
      NIGHT_ARM = 2,
      DISARMED = 3,
      ALARM_TRIGGERED = 4,
}
export class SecuritySystemTargetState extends Characteristic {
      static STAY_ARM: SecuritySystemTargetStateState;
      static AWAY_ARM: SecuritySystemTargetStateState;
      static NIGHT_ARM: SecuritySystemTargetStateState;
      static DISARM: SecuritySystemTargetStateState;
}
export enum SecuritySystemTargetStateState {
      STAY_ARM = 0,
      AWAY_ARM = 1,
      NIGHT_ARM = 2,
      DISARM = 3,
}
export class SelectedRTPStreamConfiguration extends Characteristic {

}

export class SerialNumber extends Characteristic {

}

export class ServiceLabelIndex extends Characteristic {

}

export class ServiceLabelNamespace extends Characteristic {
      static DOTS: ServiceLabelNamespaceState;
      static ARABIC_NUMERALS: ServiceLabelNamespaceState;
}
export enum ServiceLabelNamespaceState {
      DOTS = 0,
      ARABIC_NUMERALS = 1,
}
export class SetDuration extends Characteristic {

}

export class SetupEndpoints extends Characteristic {

}

export class SlatType extends Characteristic {
      static HORIZONTAL: SlatTypeState;
      static VERTICAL: SlatTypeState;
}
export enum SlatTypeState {
      HORIZONTAL = 0,
      VERTICAL = 1,
}
export class SmokeDetected extends Characteristic {
      static SMOKE_NOT_DETECTED: SmokeDetectedState;
      static SMOKE_DETECTED: SmokeDetectedState;
}
export enum SmokeDetectedState {
      SMOKE_NOT_DETECTED = 0,
      SMOKE_DETECTED = 1,
}
export class StatusActive extends Characteristic {

}

export class StatusFault extends Characteristic {
      static NO_FAULT: StatusFaultState;
      static GENERAL_FAULT: StatusFaultState;
}
export enum StatusFaultState {
      NO_FAULT = 0,
      GENERAL_FAULT = 1,
}
export class StatusJammed extends Characteristic {
      static NOT_JAMMED: StatusJammedState;
      static JAMMED: StatusJammedState;
}
export enum StatusJammedState {
      NOT_JAMMED = 0,
      JAMMED = 1,
}
export class StatusLowBattery extends Characteristic {
      static BATTERY_LEVEL_NORMAL: StatusLowBatteryState;
      static BATTERY_LEVEL_LOW: StatusLowBatteryState;
}
export enum StatusLowBatteryState {
      BATTERY_LEVEL_NORMAL = 0,
      BATTERY_LEVEL_LOW = 1,
}
export class StatusTampered extends Characteristic {
      static NOT_TAMPERED: StatusTamperedState;
      static TAMPERED: StatusTamperedState;
}
export enum StatusTamperedState {
      NOT_TAMPERED = 0,
      TAMPERED = 1,
}
export class StreamingStatus extends Characteristic {

}

export class SulphurDioxideDensity extends Characteristic {

}

export class SupportedAudioStreamConfiguration extends Characteristic {

}

export class SupportedRTPConfiguration extends Characteristic {

}

export class SupportedVideoStreamConfiguration extends Characteristic {

}

export class SwingMode extends Characteristic {
      static SWING_DISABLED: SwingModeState;
      static SWING_ENABLED: SwingModeState;
}
export enum SwingModeState {
      SWING_DISABLED = 0,
      SWING_ENABLED = 1,
}
export class TargetAirPurifierState extends Characteristic {
      static MANUAL: TargetAirPurifierStateState;
      static AUTO: TargetAirPurifierStateState;
}
export enum TargetAirPurifierStateState {
      MANUAL = 0,
      AUTO = 1,
}
export class TargetAirQuality extends Characteristic {
      static EXCELLENT: TargetAirQualityState;
      static GOOD: TargetAirQualityState;
      static FAIR: TargetAirQualityState;
}
export enum TargetAirQualityState {
      EXCELLENT = 0,
      GOOD = 1,
      FAIR = 2,
}
export class TargetDoorState extends Characteristic {
      static OPEN: TargetDoorStateState;
      static CLOSED: TargetDoorStateState;
}
export enum TargetDoorStateState {
      OPEN = 0,
      CLOSED = 1,
}
export class TargetFanState extends Characteristic {
      static MANUAL: TargetFanStateState;
      static AUTO: TargetFanStateState;
}
export enum TargetFanStateState {
      MANUAL = 0,
      AUTO = 1,
}
export class TargetHeaterCoolerState extends Characteristic {
      static AUTO: TargetHeaterCoolerStateState;
      static HEAT: TargetHeaterCoolerStateState;
      static COOL: TargetHeaterCoolerStateState;
}
export enum TargetHeaterCoolerStateState {
      AUTO = 0,
      HEAT = 1,
      COOL = 2,
}
export class TargetHeatingCoolingState extends Characteristic {
      static OFF: TargetHeatingCoolingStateState;
      static HEAT: TargetHeatingCoolingStateState;
      static COOL: TargetHeatingCoolingStateState;
      static AUTO: TargetHeatingCoolingStateState;
}
export enum TargetHeatingCoolingStateState {
      OFF = 0,
      HEAT = 1,
      COOL = 2,
      AUTO = 3,
}
export class TargetHorizontalTiltAngle extends Characteristic {

}

export class TargetHumidifierDehumidifierState extends Characteristic {
      static HUMIDIFIER_OR_DEHUMIDIFIER: TargetHumidifierDehumidifierStateState;
      static HUMIDIFIER: TargetHumidifierDehumidifierStateState;
      static DEHUMIDIFIER: TargetHumidifierDehumidifierStateState;
}
export enum TargetHumidifierDehumidifierStateState {
      HUMIDIFIER_OR_DEHUMIDIFIER = 0,
      HUMIDIFIER = 1,
      DEHUMIDIFIER = 2,
}
export class TargetPosition extends Characteristic {

}

export class TargetRelativeHumidity extends Characteristic {

}

export class TargetSlatState extends Characteristic {
      static MANUAL: TargetSlatStateState;
      static AUTO: TargetSlatStateState;
}
export enum TargetSlatStateState {
      MANUAL = 0,
      AUTO = 1,
}
export class TargetTemperature extends Characteristic {

}

export class TargetTiltAngle extends Characteristic {

}

export class TargetVerticalTiltAngle extends Characteristic {

}

export class TemperatureDisplayUnits extends Characteristic {
      static CELSIUS: TemperatureDisplayUnitsState;
      static FAHRENHEIT: TemperatureDisplayUnitsState;
}
export enum TemperatureDisplayUnitsState {
      CELSIUS = 0,
      FAHRENHEIT = 1,
}
export class ValveType extends Characteristic {
      static GENERIC_VALVE: ValveTypeState;
      static IRRIGATION: ValveTypeState;
      static SHOWER_HEAD: ValveTypeState;
      static WATER_FAUCET: ValveTypeState;
}
export enum ValveTypeState {
      GENERIC_VALVE = 0,
      IRRIGATION = 1,
      SHOWER_HEAD = 2,
      WATER_FAUCET = 3,
}
export class Version extends Characteristic {

}

export class VOCDensity extends Characteristic {

}

export class Volume extends Characteristic {

}

export class WaterLevel extends Characteristic {

}

export class AccessoryInformation extends Service {

}

export class AirPurifier extends Service {

}

export class AirQualitySensor extends Service {

}

export class BatteryService extends Service {

}

export class CameraRTPStreamManagement extends Service {

}

export class CarbonDioxideSensor extends Service {

}

export class CarbonMonoxideSensor extends Service {

}

export class ContactSensor extends Service {

}

export class Door extends Service {

}

export class Doorbell extends Service {

}

export class Fan extends Service {

}

export class Fanv2 extends Service {

}

export class FilterMaintenance extends Service {

}

export class Faucet extends Service {

}

export class GarageDoorOpener extends Service {

}

export class HeaterCooler extends Service {

}

export class HumidifierDehumidifier extends Service {

}

export class HumiditySensor extends Service {

}

export class IrrigationSystem extends Service {

}

export class LeakSensor extends Service {

}

export class LightSensor extends Service {

}

export class Lightbulb extends Service {

}

export class LockManagement extends Service {

}

export class LockMechanism extends Service {

}

export class Microphone extends Service {

}

export class MotionSensor extends Service {

}

export class OccupancySensor extends Service {

}

export class Outlet extends Service {

}

export class SecuritySystem extends Service {

}

export class ServiceLabel extends Service {

}

export class Slat extends Service {

}

export class SmokeSensor extends Service {

}

export class Speaker extends Service {

}

export class StatelessProgrammableSwitch extends Service {

}

export class Switch extends Service {

}

export class TemperatureSensor extends Service {

}

export class Thermostat extends Service {

}

export class Valve extends Service {

}

export class Window extends Service {

}

export class WindowCovering extends Service {

}


    /*
    import * as HomeKitTypes from "./HomeKitTypes";
    */


    /*
      // Paste the follow definitions into the 
      // Characteristics definition in index.t.ts

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
    */


    /*
      // Paste the follow definitions into the 
      // Services definition in index.t.ts
      
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
    */

