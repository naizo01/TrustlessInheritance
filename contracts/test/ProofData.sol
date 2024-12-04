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
                    0x1a4b686fdc66703aea76eba8631a7ea765ec8a33af600bf83ed1c54711379eea,
                    0x0f01f7ee94d79b1da69e331c5f8f1451125e2538cd1e28e2aae38adb759471c9
                ],
                pB: [
                    [
                        0x14681991431c7ddb482b9020c27b24bf619f4e5a216aebdaf7c59e7c393fc63b,
                        0x15cde9f960e78725de494854583f82bddaa6d468fc59cf00f271cd9fd69b97f0
                    ],
                    [
                        0x0320d8cbe7ae260f8d2722ac0d49c5bd726a91d102a42520556c782da597ddbe,
                        0x21056dc244a33273d12a851d79e5e38f520882115c9efa9b0ccbeaae1488a348
                    ]
                ],
                pC: [
                    0x0ab06118592508429c39d9e83d352980e99329592f078fc177d6edf18433b809,
                    0x2d518d359abebe1044143c5d875096a0fff4d9aeff45977d9da0b6ec32f3861d
                ],
                pubSignals: [
                    0x0fb849f7cf35865c838cef48782e803b2c38263e2f467799c87eff168eb4d897
                ]
            });
    }
}
