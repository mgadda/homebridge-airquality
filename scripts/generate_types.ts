
import * as acorn from "acorn";
import { readFile } from "fs";
import { promisify } from "util";
import { ExpressionStatement, AssignmentExpression, MemberExpression } from "estree";

enum ContainerType {
  Characteristic,
  Service,
  Unknown
}
interface ContainerDefinition {
  kind: ContainerType;
  name: string;
}
function isContainerDefinition(obj: any): obj is ContainerDefinition {
  return obj && obj.hasOwnProperty('kind');
}

interface EnumDefinition {
  containerName: string;
  enumName: string;
  enumValue: string | number;
}

function isEnumDefinition(obj: any): obj is EnumDefinition {
  return obj && obj.hasOwnProperty('enumName');
}

function visitContainerDefinition(expr: MemberExpression): ContainerDefinition {
  if (expr.object.type === "Identifier" && expr.property.type === "Identifier") {
    switch (expr.object.name) {
      case "Characteristic":
        return {
          kind: ContainerType.Characteristic,
          name: expr.property.name
        }
      case "Service":
        return {
          kind: ContainerType.Service,
          name: expr.property.name
        } 
      default:      
        throw new Error("Unknown container type: " + expr.object.toString());
    }
  }
  throw new Error("Invalid MemberExpression: " + expr.toString());
}
function visitAssignmentExpression(
  expr: AssignmentExpression
): ContainerDefinition | EnumDefinition | undefined {
  // Constructor definition
  if (expr.left.type === "MemberExpression" && expr.right.type === "FunctionExpression") {    
    return visitContainerDefinition(expr.left);
  }

  // Enum assignment
  if (expr.left.type === "MemberExpression"
      && expr.left.object.type === "MemberExpression" 
      && expr.left.object.object.type === "Identifier" // Characteristic. | Service
      && expr.left.object.property.type === "Identifier" // AirParticulateDensity.
      && expr.left.property.type === "Identifier" // ON
      && expr.left.property.name !== "UUID"
      && expr.right.type === "Literal") {  // = 1
    
    const containerType = expr.left.object.object.name;
    let enumValue: string | number = "";
    if (typeof expr.right.value === "string" || typeof expr.right.value === "number") {
      enumValue = expr.right.value;
    }
    return {
      containerName: expr.left.object.property.name,
      enumName: expr.left.property.name,
      enumValue
    };    
  }    
}

function visitExpression(expr: ExpressionStatement): ContainerDefinition | EnumDefinition | undefined {
  if (expr.expression.type === "AssignmentExpression") {    
    return visitAssignmentExpression(expr.expression);
  }  
}

type ContainerResult = { kind: ContainerType, name: string, enums: EnumDefinition[] };

async function main(): Promise<IterableIterator<ContainerResult>> {
    
  const filePath = process.argv[2];
  const file = await promisify(readFile)(filePath);  
  const result = acorn.parse(file.toString());
  
  let containers = new Map<string, ContainerResult>();
  
  result.body.forEach(element => {
    if (element.type === "ExpressionStatement") {      
      const obj = visitExpression(element);
      if (isContainerDefinition(obj)) {                
        const container = containers.get(obj.name);
        if (!container) {
          containers.set(obj.name, {
            kind: obj.kind,
            name: obj.name,
            enums: []
          });
        } else {
          container.kind = obj.kind;          
        }    
      } else if (isEnumDefinition(obj)) {
        const container = containers.get(obj.containerName);
        if (container) {
          container.enums.push(obj);
        } else {
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
  return containers.values();
}


function printContainers(containerIterator: IterableIterator<ContainerResult>) {
  const containers = Array.from(containerIterator);

  console.log("import { Characteristic, Service } from \"./index\";");

  for (let container of Array.from(containers)) {
    const staticEnumVars = container.enums.map((value: EnumDefinition) =>
      `static ${value.enumName}: ${value.containerName}State;`
    );

    var enumStates = "";
    if (container.enums.length > 0) {
      const enumDefinitions = container.enums.map((value: EnumDefinition) => {
        if (typeof value.enumValue === "string") {
          return `${value.enumName} = "${value.enumValue}",`
        } else {
          return `${value.enumName} = ${value.enumValue},`
        }        
      }
        
      );    
      enumStates = `export enum ${container.name}State {
        ${enumDefinitions.join("\n")}
      }`
    }

    const out = 
      `export class ${container.name} extends ${ContainerType[container.kind]} {
         ${staticEnumVars.join("\n")}
       }
       ${enumStates}`;
       
    console.log(out);
  }

  console.log(`
    /*
    import * as HomeKitTypes from "./HomeKitTypes";
    */
  `);
  
  const staticCharacteristics = containers
    .filter(c => c.kind === ContainerType.Characteristic)
    .map((c) => 
      `static ${c.name}: typeof HomeKitTypes.${c.name};`
    );

  console.log(`
    /*
      // Paste the follow definitions into the 
      // Characteristics definition in index.t.ts

      ${staticCharacteristics.join("\n")}
    */
  `);

  const staticServices = containers
    .filter(c => c.kind === ContainerType.Service)
    .map((c) => 
      `static ${c.name}: typeof HomeKitTypes.${c.name};`
    );

  console.log(`
    /*
      // Paste the follow definitions into the 
      // Services definition in index.t.ts
      
      ${staticServices.join("\n")}
    */
  `);
}

main().catch((err) => {
  console.error(err);
});