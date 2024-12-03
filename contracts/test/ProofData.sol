// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Schema} from "bundle/inheritance/storage/Schema.sol";

library ProofData {
    function getProof1() internal pure returns (Schema.ZKProof memory) {
        return
            Schema.ZKProof({
                pA: [
                    0x1e15968851ae2ea7133f03bdf8061fde8cd751998aaf37bca16e7cc454930cd5,
                    0x147c53fc481a8ed7be0233ebd8252b2206bcab71e668c3223c3ddd3ca45f65b8
                ],
                pB: [
                    [
                        0x1b59a4ba09f9cd8b696bd69a08c068533645b785681d3182d944d49e54da72ce,
                        0x1124dc7264974f2fbc3ae41a7ec5b8be5f68b53c8c09683706b2a56a7e315cf0
                    ],
                    [
                        0x04bb201135b69da303fd75844741e708b2ef352bee1177d97a401b55de1f2d1d,
                        0x2c4a2f9c0d02251bee8a5d838d24a644a20b0373ec22c179c82acfb1b74d80b9
                    ]
                ],
                pC: [
                    0x0fdee69e61d95a4c2e4fd2c96d746fcbe74c862b9eba4db95fb4dd18112ab75a,
                    0x00cdaae8eb225a01a4ef694c67756325c486c5554c4e6985c93ff02cd6994c8f
                ],
                pubSignals: [
                    0x0fb849f7cf35865c838cef48782e803b2c38263e2f467799c87eff168eb4d897
                ]
            });
    }

    function getProof2() internal pure returns (Schema.ZKProof memory) {
        return
            Schema.ZKProof({
                pA: [
                    0x2c2542e6f8de48029b034e20041613826100e22630319562d2fbf969f26ee74b,
                    0x1db65c9327655392c22702a0d4559f1cac427dcf9e562bea7b515f391384fa55
                ],
                pB: [
                    [
                        0x22772d516603cfec5f967c9cc618545c6cc90447a54df3cf89d67e7a1af3be0e,
                        0x075ec505670f10e264425b3edd9ba75a51258eaa107c30c92adfad46b5423817
                    ],
                    [
                        0x122fbd675f0ef26d5f5ecd76d648b7a565c645fdbf2c3e70687001b88f140e79,
                        0x082695c40c797104fc7ec3f56856a1e381bc2c0e402ccd0338d76093b5a31eb5
                    ]
                ],
                pC: [
                    0x012c48bae27f130d7331fd1ba3451baae5a02964a37fefd481cfeda3b822b96d,
                    0x1daa3e53c230146171777b35d1f414f73b89cee75d0f3dfae47a09cca9507b88
                ],
                pubSignals: [
                    0x0fb849f7cf35865c838cef48782e803b2c38263e2f467799c87eff168eb4d897
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
                    0x147e7f24d5cfb557a82bd072f598b6b567706a00255a13508f061601678c53c4,
                    0x12c33080193760b4c8aa5d6e9294e096b68d5330f4318f9f35e9f77ea98efe8f
                ],
                pB: [
                    [
                        0x15f47c475f4f060788cd370c0c31ba54ffb94ce9709b25e0adcf47da056a4f23,
                        0x10a1fc8da1fab4024952ba536c902c84943d55e6fb0ed0be682c4979d4a90fbc
                    ],
                    [
                        0x12c5128318985af099851d7af203c2be11b98df4ad4999bb8e2327450a0ba5ff,
                        0x2cc9d6af1d5970c0704f18c3c85d125880e79ef443c790739243be02407679c1
                    ]
                ],
                pC: [
                    0x059f517e9ea59a7ed5e90f5886e4311a7f223a1d3a5c1d3aeb5e9a66cc0a403f,
                    0x0d59a40fa5c6d8a8f464a47f09231b0e34e453d545372fa93ec5750f8b507c80
                ],
                pubSignals: [
                    0x0fb849f7cf35865c838cef48782e803b2c38263e2f467799c87eff168eb4d897
                ]
            });
    }
}
