# Contribute frontend

## About

This is the initial ("official") UI created by the Contribute team. 

## Contributing

If you feel like joining us, you have three options (we definitely prefer the first one!):

1. Help improve the "official" website by creating pull requests.
2. Forking, tweaking and deploying your own version.
3. Just take some inspiration and build your own project.


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

For the live website, the deploy script expects some ENV variables setup. Feel free to create your own deploy script.
    
### Setup contracts
    
In the `contracts` folder, you'll find contract data in the format Truffle (and other build tools) produce them, i.e. a JSON with an ABI and a list of networks the contract is deployed on (the networks part applies for Contribute contract only).

If you wanna deploy your own contracts (on a local dev net, on Kovan or even Mainnet), make sure to update the address(es) in the Contribute.json file

## Few friendly notes from the initial developer

- It's React with functional components & hooks on ES6 Javascript. I didn't bother with typescript on this one.
- The code should be pretty simple and self-explanatory. For anyone with some React experience, it's gonna be a pice of cake to jump in. 
- The architecture isn't top notch, the development was fairly hasted, there are no tests. It's just an interface for smart contracts after all.

Join us and help us improve the project!
