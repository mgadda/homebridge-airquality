"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var hap = require("hap-nodejs");
var node_fetch_1 = require("node-fetch");
var Accessory, Service, Characteristic;
var WheezyAccessory = (function (_super) {
    __extends(WheezyAccessory, _super);
    function WheezyAccessory(log, config) {
        var _this = _super.call(this, "WheezyAccessory", "22322821-3eac-4015-9898-da041bfa9851") || this;
        _this.service = new hap.Service.AirQualitySensor("WheezySensor", "c57709e9-ae2d-4b18-82b5-b07afd7c52cc", "sensor1");
        _this.service
            .getCharacteristic(hap.Characteristic.AirQuality)
            .on("get", _this.getMostRecentAirQuality.bind(_this));
        _this.service
            .getCharacteristic(hap.Characteristic.AirParticulateDensity)
            .on("get", _this.getMostRecentAirQualityDensity.bind(_this));
        _this.service
            .getCharacteristic(hap.Characteristic.AirParticulateSize)
            .on("get", _this.getMostRecentAirParticulateSize.bind(_this));
        return _this;
    }
    WheezyAccessory.prototype._airQualityStateFromString = function (value) {
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
    };
    WheezyAccessory.prototype._queryAQBot = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, node_fetch_1["default"]("http://localhost:4000", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ query: query })
                        })];
                    case 1:
                        response = _a.sent();
                        return [4, response.json()];
                    case 2:
                        json = _a.sent();
                        return [2, json.data];
                }
            });
        });
    };
    WheezyAccessory.prototype.getMostRecentAirQuality = function (callback) {
        var _this = this;
        var query = "\n      query {\n        airQuality {\n          quality\n        }\n      }\n    ";
        this._queryAQBot(query).then(function (data) {
            if (data.airQuality) {
                var quality = _this._airQualityStateFromString(data.airQuality.quality);
                callback(undefined, quality);
            }
        })["catch"](function (error) { return callback(error, undefined); });
    };
    WheezyAccessory.prototype.getMostRecentAirQualityDensity = function (callback) {
        var query = "\n      query {\n        airQuality {\n          particulate2_5\n        }\n      }\n    ";
        this._queryAQBot(query).then(function (data) {
            if (data.airQuality) {
                callback(undefined, data.airQuality.particulate2_5);
            }
        })["catch"](function (error) { return callback(error, undefined); });
    };
    WheezyAccessory.prototype.getMostRecentAirParticulateSize = function (callback) {
        callback(undefined, hap.Characteristic.AirParticulateSize._2_5_M);
    };
    WheezyAccessory.prototype.getServices = function () {
        return [this.service];
    };
    return WheezyAccessory;
}(hap.Accessory));
module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-airquality", "Wheezy", WheezyAccessory);
};
//# sourceMappingURL=index.js.map