"use strict";
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
exports.__esModule = true;
var acorn = require("acorn");
var fs_1 = require("fs");
var util_1 = require("util");
var ContainerType;
(function (ContainerType) {
    ContainerType[ContainerType["Characteristic"] = 0] = "Characteristic";
    ContainerType[ContainerType["Service"] = 1] = "Service";
    ContainerType[ContainerType["Unknown"] = 2] = "Unknown";
})(ContainerType || (ContainerType = {}));
function isContainerDefinition(obj) {
    return obj && obj.hasOwnProperty('kind');
}
function isEnumDefinition(obj) {
    return obj && obj.hasOwnProperty('enumName');
}
function visitContainerDefinition(expr) {
    if (expr.object.type === "Identifier" && expr.property.type === "Identifier") {
        switch (expr.object.name) {
            case "Characteristic":
                return {
                    kind: ContainerType.Characteristic,
                    name: expr.property.name
                };
            case "Service":
                return {
                    kind: ContainerType.Service,
                    name: expr.property.name
                };
            default:
                throw new Error("Unknown container type: " + expr.object.toString());
        }
    }
    throw new Error("Invalid MemberExpression: " + expr.toString());
}
function visitAssignmentExpression(expr) {
    if (expr.left.type === "MemberExpression" && expr.right.type === "FunctionExpression") {
        return visitContainerDefinition(expr.left);
    }
    if (expr.left.type === "MemberExpression"
        && expr.left.object.type === "MemberExpression"
        && expr.left.object.object.type === "Identifier"
        && expr.left.object.property.type === "Identifier"
        && expr.left.property.type === "Identifier"
        && expr.left.property.name !== "UUID"
        && expr.right.type === "Literal") {
        var containerType = expr.left.object.object.name;
        var enumValue = "";
        if (typeof expr.right.value === "string" || typeof expr.right.value === "number") {
            enumValue = expr.right.value;
        }
        return {
            containerName: expr.left.object.property.name,
            enumName: expr.left.property.name,
            enumValue: enumValue
        };
    }
}
function visitExpression(expr) {
    if (expr.expression.type === "AssignmentExpression") {
        return visitAssignmentExpression(expr.expression);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, file, result, containers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = process.argv[2];
                    return [4, util_1.promisify(fs_1.readFile)(filePath)];
                case 1:
                    file = _a.sent();
                    result = acorn.parse(file.toString());
                    containers = new Map();
                    result.body.forEach(function (element) {
                        if (element.type === "ExpressionStatement") {
                            var obj = visitExpression(element);
                            if (isContainerDefinition(obj)) {
                                var container = containers.get(obj.name);
                                if (!container) {
                                    containers.set(obj.name, {
                                        kind: obj.kind,
                                        name: obj.name,
                                        enums: []
                                    });
                                }
                                else {
                                    container.kind = obj.kind;
                                }
                            }
                            else if (isEnumDefinition(obj)) {
                                var container = containers.get(obj.containerName);
                                if (container) {
                                    container.enums.push(obj);
                                }
                                else {
                                    containers.set(obj.containerName, {
                                        kind: ContainerType.Unknown,
                                        name: obj.containerName,
                                        enums: [obj]
                                    });
                                }
                            }
                        }
                    });
                    printContainers(containers.values());
                    return [2, containers.values()];
            }
        });
    });
}
function printContainers(containerIterator) {
    var containers = Array.from(containerIterator);
    console.log("import { Characteristic, Service } from \"./index\";");
    for (var _i = 0, _a = Array.from(containers); _i < _a.length; _i++) {
        var container = _a[_i];
        var staticEnumVars = container.enums.map(function (value) {
            return "static " + value.enumName + ": " + value.containerName + "State;";
        });
        var enumStates = "";
        if (container.enums.length > 0) {
            var enumDefinitions = container.enums.map(function (value) {
                if (typeof value.enumValue === "string") {
                    return value.enumName + " = \"" + value.enumValue + "\",";
                }
                else {
                    return value.enumName + " = " + value.enumValue + ",";
                }
            });
            enumStates = "export enum " + container.name + "State {\n        " + enumDefinitions.join("\n") + "\n      }";
        }
        var out = "export class " + container.name + " extends " + ContainerType[container.kind] + " {\n         " + staticEnumVars.join("\n") + "\n       }\n       " + enumStates;
        console.log(out);
    }
    console.log("\n    /*\n    import * as HomeKitTypes from \"./HomeKitTypes\";\n    */\n  ");
    var staticCharacteristics = containers
        .filter(function (c) { return c.kind === ContainerType.Characteristic; })
        .map(function (c) {
        return "static " + c.name + ": typeof HomeKitTypes." + c.name + ";";
    });
    console.log("\n    /*\n      // Paste the follow definitions into the \n      // Characteristics definition in index.t.ts\n\n      " + staticCharacteristics.join("\n") + "\n    */\n  ");
    var staticServices = containers
        .filter(function (c) { return c.kind === ContainerType.Service; })
        .map(function (c) {
        return "static " + c.name + ": typeof HomeKitTypes." + c.name + ";";
    });
    console.log("\n    /*\n      // Paste the follow definitions into the \n      // Services definition in index.t.ts\n      \n      " + staticServices.join("\n") + "\n    */\n  ");
}
main()["catch"](function (err) {
    console.error(err);
});
//# sourceMappingURL=generate_types.js.map