const SatoshiContract = artifacts.require("Satoshi");

module.exports = function (deployer) {
  deployer.deploy(SatoshiContract);
};
