// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface IAccounts {
    function isAccount(address) external view returns (bool);

    function voteSignerToAccount(address) external view returns (address);

    function validatorSignerToAccount(address) external view returns (address);

    function attestationSignerToAccount(address)
        external
        view
        returns (address);

    function signerToAccount(address) external view returns (address);

    function getAttestationSigner(address) external view returns (address);

    function getValidatorSigner(address) external view returns (address);

    function getVoteSigner(address) external view returns (address);

    function hasAuthorizedVoteSigner(address) external view returns (bool);

    function hasAuthorizedValidatorSigner(address) external view returns (bool);

    function hasAuthorizedAttestationSigner(address)
        external
        view
        returns (bool);

    function setIndexedSigner(address signer, bytes32 role) external;

    function setAccountDataEncryptionKey(bytes calldata) external;

    function setMetadataURL(string calldata) external;

    function setName(string calldata) external;

    function setWalletAddress(
        address,
        uint8,
        bytes32,
        bytes32
    ) external;

    function setAccount(
        string calldata,
        bytes calldata,
        address,
        uint8,
        bytes32,
        bytes32
    ) external;

    function getDataEncryptionKey(address) external view returns (bytes memory);

    function getWalletAddress(address) external view returns (address);

    function getMetadataURL(address) external view returns (string memory);

    function batchGetMetadataURL(address[] calldata)
        external
        view
        returns (uint256[] memory, bytes memory);

    function getName(address) external view returns (string memory);

    function authorizeVoteSigner(
        address,
        uint8,
        bytes32,
        bytes32
    ) external;

    function authorizeValidatorSigner(
        address,
        uint8,
        bytes32,
        bytes32
    ) external;

    function authorizeValidatorSignerWithPublicKey(
        address,
        uint8,
        bytes32,
        bytes32,
        bytes calldata
    ) external;

    function authorizeSignerWithSignature(
        address signer,
        bytes32 role,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function authorizeValidatorSignerWithKeys(
        address,
        uint8,
        bytes32,
        bytes32,
        bytes calldata,
        bytes calldata,
        bytes calldata,
        bytes calldata
    ) external;

    function authorizeAttestationSigner(
        address,
        uint8,
        bytes32,
        bytes32
    ) external;

    function completeSignerAuthorization(address account, bytes32 role)
        external;

    function removeIndexedSigner(bytes32 role) external;

    function removeSigner(address signer, bytes32 role) external;

    function removeVoteSigner() external;

    function removeValidatorSigner() external;

     function removeAttestationSigner() external;

    function authorizeSigner(address signer, bytes32 role) external;

    function createAccount() external returns (bool);
}
