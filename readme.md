# Contribute frontend

This is the initial UI created by the Contribute team. Feel free to fork, tweak and deploy your own (or just get some inspiration and build yours from scratch).

## Installation

### Clone

    git clone git@github.com:Contribute-Defi/website

### Install dependencies

    yarn

### Setup
    
    cp .env.example .env
    vim .env    

### Run

    yarn dev
    
### Deploy
    
    yarn deploy:ftp
    
Feel free to create your own deploy script. The FTP one expects a few environment variables to be set.
    
### Setup contracts
    
In the `contracts` folder, you'll find contract data in the format Truffle (and other build tools) produce them, i.e. a JSON with an ABI and a list of networks the contract is deployed on (the networks part applies for Contribute contract only).

If you wanna deploy your own contracts, make sure to update the address in the Contribute.json file

## Few notes from your develper

- It's React on ES6 Javascript. I didn't bother with typescript on this one.
- The architecture isn't top notch, the development was fairly hasted, there are no tests
- It's intended as a on-off thing. No maintanence except for serious bugs.
- That being said, the code is pretty simple and self-explanatory. For anyone with some React experience, it's gonna be a pice of cake to clone & improve.
- Hey, it's just an interface for the smart contracts
