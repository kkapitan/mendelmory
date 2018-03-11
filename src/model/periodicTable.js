import { allElements } from "./allElements";

const numberOfPeriods = 9;
const numberOfGroups = 18;

const periodicTable = [];

for (let index = 0; index < numberOfPeriods; index++) {
  periodicTable[index] = new Array(numberOfGroups);
  periodicTable[index].fill(undefined);
}

const periodIdxForElement = element => {
  if (element.group === "Actinides") {
    return 7;
  }

  if (element.group === "Lanthanide") {
    return 8;
  }

  return element.period - 1;
};

const groupdIdxForElement = element => {
  if (element.group === "Actinides" || element.group === "Lanthanide") {
    const periodIdx = periodIdxForElement(element);
    return periodicTable[periodIdx].filter(e => e).length + 4;
  }

  return element.group - 1;
};

allElements.forEach(element => {
  const groupIdx = groupdIdxForElement(element);
  const periodIdx = periodIdxForElement(element);

  periodicTable[periodIdx][groupIdx] = element;
});

// // print

// console.log("BEGIN PERIODIC TABLE");

// for (let period = 0; period < numberOfPeriods; period++) {
//   let stringifiedPeriod = "";

//   for (let group = 0; group < numberOfGroups; group++) {
//     const element = periodicTable[period][group];
//     const symbol = element ? element.symbol : "x";
//     stringifiedPeriod = stringifiedPeriod + "[" + symbol + "]";
//   }

//   console.log(stringifiedPeriod);
// }
//
// console.log("END PERIODIC TABLE");

export { periodicTable };
