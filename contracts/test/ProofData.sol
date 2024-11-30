// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "bundle/inheritance/storage/Schema.sol";

library ProofData {
    function getHash() internal pure returns (uint) {
        return
            0x2778f900758cc46e051040641348de3dacc6d2a31e2963f22cbbfb8f65464241;
    }

    function getProof1() internal pure returns (Schema.ZKProof memory) {
        return
            Schema.ZKProof({
                pA: [
                    0x1c47eb0f8ddf19edb4add8d08d24f64807c1c1388c42f786665a9bc6a6cf41c6,
                    0x2cee9379edb8a7961fbf8d122a8a8774b440ab76066e20d360a9dd09c01ebb8d
                ],
                pB: [
                    [
                        0x1ad1020e66cee666a3f22782916cdb3dc27792ec96c6fbd2a722f56a610d4a0c,
                        0x0856580846bc495168eb4a3337c69a16286c94387558c9207366e033be03a408
                    ],
                    [
                        0x04e1c3dc2b3a8113f2ad52e1844ba6d3aa09628b5deca9264c51764671ca0a7d,
                        0x1bdbfadc9ba1f032dbf673fda729e1742875398764f22f02f080b9cbe4df98cb
                    ]
                ],
                pC: [
                    0x08091c0923fc9cce2442a64e4f4bb09577bdba74fe2e58a3b17f000838e14e40,
                    0x03922b405a413629b3f700d03e810fbdaa396c3b33e54134bc09cc848bb971a0
                ],
                pubSignals: [
                    0x2778f900758cc46e051040641348de3dacc6d2a31e2963f22cbbfb8f65464241
                ]
            });
    }

    function getProof2() internal pure returns (Schema.ZKProof memory) {
        return
            Schema.ZKProof({
                pA: [
                    0x036020a79758e0294650c3ea4fc4a5aa46b1ea06a6315daaecdb2eb7063ed14c,
                    0x0c4b7acca98f2b68fc8a5e13571da207c78b49c451c3d507f11cbc8bcb4d2edf
                ],
                pB: [
                    [
                        0x0e219a86bbca2ed02bb2e8cc45e428457a4bc8fc5eb8e36a947c41582213a2ec,
                        0x08caff9fb06e9671230ecae7f80ad0c3eaabc16b04e6df63956eea0d6213708b
                    ],
                    [
                        0x09b40b3f67702564b67684ae5da37fd54dfcca731c6b99d19e775b70cc566c5c,
                        0x10e3197a94b93411693f5e2fb119b711ea77e16dd9ed6497c2c13f341a2e3c2b
                    ]
                ],
                pC: [
                    0x15edc754e752259785b2b345f72f6e75cf27cb22f7e693476e8a3911a009b2b4,
                    0x1e97a78bd5be55d3de9c2dcefeaa93ea07a62a5eaf3c8c63cc8f478c31c59adc
                ],
                pubSignals: [
                    0x2778f900758cc46e051040641348de3dacc6d2a31e2963f22cbbfb8f65464241
                ]
            });
    }

    function getProofValidator1()
        internal
        pure
        returns (Schema.ZKProof memory)
    {
        return
            Schema.ZKProof({
                pA: [
                    0x2833183146448bf3463ff91a0535df07c050a587fb5d0b335b93f046161ecbc4,
                    0x0fe0c4c7396526aad83d3fa3e5a8cecf25cba5f59a659627f2ae7501a80dc9fd
                ],
                pB: [
                    [
                        0x12403e95e8d8e51cdea55447ad0b63fee2cb2005312e7b0165cbbc909176a747,
                        0x21563bd855faf219c391da4dc47e2913bf687848b1a152e535e6c5bf16122845
                    ],
                    [
                        0x2fbd7c5604d968d18368a0df81d9c97fda59252774e006c0b3177f6a35d5e3d4,
                        0x02e6cdc61a48db790f5ed7c66a4763e58f1dedef60d9ea6075ac6dcb4c285f68
                    ]
                ],
                pC: [
                    0x26b91476415ea635a1e53af61e7f9cc28f4a0e31600201c0a49fbe7e28eba39b,
                    0x1b88c2e14050c600b315701ea492513e2d1955789be9b5e6d50cce3e0414fa73
                ],
                pubSignals: [
                    uint256(
                        0x0000000000000000000000000000000000000000000000000000000000000000
                    )
                ]
            });
    }
}
