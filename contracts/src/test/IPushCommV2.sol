// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IPushCommV2 {
    /**
     * @notice Allows a Channel Owners, Delegates as well as Users to send Notifications
     * @param _channel address of the Channel
     * @param _recipient address of the receiver of the Notification
     * @param _identity Info about the Notification
     * @return bool indicating success of the notification sending
     **/
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external returns (bool);
}