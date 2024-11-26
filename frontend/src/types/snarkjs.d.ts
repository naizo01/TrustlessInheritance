// src/types/snarkjs.d.ts
declare module 'snarkjs' {
    export namespace groth16 {
        export function fullProve(
            input: any,
            wasmFile: string,
            zkeyFile: string
        ): Promise<{
            proof: {
                pi_a: string[],
                pi_b: string[][],
                pi_c: string[]
            },
            publicSignals: string[]
        }>;

        export function verify(
            verificationKey: any,
            publicSignals: string[],
            proof: any
        ): Promise<boolean>;
    }
}