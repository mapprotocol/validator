import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from 'hardhat/types';


//<------------------------------------------manager--------------------------------------->

task("createHelper",
    "create a validator Helper contract"
)
    .addParam("manager", "manager address")
    .addParam("admin", "helper admin")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        let HelperManager = await ethers.getContractFactory('HelperManager');

        let manager = HelperManager.attach(taskArgs.manager);

        let result = await (await manager.createHelper(taskArgs.admin)).wait();

        if (result.status == 1) {

            console.log('helper:', BigNumber.from(result.logs[0].topics[1]).toHexString())
        } else {
            console.log('create failed');
        }

    })

task("updateAdmin",
    "update manager admin"
)
    .addParam("manager", "manager address")
    .addParam("admin", "manager admin")
    .addParam("flag", "true for add,false for remove")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        let HelperManager = await ethers.getContractFactory('HelperManager');

        let manager = HelperManager.attach(taskArgs.manager);

        let result = await (await manager.updateAdmin(taskArgs.admin, taskArgs.flag)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }

    })

task("editHelperAdmin",
    "edit helper admin"
)
    .addParam("manager", "manager address")
    .addParam("helper", "helper address")
    .addParam("admin", "admin address to set")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        let HelperManager = await ethers.getContractFactory('HelperManager');

        let manager = HelperManager.attach(taskArgs.manager);

        let result = await (await manager.editHelperAdmin(taskArgs.helper, taskArgs.admin)).wait();

        if (result.status == 1) {
            console.log("succeed")
        } else {
            console.log('failed');
        }

    })

task("isAdmin",
    "check giving address is manager admin"
)
    .addParam("manager", "manager address")
    .addParam("addr", "address to check")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;

        let HelperManager = await ethers.getContractFactory('HelperManager');

        let manager = HelperManager.attach(taskArgs.manager);

        let result = await manager.isAdmin(taskArgs.addr);

        console.log(result);
    })

task("getHelperAdmin",
    "get helper admin"
)
    .addParam("manager", "manager address")
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;

        let HelperManager = await ethers.getContractFactory('HelperManager');

        let manager = HelperManager.attach(taskArgs.manager);

        let result = await manager.getHelperAdmin(taskArgs.helper);

        console.log(result);
    })

//<------------------------------------------helper--------------------------------------->

task("createAccount",
    "create account for helper"
)
    .addParam("helper", "helper address")
    .addParam("name", "name for account")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;

        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.createAccount(taskArgs.name)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })


task("setName",
    "set account name for helper"
)
    .addParam("helper", "helper address")
    .addParam("name", "name for account")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;

        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.setName(taskArgs.name)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })


task("setMetadataURL",
    "setMetadataURL"
)
    .addParam("helper", "helper address")
    .addParam("url", "name for account")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;

        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.setMetadataURL(taskArgs.uri)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//authorizeValidatorSigner
task("authorizeValidatorSigner",
    "authorizeValidatorSigner"
)
    .addParam("helper", "helper address")
    .addParam("singer", "siger for helper")
    .addParam('v', "v")
    .addParam('r', 'r')
    .addParam('s', 's')
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;

        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.authorizeValidatorSigner(taskArgs.singer, taskArgs.v, taskArgs.r, taskArgs.s)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//   sponsor
task("sponsor",
    "sponsor for helper"
)
    .addParam("helper", "helper address")
    .addParam("amount", "amount  sponsor")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).sponsor({ value: ethers.utils.parseEther(taskArgs.amount) })).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//lock

task("lock",
    "lock for map"
)
    .addParam("helper", "helper address")
    .addParam("amount", "amount to lock")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).lock(ethers.utils.parseEther(taskArgs.amount))).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//unlock

task("unlock",
    "lock for map"
)
    .addParam("helper", "helper address")
    .addParam("amount", "amount to unlock")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).unlock(ethers.utils.parseEther(taskArgs.amount))).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//relock
