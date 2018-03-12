import { PeriodicBoard } from "./periodicBoard";
import { PeriodicElementState } from "./periodicElement";
import React from "react";

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

const initialGameState = ({ allElements, periodicTable }) => {
  const elements = shuffle([...allElements]);

  return {
    elements,
    score: 0,
    boardState: initialBoardState(periodicTable),
    maxScore: allElements.length,
    finished: false
  };
};

export default class GameBoard extends React.Component {
  constructor({ allElements, periodicTable }) {
    super();

    this.state = initialGameState({ allElements, periodicTable });
  }

  onElementSelected(periodIdx, groupIdx) {
    const periodicTable = this.props.periodicTable;
    const boardState = this.state.boardState;
    const elements = this.state.elements;

    const element = periodicTable[periodIdx][groupIdx];

    const elementState =
      element.symbol === this.currentElement().symbol
        ? PeriodicElementState.CORRECT
        : PeriodicElementState.INCORRECT;

    const correct = elementState === PeriodicElementState.CORRECT;
    const score = this.state.score + (correct ? 1 : 0);
    const finished = elements.length === 1;

    boardState[periodIdx][groupIdx] = elementState;

    if (!finished) {
      elements.splice(elements.indexOf(element), 1);
    }

    this.setState({ score, finished, elements, boardState });
  }

  currentElement() {
    return this.state.elements[0];
  }

  skipOne(e) {
    e.preventDefault();

    const currentElement = this.currentElement();
    const elements = this.state.elements;
    const boardState = this.state.boardState;
    const periodicTable = this.props.periodicTable;
    const finished = elements.length === 1;

    if (!finished) {
      elements.splice(elements.indexOf(currentElement), 1);
    }

    const numberOfPeriods = periodicTable.length;
    const numberOfGroups = periodicTable[0].length;
    for (let periodIdx = 0; periodIdx < numberOfPeriods; periodIdx++) {
      for (let groupIdx = 0; groupIdx < numberOfGroups; groupIdx++) {
        const element = periodicTable[periodIdx][groupIdx];
        if (element && element.symbol === currentElement.symbol) {
          boardState[periodIdx][groupIdx] = PeriodicElementState.INCORRECT;
        }
      }
    }

    this.setState({ finished, elements, boardState });
  }

  nextOne(e) {
    e.preventDefault();
    const elements = shuffle(this.state.elements);
    this.setState({ elements });
  }

  restart(e) {
    e.preventDefault();
    const initialState = initialGameState(this.props);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="game-container">
        <div className="game-periodic-container">
          <PeriodicBoard
            periodicTable={this.props.periodicTable}
            boardState={this.state.boardState}
            currentElement={this.currentElement()}
            onElementSelected={this.onElementSelected.bind(this)}
          />
          <div className="game-hud-container">
            <div className="game-score-container">
              <p className="game-score">
                {"Punkty: " + this.state.score + "/" + this.state.maxScore}
              </p>
            </div>
            <div className="game-current-element">
              <p className="game-current-element-symbol">
                {this.currentElement().symbol}
              </p>
              <p className="game-current-element-name">
                {this.currentElement().name}
              </p>
            </div>
            <div className="game-action-button" onClick={e => this.nextOne(e)}>
              <p>Losuj następne</p>
            </div>
            <div className="game-action-button" onClick={e => this.skipOne(e)}>
              <p>Pomiń obecne</p>
            </div>
            <div className="game-action-button" onClick={e => this.restart(e)}>
              <p>Zacznij od nowa</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
