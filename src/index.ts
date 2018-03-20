import * as http from 'http';

import { API, User } from "homebridge";
import * as hap from "hap-nodejs";

var Accessory: hap.Accessory, 
    Service: hap.Service, 
    Characteristic: hap.Characteristic;

export default (homebridge: API) => {
  Accessory = homebridge.hap.Accessory; 
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

}