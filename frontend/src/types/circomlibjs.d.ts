// src/types/circomlibjs.d.ts
declare module 'circomlibjs' {
    export interface F {
        toString(n: any): string;
    }

    export interface Poseidon {
        F: F;
        (inputs: string[]): any;
    }

    export function buildPoseidon(): Promise<Poseidon>;
}