const ColoredMoney = artifacts.require("ColoredMoney");

module.exports = function (deployer) {
  deployer.deploy(ColoredMoney);
};
