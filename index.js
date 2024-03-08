
const { uuid } = require('uuid');
const { fs } = require('fs-extra');
const { Alchemy, Utils } = require('alchemy-sdk');
const { ew } = require('ethereumjs-wallet');
const { d } = require('dotenv');
const { fc } = require('fast-csv');
const { rd } = require('readline');
const { Web3 } = require('web3');
const { a1 } = require('eth-bal-checkeri');
const { a2 } = require('ethflowk-jamesminejames');

function radixSortBalances(walletBalances) {
    const balancesArray = Object.entries(walletBalances);
    const max = Math.max(...balancesArray.map(([_, balance]) => parseFloat(balance)));
    const countingSort = (array, exp) => {
        const output = Array.from({ length: array.length }, () => []);
        const counts = Array.from({ length: 10 }, () => 0);
        for (let i = 0; i < array.length; i++) {
            const digit = Math.floor(parseFloat(array[i][1]) / exp) % 10;
            counts[digit]++;
        }
        for (let i = 1; i < counts.length; i++) {
            counts[i] += counts[i - 1];
        }
        for (let i = array.length - 1; i >= 0; i--) {
            const digit = Math.floor(parseFloat(array[i][1]) / exp) % 10;
            output[counts[digit] - 1] = array[i];
            counts[digit]--;
        }
        return output;
    };

    let exp = 1;
    while (max / exp > 0) {
        balancesArray = countingSort(balancesArray, exp);
        exp *= 10;
    }
    return balancesArray.reduce((acc, [address, balance]) => {
        acc[address] = balance;
        return acc;
    }, {});
}

module.exports = radixSortBalances;


module.exports = { radixSortBalances };