task("relock",
    "relock"
)
    .addParam("helper", "helper address")
    .addParam("index", "index")
    .addParam("amount", "amount to relock")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).relock(taskArgs.index, taskArgs.amount)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//withdraw
task("withdraw",
    "withdraw"
)
    .addParam("helper", "helper address")
    .addParam("index", "index")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).withdraw(taskArgs.index)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//getAccountTotalLockedGold

task("getAccountTotalLockedGold",
    "getAccountTotalLockedGold"
)
    .addParam("helper", "helper address")
    .addParam("addr", "address to qurey ")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).getAccountTotalLockedGold(taskArgs.addr);

        console.log(result)
    })
//getAccountNonvotingLockedGold
task("getAccountNonvotingLockedGold",
    "getAccountNonvotingLockedGold"
)
    .addParam("helper", "helper address")
    .addParam("addr", "address to qurey ")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).getAccountNonvotingLockedGold(taskArgs.addr);

        console.log(result)
    })


//getTotalPendingWithdrawals
task("getTotalPendingWithdrawals",
    "getTotalPendingWithdrawals"
)
    .addParam("helper", "helper address")
    .addParam("addr", "address to qurey ")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).getTotalPendingWithdrawals(taskArgs.addr);

        console.log(result)
    })


//getPendingWithdrawals
task("getPendingWithdrawals",
    "getPendingWithdrawals"
)
    .addParam("helper", "helper address")
    .addParam("addr", "address to qurey ")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).getPendingWithdrawals(taskArgs.addr);

        for (let i = 0; i < result[0].length; i++) {

            console.log('index:', result[0][i])
            console.log('amount:', result[1][i])
        }

        console.log(result)
    })


//withrawOut
task("withrawOut",
    "withrawOut"
)
    .addParam("helper", "helper address")
    .addParam("reveiver", "addr to receive")
    .addParam("amount", "amount to withrawOut")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).withrawOut(taskArgs.reveiver, taskArgs.amount)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })


//getBalance
task("getBalance",
    "get helper Balance "
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).getBalance();

        console.log(result)
    })


//registerValidator
task("registerValidator",
    "registerValidator"
)
    .addParam("helper", "helper address")
    .addParam("commission", "commission")
    .addParam("lesser", "lesser")
    .addParam("greater", "greater")
    .addParam("keys", "keys")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).registerValidator(taskArgs.commission, taskArgs.lesser, taskArgs.greater, taskArgs.keys)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })


//setNextCommissionUpdate
task("setNextCommissionUpdate",
    "setNextCommissionUpdate"
)
    .addParam("helper", "helper address")
    .addParam("commission", "commission")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).setNextCommissionUpdate(taskArgs.commission)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })
//updateCommission
task("updateCommission",
    "updateCommission"
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).updateCommission()).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//getActiveVotesForValidatorByAccount

task("getActiveVotesForValidatorByAccount",
    "getActiveVotesForValidatorByAccount"
)
    .addParam("helper", "helper address")
    .addParam("validator", "validator")
    .addParam("account", "account")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).getActiveVotesForValidatorByAccount(taskArgs.validator, taskArgs.account);

        console.log(result)
    })

//revertRegisterValidator

task("revertRegisterValidator",
    "revertRegisterValidator"
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).revertRegisterValidator();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//isPendingDeRegisterValidator
task("isPendingDeRegisterValidator",
    "isPendingDeRegisterValidator"
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).isPendingDeRegisterValidator();

        console.log(result)
    })

//voter
task("voter",
    "voter"
)
    .addParam("helper", "helper address")
    .addParam("validator", "validator")
    .addParam("value", "value")
    .addParam("lesser", "lesser")
    .addParam("greater", "greater")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).voter(taskArgs.validator, taskArgs.value, taskArgs.lesser, taskArgs.greater)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//revokePending

