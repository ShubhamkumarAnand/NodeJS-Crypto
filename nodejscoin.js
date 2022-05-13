//import that secure hash algorithm from the crypto-js package
const SHA256 = require("crypto-js/sha256")

//create a JavaScript class to represent a Block
class Block {

  constructor (index, timeStamp, data, previousHash) {
    this.index = index
    this.timeStamp = timeStamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.generateHash()
  }

  generateHash() {
    return SHA256(this.index + this.timeStamp + this.previousHash + JSON.stringify(this.data).toString())
  }
}

// Creating the class of BlockChain
class Blockchain {
  constructor () {
    this.blockchain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, '13/05/2022', 'first Block on the Chain', '0')
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.computeHash()
    this.blockchain.push(newBlock)
  }

  // testing the integrity of the chain
  validateChainIntegrity() {
    for (let i = 1;i < this.blockchain.length;i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      return true;

    }
  }
}

let imskanandCoin = new Blockchain();
console.log("mining imskanandCoin in progress...");
imskanandCoin.addNewBlock(
  new Block(1, "06/04/2022", {
    sender: "Shubham Kumar Anand",
    recipient: "IronMan",
    quantity: 25
  })
);

imskanandCoin.addNewBlock(
  new Block(2, "08/08/2022", {
    sender: "Batman",
    recipient: "SuperMan",
    quantity: 34
  })
);

imskanandCoin.addNewBlock(
  new Block(3, "13/08/2022", {
    sender: "Elena",
    recipient: "Paul",
    quantity: 34
  })
);
console.log(JSON.stringify(imskanandCoin, null, 5))
