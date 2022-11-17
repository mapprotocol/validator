// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
//pragma experimental ABIEncoderV2;

interface IValidators {
    function registerValidator(uint256 commission, address lesser, address greater,bytes[] calldata blsBlsG1BlsPopEcdsaPub)
    external
    returns (bool);

    function revertRegisterValidator() external returns(bool);

    function deregisterValidator() external returns (bool);

    function updateBlsPublicKey(bytes calldata,bytes calldata, bytes calldata) external returns (bool);

    function updateCommission() external;

    function setNextCommissionUpdate(uint256) external;

    // view functions

    function isPendingDeRegisterValidator() external view returns (bool);

    function getAccountLockedGoldRequirement(address) external view returns (uint256);

    function meetsAccountLockedGoldRequirements(address) external view returns (bool);

    function updatePublicKeys(address, address, bytes calldata,bytes calldata, bytes calldata, bytes calldata)
    external
    returns (bool);

    function getValidatorLockedGoldRequirements() external view returns (uint256, uint256);

    function isValidator(address) external view returns (bool);



}
