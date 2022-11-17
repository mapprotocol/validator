import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";


async function main() {

  let [wallet] = await ethers.getSigners();


}

async function deployManager(wallet: SignerWithAddress) {
  const Manager = await ethers.getContractFactory("HelperManager");
  const manager = await Manager.connect(wallet).deploy();
  await manager.deployed();
  console.log("manager deployed to .....", manager.address);
}


async function createHelper(wallet: SignerWithAddress, _manager: string) {

  const Manager = await ethers.getContractFactory("HelperManager");
  let manager = Manager.attach(_manager);
  let result = await (await manager.createHelper(wallet.address)).wait();
  console.log(result);
}

async function editAdmin(wallet: SignerWithAddress, _manager: string) {
  const Manager = await ethers.getContractFactory("HelperManager");
  let manager = Manager.attach(_manager);
  await (await manager.updateAdmin(wallet, true)).wait();
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
