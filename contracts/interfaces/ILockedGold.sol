// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface ILockedGold {
    function getAccountNonvotingLockedGold(address)
        external
        view
        returns (uint256);

    function getAccountTotalLockedGold(address) external view returns (uint256);

    function getTotalLockedGold() external view returns (uint256);

    function getPendingWithdrawals(address)
        external
        view
        returns (uint256[] memory, uint256[] memory);

    function getTotalPendingWithdrawals(address)
        external
        view
        returns (uint256);

    function lock() external payable;

    function unlock(uint256) external;

    function relock(uint256, uint256) external;

    function withdraw(uint256) external;
}
