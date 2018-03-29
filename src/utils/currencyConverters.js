/*
`C` - Collateral field (Autofilled one).
`TA` - Total amount (The field that user types amount he want's to borrow)
`LTV = 0.5` Store this as separate variable, we are going to be changing this later on)
`APR` Same as LTV
`P` - Price of Bitcoin/Etherium
`TE` -  Term the field where user enters for how long he borrows the money. For now can be 3, 6 or 12.
`teType` - TA in a backend-supported format. 0 - 3 months, 1 - 6 months, 2 - 12 months
*/

export const LTV = 0.35;

export const getTE = teType => {
  if (typeof teType === 'undefined') return null;

  const TEByType = {
    0: 3,
    1: 6,
    2: 12
  };
  return TEByType[Number(teType)];
};

export const getAPR = teType => {
  if (typeof teType === 'undefined') return null;

  const APRByTEType = {
    0: 0.2,
    1: 0.18,
    2: 0.17
  };
  return APRByTEType[Number(teType)];
};

export const convertFromUSDToCrypto = ({ TA, P, TE, APR }) => {
  return TA / (LTV * P * (1 - APR / 12 * TE));
};

export const convertFromCryptoToUSD = ({ C, P, TE, APR }) => {
  return C * (LTV * P * (1 - APR / 12 * TE));
};

export const calculateTLA = ({ TA, TE, APR }) => {
  return TA / (1 - APR / 12 * TE);
};
