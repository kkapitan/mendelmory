import { allElements } from "./allElements";

const numberOfPeriods = 9;
const numberOfGroups = 18;

const periodicTable = [];

for (let index = 0; index <= numberOfPeriods; index++) {
  periodicTable[index] = new Array(numberOfGroups + 1);
  periodicTable[index].fill(undefined);
}

// Period headers
for (let index = 1; index <= 7; index++) {
  periodicTable[index][0] = `${index}`;
}

// Group headers
periodicTable[0][1] = "1";
periodicTable[0][18] = "18";
periodicTable[1][2] = "2";
for (let index = 13; index <= 17; index++) {
  periodicTable[1][index] = `${index}`;
}

for (let index = 3; index <= 12; index++) {
  periodicTable[3][index] = `${index}`;
}

const periodIdxForElement = element => {
  if (element.group === "Actinides") {
    return 9;
  }

  if (element.group === "Lanthanide") {
    return 8;
  }

  return element.period;
};

const groupdIdxForElement = element => {
  if (element.group === "Actinides" || element.group === "Lanthanide") {
    const periodIdx = periodIdxForElement(element);
    return periodicTable[periodIdx].filter(e => e).length + 5;
  }

  return element.group;
};

allElements.forEach(element => {
  const groupIdx = groupdIdxForElement(element);
  const periodIdx = periodIdxForElement(element);

  periodicTable[periodIdx][groupIdx] = element;
});

export { periodicTable };
