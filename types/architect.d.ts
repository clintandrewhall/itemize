/// <reference types="node" />
declare module '@architect/functions';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test' | 'staging';
  }
}
