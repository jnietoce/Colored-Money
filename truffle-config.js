const HDWalletProvider = require("@truffle/hdwallet-provider")
require('dotenv').config(); // Load .env file
const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: "./public/contracts",

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.6",    // Fetch exact version from solc-bin (default: truffle's version)
       //docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      //  settings: {          // See the solidity docs for advice about optimization and evmVersion
      //   optimizer: {
      //     enabled: true,
      //     runs: 200
      //   },
      //   evmVersion: "byzantium"
      //  }
    }
  },
  
  networks: {
    mumbai: {
      
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://polygon-mumbai.infura.io/v3/158eedf735e84ba49990485a44c4a541'),
      //provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://rpc-mumbai.matic.today'),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    }
  }
};
