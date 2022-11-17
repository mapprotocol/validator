// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./interfaces/IAccounts.sol";
import "./interfaces/IValidators.sol";
import "./interfaces/ILockedGold.sol";
import "./interfaces/IElection.sol";
import "./HelperManager.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ValidatorHelper is ReentrancyGuard {
    address public constant ACCOUNTS_ADDRESS =
        0x000000000000000000000000000000000000d010;
    address public constant LOCKED_GOLDADDRESS =
        0x000000000000000000000000000000000000d011;
    address public constant VALIDATORS_ADDRESS =
        0x000000000000000000000000000000000000D012;
    address public constant ELECTIONS_ADDRESS =
        0x000000000000000000000000000000000000d013;

    uint256 public constant validatorMinLockRequire = 1000000 ether;

    uint256 public sponsorAmount;

    HelperManager public manager;

    constructor() {
        manager = HelperManager(msg.sender);
    }

    modifier onlyManageAdmin() {
        require(manager.isAdmin(msg.sender), "manager :: deny");
        _;
    }

    modifier onlyAdmin() {
        require(
            manager.getHelperAdmin(address(this)) == msg.sender ||
                manager.isAdmin(msg.sender),
            "deny"
        );
        _;
    }

    receive() external payable {}

    // <-------------------------------------- validator ----------------------------------------------->

    function registerValidator(
        uint256 commission, //100000
        address lesser,
        address greater,
        bytes[] calldata keys
    ) public onlyAdmin returns (bool) {
        IValidators validator = IValidators(VALIDATORS_ADDRESS);
        bool success = validator.registerValidator(
            commission,
            lesser,
            greater,
            keys
        );
        require(success, "Failed to register validator");
        return true;
    }

    function setNextCommissionUpdate(uint256 commission) external onlyAdmin {
        IValidators(VALIDATORS_ADDRESS).setNextCommissionUpdate(commission);
    }

    function updateCommission() external onlyAdmin {
        IValidators(VALIDATORS_ADDRESS).updateCommission();
    }

    function updateBlsPublicKey(
        bytes calldata blsPublicKey,
        bytes calldata blsG1PublicKey,
        bytes calldata blsPop
    ) external onlyAdmin returns (bool) {
        return
            IValidators(VALIDATORS_ADDRESS).updateBlsPublicKey(
                blsPublicKey,
                blsG1PublicKey,
                blsPop
            );
    }

    function deregisterValidator() external onlyAdmin returns (bool) {
        return IValidators(VALIDATORS_ADDRESS).deregisterValidator();
    }

    function revertRegisterValidator() external onlyAdmin returns (bool) {
        return IValidators(VALIDATORS_ADDRESS).revertRegisterValidator();
    }

    function getActiveVotesForValidatorByAccount(
        address validator,
        address account
    ) public view returns (uint256) {
        IElection election = IElection(VALIDATORS_ADDRESS);
        return election.getActiveVotesForValidatorByAccount(validator, account);
    }

    function isPendingDeRegisterValidator() external view returns (bool) {
        return IValidators(VALIDATORS_ADDRESS).isPendingDeRegisterValidator();
    }

    // <-------------------------------------- Election ----------------------------------------------->

    function voter(
        address validator,
        uint256 value,
        address lesser,
        address greater
    ) public onlyAdmin returns (bool) {
        IElection election = IElection(ELECTIONS_ADDRESS);
        require(
            election.vote(validator, value, lesser, greater),
            "Failed to voter"
        );
        return true;
    }

    function activate(address validator) external onlyAdmin returns (bool) {
        return IElection(ELECTIONS_ADDRESS).activate(validator);
    }

    function activateForAccount(address validator, address account)
        external
        onlyAdmin
        returns (bool)
    {
        return
            IElection(ELECTIONS_ADDRESS).activateForAccount(validator, account);
    }

    function revokePending(
        address validator,
        uint256 value,
        address lesser,
        address greater,
        uint256 index
    ) external onlyAdmin returns (bool) {
        IElection election = IElection(ELECTIONS_ADDRESS);
        require(
            election.revokeActive(validator, value, lesser, greater, index),
            "Failed to revoke Pending"
        );
        return true;
    }

    function revokeActive(
        address validator,
        uint256 value,
        address lesser,
        address greater,
        uint256 index
    ) public onlyAdmin returns (bool) {
        IElection election = IElection(ELECTIONS_ADDRESS);
        require(
            election.revokeActive(validator, value, lesser, greater, index),
            "Failed to revoke active"
        );
        return true;
    }

    function revokeAllActive(
        address validator,
        address lesser,
        address greater,
        uint256 index
    ) external onlyAdmin returns (bool) {
        return
            IElection(ELECTIONS_ADDRESS).revokeAllActive(
                validator,
                lesser,
                greater,
                index
            );
    }

    // <-------------------------------------- Accounts ----------------------------------------------->

    function setAccount(
        string calldata name,
        bytes calldata dataEncryptionKey,
        address walletAddress,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).setAccount(
            name,
            dataEncryptionKey,
            walletAddress,
            v,
            r,
            s
        );
    }

    function createAccount(string calldata name)
        public
        onlyAdmin
        returns (bool)
    {
        IAccounts account = IAccounts(ACCOUNTS_ADDRESS);
        require(account.createAccount(), "Failed to create account");
        account.setName(name);
        return true;
    }

    function setName(string memory name) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).setName(name);
    }

    function setWalletAddress(
        address walletAddress,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).setWalletAddress(walletAddress, v, r, s);
    }

    function setAccountDataEncryptionKey(bytes memory dataEncryptionKey)
        public
        onlyAdmin
    {
        IAccounts(ACCOUNTS_ADDRESS).setAccountDataEncryptionKey(
            dataEncryptionKey
        );
    }

    function setMetadataURL(string calldata metadataURL) external onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).setMetadataURL(metadataURL);
    }

    function setIndexedSigner(address signer, bytes32 role) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).setIndexedSigner(signer, role);
    }

    function authorizeSignerWithSignature(
        address signer,
        bytes32 role,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeSignerWithSignature(
            signer,
            role,
            v,
            r,
            s
        );
    }

    function authorizeVoteSigner(
        address signer,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeVoteSigner(signer, v, r, s);
    }

    function authorizeValidatorSigner(
        address signer,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeValidatorSigner(signer, v, r, s);
    }

    function authorizeValidatorSignerWithPublicKey(
        address signer,
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes calldata ecdsaPublicKey
    ) external onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeValidatorSignerWithPublicKey(
            signer,
            v,
            r,
            s,
            ecdsaPublicKey
        );
    }

    function authorizeValidatorSignerWithKeys(
        address signer,
        uint8 v,
        bytes32 r,
        bytes32 s,
        bytes calldata ecdsaPublicKey,
        bytes calldata blsPublicKey,
        bytes calldata blsG1PublicKey,
        bytes calldata blsPop
    ) external onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeValidatorSignerWithKeys(
            signer,
            v,
            r,
            s,
            ecdsaPublicKey,
            blsPublicKey,
            blsG1PublicKey,
            blsPop
        );
    }

    function authorizeAttestationSigner(
        address signer,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeAttestationSigner(signer, v, r, s);
    }

    function authorizeSigner(address signer, bytes32 role) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).authorizeSigner(signer, role);
    }

    function completeSignerAuthorization(address account, bytes32 role)
        public
        onlyAdmin
    {
        IAccounts(ACCOUNTS_ADDRESS).completeSignerAuthorization(account, role);
    }

    function removeIndexedSigner(bytes32 role) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).removeIndexedSigner(role);
    }

    function removeSigner(address signer, bytes32 role) public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).removeSigner(signer, role);
    }

    function removeVoteSigner() public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).removeVoteSigner();
    }

    function removeValidatorSigner() public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).removeValidatorSigner();
    }

    function removeAttestationSigner() public onlyAdmin {
        IAccounts(ACCOUNTS_ADDRESS).removeAttestationSigner();
    }

    // function authorize(
    //     address signer,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) public onlyAdmin returns (bool) {
    //     IAccounts account = IAccounts(accountsAddress);
    //     account.authorizeValidatorSigner(signer, v, r, s);
    //     return true;
    // }

    // <-------------------------------------- LockedGold ----------------------------------------------->

    function lock(uint256 amount) public onlyAdmin returns (bool) {
        (bool success, ) = LOCKED_GOLDADDRESS.call{value: amount}(
            abi.encodeWithSignature("lock()", "")
        );
        require(success, "Failed to lock gold");
        return true;
    }

    function unlock(uint256 value) external onlyAdmin {
        //  if (IValidators(validatorsAddress).isValidator(address(this))) {
        ILockedGold(LOCKED_GOLDADDRESS).unlock(value);
    }

    function relock(uint256 index, uint256 value) external onlyAdmin {
        ILockedGold(LOCKED_GOLDADDRESS).relock(index, value);
    }

    function withdraw(uint256 index) public onlyAdmin returns (bool) {
        ILockedGold locked = ILockedGold(LOCKED_GOLDADDRESS);
        locked.withdraw(index);
        return true;
    }

    function getAccountTotalLockedGold(address account)
        public
        view
        returns (uint256)
    {
        return
            ILockedGold(LOCKED_GOLDADDRESS).getAccountTotalLockedGold(account);
    }

    function getAccountNonvotingLockedGold(address account)
        public
        view
        returns (uint256)
    {
        ILockedGold locked = ILockedGold(LOCKED_GOLDADDRESS);
        return locked.getAccountNonvotingLockedGold(account);
    }

    function getPendingWithdrawals(address account)
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        return ILockedGold(LOCKED_GOLDADDRESS).getPendingWithdrawals(account);
    }

    function getTotalPendingWithdrawals(address account)
        public
        view
        returns (uint256)
    {
        return
            ILockedGold(LOCKED_GOLDADDRESS).getTotalPendingWithdrawals(account);
    }

    // <-------------------------------------- other ----------------------------------------------->
    function withrawOut(
        uint256 value,
        address payable reveiver,
        bool isSponsor
    ) public nonReentrant returns (bool) {
        uint256 amount;

        if (isSponsor) {
            require(manager.isAdmin(msg.sender), "deny");
            require(
                getBalance() >= sponsorAmount && sponsorAmount > 0,
                "balance unenoungh"
            );

            amount = sponsorAmount;

            sponsorAmount = 0;
        } else {
            require(
                manager.getHelperAdmin(address(this)) == msg.sender,
                "deny"
            );
            require(getBalance() >= value, "balance unenoungh");

            require(
                getBalance() + getAccountTotalLockedGold(address((this))) >=
                    value + sponsorAmount,
                "too many"
            );

            amount = value;
        }

        reveiver.transfer(amount);

        return true;
    }

    function sponsor() public payable onlyManageAdmin {
        sponsorAmount += msg.value;
    }

    function emergencyExit(address payable _reveiver) public onlyManageAdmin {
        _reveiver.transfer(getBalance());
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
