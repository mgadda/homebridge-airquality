"use strict";
var hap = require("hap-nodejs");
var Accessory, Service, Characteristic;
function initializePlugin(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    Accessory = homebridge.platformAccessory;
    homebridge.registerPlatform("airquality-plugin", "airquality-platform", AirQualityPlatform, true);
}
var AirQualityPlatform = (function () {
    function AirQualityPlatform(log, config, api) {
        this.log = log;
        this.api = api;
        this.config = config;
        var accessory = new Accessory("MyAirQualityAccessory", "6c385c44-7402-4e7a-aec1-9d16890533da", hap.Accessory.Categories.SENSOR);
        accessory
            .addService(new hap.Service.AirQualitySensor("MyAQService", "4de94093-c57c-4269-ad1b-0ef84c30e8c7", "arduino"))
            .getCharacteristic(hap.Characteristic.AirQuality)
            .on("get", function (callback) {
            callback(null, 1.0);
        });
        this._accessories = [accessory];
        api.registerPlatformAccessories("homebridge-airquality", "airquality-platform", [accessory]);
    }
    AirQualityPlatform.prototype.configureAccessory = function (accessory) {
        console.log("I'm in configureAccessory now.");
        this.log.debug(accessory.displayName);
        accessory.reachable = true;
    };
    AirQualityPlatform.prototype.configurationRequestHandler = function (context, request, callback) {
        console.log("I'm in configurationRequestHandler now.");
    };
    AirQualityPlatform.prototype.accessories = function (fn) {
        console.log("I'm in accessories now.");
        fn(this._accessories);
    };
    return AirQualityPlatform;
}());
module.exports = initializePlugin;
//# sourceMappingURL=platform.js.map