// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface IElection {
    function activateForAccount(address validator, address account)
        external
        returns (bool);

    function electValidatorSigners() external view returns (address[] memory);

    function electNValidatorSigners(uint256, uint256)
        external
        view
        returns (address[] memory);

    function vote(
        address,
        uint256,
        address,
        address
    ) external returns (bool);

    function activate(address) external returns (bool);

    function revokeActive(
        address,
        uint256,
        address,
        address,
        uint256
    ) external returns (bool);

    function revokeAllActive(
        address,
        address,
        address,
        uint256
    ) external returns (bool);

    function revokePending(
        address,
        uint256,
        address,
        address,
        uint256
    ) external returns (bool);


    // view functions
    function getElectableValidators() external view returns (uint256, uint256);

    function getElectabilityThreshold() external view returns (uint256);

    function getNumVotesReceivable() external view returns (uint256);

    function getTotalVotes() external view returns (uint256);

    function getActiveVotes() external view returns (uint256);

    function getTotalVotesByAccount(address) external view returns (uint256);

    function getPendingVotesForValidatorByAccount(address, address)
        external
        view
        returns (uint256);

    function getActiveVotesForValidatorByAccount(address, address)
        external
        view
        returns (uint256);

    function getTotalVotesForValidatorByAccount(address, address)
        external
        view
        returns (uint256);

    //  function getActiveVoteForValidatorByAccount(address, address) external view returns (uint256);
    function getTotalVotesForValidator(address) external view returns (uint256);

    function getActiveVotesForValidator(address)
        external
        view
        returns (uint256);

    function getPendingVotesForValidator(address)
        external
        view
        returns (uint256);

    function getValidatorEligibility(address) external view returns (bool);

    function getTopValidators(uint256) external view returns (address[] memory);

    function getValidatorsVotedForByAccount(address)
        external
        view
        returns (address[] memory);

    function getEligibleValidators() external view returns (address[] memory);

    function getTotalVotesForEligibleValidators()
        external
        view
        returns (address[] memory, uint256[] memory);

    function getCurrentValidatorSigners()
        external
        view
        returns (address[] memory);

    function canReceiveVotes(address, uint256) external view returns (bool);

    function hasActivatablePendingVotes(address, address)
        external
        view
        returns (bool);

}
