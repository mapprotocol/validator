// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ValidatorHelper.sol";

contract HelperManager is Ownable {
    mapping(address => bool) admins;

    mapping(address => address) helperAdmin;

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "deny");
        _;
    }

    event CreateHelper(address indexed _helper, address _admin);

    event EditHelperAdmin(address indexed _helper, address indexed _admin);

    constructor() {}

    function updateAdmin(address _user, bool flag) public onlyOwner {
        admins[_user] = flag;
    }

    function editHelperAdmin(address _helper, address _newAdmin)
        public
        onlyAdmin
    {
        require(_newAdmin != address(0), "helperAdmin not be zero address");

        require(helperAdmin[_helper] != address(0), "helper not exiest");

        helperAdmin[_helper] = _newAdmin;

        emit EditHelperAdmin(_helper, _newAdmin);
    }

    function createHelper(address _admin) public onlyAdmin {
        require(_admin != address(0), "helperAdmin not be zero address");
        ValidatorHelper helper = new ValidatorHelper();
        require(address(helper) != address(0), "create failed");
        helperAdmin[address(helper)] = _admin;

        emit CreateHelper(address(helper), _admin);
    }

    function isAdmin(address _user) public view returns (bool) {
        return admins[_user] || _user == owner();
    }

    function getHelperAdmin(address _helper) public view returns (address) {
        return helperAdmin[_helper];
    }
}
