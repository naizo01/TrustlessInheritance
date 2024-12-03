// src/utils/generateZkProof.ts
import { buildPoseidon } from "circomlibjs";

/**
 * Poseidonハッシュを計算
 * @param input 入力値（数値文字列）
 * @returns ハッシュ値
 */
export async function poseidonHash(input) {
  const poseidon = await buildPoseidon();
  const hash = poseidon.F.toString(poseidon([input]));
  return hash;
}
