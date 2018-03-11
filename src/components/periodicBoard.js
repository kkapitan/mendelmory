import React from "react";
import {
  PeriodicElement,
  PeriodicElementEmpty,
  PeriodicElementState
} from "./periodicElement";

const initialBoardState = periodicTable => {
  const boardState = [];
  const numberOfPeriods = periodicTable.length;
  const numberOfGroups = periodicTable[0].length;

  for (let periodIdx = 0; periodIdx < numberOfPeriods; periodIdx++) {
    boardState[periodIdx] = new Array(numberOfGroups);
    boardState[periodIdx].fill(PeriodicElementState.HIDDEN);
  }

  return boardState;
};

export default class PeriodicBoard extends React.Component {
  constructor({ periodicTable, currentElement, onElementSelected }) {
    super();

    this.state = {
      boardState: initialBoardState(periodicTable)
    };
  }

  onClick(event, periodIdx, groupIdx) {
    event.preventDefault();

    const periodicTable = this.props.periodicTable;
    const boardState = this.state.boardState;

    const element = periodicTable[periodIdx][groupIdx];
    const elementState =
      element.symbol === this.props.currentElement.symbol
        ? PeriodicElementState.CORRECT
        : PeriodicElementState.INCORRECT;

    boardState[periodIdx][groupIdx] = elementState;
    this.props.onElementSelected(
      element,
      elementState === PeriodicElementState.CORRECT
    );

    this.setState({ boardState });
  }

  render() {
    return (
      <div className="periodic-table">
        {this.props.periodicTable.map((period, periodIdx) => {
          return (
            <div className="periodic-table-period" key={periodIdx}>
              {period.map((element, groupIdx) => {
                if (element) {
                  return (
                    <PeriodicElement
                      {...element}
                      state={this.state.boardState[periodIdx][groupIdx]}
                      onClick={event =>
                        this.onClick(event, periodIdx, groupIdx)
                      }
                      key={groupIdx}
                    />
                  );
                } else {
                  return <PeriodicElementEmpty key={groupIdx} />;
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
