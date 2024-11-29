https://hackernoon.com/javascript-tutorial-for-zero-knowledge-proofs-using-snarkjs-and-circom

```
circom poseidon_hasher.circom --wasm --r1cs -o ./build
npx snarkjs groth16 setup build/poseidon_hasher.r1cs powersOfTau28_hez_final_12.ptau circuit_0000.zkey
npx snarkjs zkey export verificationkey circuit_0000.zkey verification_key_hasher.json
npx snarkjs zkey export solidityverifier circuit_0000.zkey Groth16Verifier_hasher.sol
```

```
circom Poseidon_validator.circom --wasm --r1cs -o ./build
npx snarkjs groth16 setup build/Poseidon_validator.r1cs powersOfTau28_hez_final_12.ptau circuit_validator.zkey
npx snarkjs zkey export verificationkey circuit_validator.zkey verification_key_validator.json
npx snarkjs zkey export solidityverifier circuit_validator.zkey Groth16Verifier_validator.sol
```

```
circom Password_validator.circom --wasm --r1cs -o ./build
npx snarkjs groth16 setup build/Password_validator.r1cs powersOfTau28_hez_final_12.ptau circuit_password.zkey
npx snarkjs zkey export verificationkey circuit_password.zkey verification_key_password.json
npx snarkjs zkey export solidityverifier circuit_password.zkey Groth16Verifier_password.sol
```
