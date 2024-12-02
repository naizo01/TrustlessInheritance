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
                    0x00e8bff94ca04173d7563644afe4d369864533105d0ecad3f7945d0408b052ec,
                    0x2ed85957d465e5ea1aaf36ff68715861550a173b18aa594240e49defbc25bc86
                ],
                pB: [
                    [
                        0x139a3b52c94e3ac9bea92d0de5b0e074dc52474af4676236ff9c52d8c087904c,
                        0x23f202f8e5bad06561c17ec3ab25d3db7e1574d51eea48b2a1c72530801b9069
                    ],
                    [
                        0x069d4dba4fcf27e171059ebbb125f53eaa8c4716f8b5fb605f3ed2a02c8b90ba,
                        0x092f1ecbfd8c33d49e279b10fccceb4d597198fa70f7674aa1fe140f3128c5e2
                    ]
                ],
                pC: [
                    0x01038d4edf8544a3633fb7d39b1b2716c1261506fa436d8601131e9954cd0f97,
                    0x21066697298954f87e511d84ce606d47e0a129cbbcea7e2b083636dd3989506a
                ],
                pubSignals: [
                    0x0fb849f7cf35865c838cef48782e803b2c38263e2f467799c87eff168eb4d897
                ]
            });
    }
}