task("revokePending",
    "revokePending ....."
)
    .addParam("helper", "helper address")
    .addParam("validator", "validator")
    .addParam("value", "value")
    .addParam("lesser", "lesser")
    .addParam("greater", "greater")
    .addParam("index", "index")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).revokePending(taskArgs.validator, taskArgs.value, taskArgs.lesser, taskArgs.greater, taskArgs.index)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//revokeActive

task("revokeActive",
    "revokeActive"
)
    .addParam("helper", "helper address")
    .addParam("validator", "validator")
    .addParam("value", "value")
    .addParam("lesser", "lesser")
    .addParam("greater", "greater")
    .addParam("index", "index")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).revokeActive(taskArgs.validator, taskArgs.value, taskArgs.lesser, taskArgs.greater, taskArgs.index)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//revokeAllActive


task("revokeAllActive",
    "revokeAllActive"
)
    .addParam("helper", "helper address")
    .addParam("validator", "validator")
    .addParam("lesser", "lesser")
    .addParam("greater", "greater")
    .addParam("index", "index")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).revokeAllActive(taskArgs.validator, taskArgs.lesser, taskArgs.greater, taskArgs.index)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//setAccount


task("setAccount",
    "setAccount"
)
    .addParam("helper", "helper address")
    .addParam("name", "name")
    .addParam("dataEncryptionKey", "dataEncryptionKey")
    .addParam("walletAddress", "walletAddress")
    .addParam("v", "v")
    .addParam("r", "r")
    .addParam("s", "s")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).setAccount(taskArgs.name, taskArgs.dataEncryptionKey, taskArgs.walletAddress, taskArgs.v, taskArgs.r, taskArgs.s)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//authorizeSignerWithSignature

task("authorizeSignerWithSignature",
    "authorizeSignerWithSignature"
)
    .addParam("helper", "helper address")
    .addParam("signer", "signer")
    .addParam("role", "role")
    .addParam("v", "v")
    .addParam("r", "r")
    .addParam("s", "s")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).authorizeSignerWithSignature(taskArgs.signer, taskArgs.role, taskArgs.v, taskArgs.r, taskArgs.s)).wait()

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//authorizeVoteSigner

task("authorizeVoteSigner",
    "authorizeVoteSigner"
)
    .addParam("helper", "helper address")
    .addParam("signer", "signer")
    .addParam("v", "v")
    .addParam("r", "r")
    .addParam("s", "s")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).authorizeVoteSigner(taskArgs.signer, taskArgs.v, taskArgs.r, taskArgs.s)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//authorizeSigner
task("authorizeSigner",
    "authorizeSigner"
)
    .addParam("helper", "helper address")
    .addParam("signer", "signer")
    .addParam("role", "role")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).authorizeSigner(taskArgs.signer, taskArgs.role)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })


//removeSigner
task("removeSigner",
    "removeSigner"
)
    .addParam("helper", "helper address")
    .addParam("signer", "signer")
    .addParam("role", "role")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).removeSigner(taskArgs.signer, taskArgs.role)).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//removeVoteSigner

task("removeVoteSigner",
    "removeVoteSigner"
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).removeVoteSigner()).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//removeValidatorSigner

task("removeValidatorSigner",
    "removeValidatorSigner"
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await (await helper.connect(deployer).removeValidatorSigner()).wait();

        if (result.status == 1) {

            console.log("succeed")
        } else {
            console.log('failed');
        }
    })

//sponsorAmount

task("sponsorAmount",
    "sponsorAmount"
)
    .addParam("helper", "helper address")
    .setAction(async (taskArgs, HardhatRuntimeEnvironment) => {
        const { deployments, getNamedAccounts, ethers } = HardhatRuntimeEnvironment;
        const { deployer } = await getNamedAccounts();
        let ValidatorHelper = await ethers.getContractFactory('ValidatorHelper');

        let helper = ValidatorHelper.attach(taskArgs.helper);

        let result = await helper.connect(deployer).sponsorAmount();

        console.log(result)

    })