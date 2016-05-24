// Generated by Tiger Oakes
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/cc3d223a946f661eff871787edeb0fcb8f0db156/systemjs/systemjs.d.ts
// Type definitions for System.js 0.18.4
// Project: https://github.com/systemjs/systemjs
// Definitions by: Ludovic HENIN <https://github.com/ludohenin/>, Nathan Walker <https://github.com/NathanWalker/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface System {
  import(name: string): any;
  defined: any;
  amdDefine: () => void;
  amdRequire: () => void;
  baseURL: string;
  paths: { [key: string]: string };
  meta: { [key: string]: Object };
  config: any;
}

declare var System: System;

declare module "systemjs" {
  export = System;
}