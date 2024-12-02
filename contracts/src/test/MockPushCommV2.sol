// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract MockPushCommV2 {

    event SendNotification(
        address indexed channel,
        address indexed recipient,
        bytes identity
    );

    // Override the sendNotification function
    function sendNotification(
        address _channel,
        address _recipient,
        bytes memory _identity
    ) public returns (bool) {
        // Mock behavior: simply emit the event without any checks
        emit SendNotification(_channel, _recipient, _identity);
        return true;
    }
}