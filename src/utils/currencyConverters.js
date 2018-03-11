/*
`C` - Collateral field (Autofilled one).
`TA` - Total amount (The field that user types amount he want's to borrow)
`LTV = 0.5` Store this as separate variable, we are going to be changing this later on)
`APR = 0.2` Same as LTV
`P` - Price of Bitcoin/Etherium
`TE` -  Term the field where user enters for how long he borrows the money. For now can be 3, 6 or 12.
*/

const LTV = 0.5;
const ARP = 0.2;

export const convertFromUSDToCrypto = (TA, P, TE) => {
  return TA / (LTV * P * (1 - ARP / 12 * TE));
};

export const convertFromCryptoToUSD = (С, P, TE) => {
  return С * (LTV * P * (1 - ARP / 12 * TE));
};
