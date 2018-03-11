import PeriodicBoard from "./periodicBoard";
import React from "react";

export default class GameBoard extends React.Component {
  constructor({ allElements, periodicTable }) {
    super();

    const elements = allElements;

    this.state = {
      elements,
      score: 0,
      maxScore: allElements.length,
      finished: false
    };
  }

  onElementSelected(element, correct) {
    const elements = this.state.elements;
    const score = this.state.score + (correct ? 1 : 0);

    const finished = elements.length === 1;

    if (!finished) {
      elements.splice(elements.indexOf(element), 1);
    }

    this.setState({ score, finished, elements });
  }

  currentElement() {
    return this.state.elements[0];
  }

  render() {
    return (
      <div className="game-container">
        <div className="game-periodic-container">
          <PeriodicBoard
            periodicTable={this.props.periodicTable}
            currentElement={this.currentElement()}
            onElementSelected={this.onElementSelected.bind(this)}
          />
          <div className="game-current-element-container">
            <div className="game-current-element">
              <p className="game-current-element-symbol">
                {this.currentElement().symbol}
              </p>
              <p className="game-current-element-name">
                {this.currentElement().name}
              </p>
            </div>
          </div>
        </div>
        <div className="game-score-container">
          <p className="game-score">
            {this.state.finished
              ? "Koniec gry. Odśwież aby rozpocząć ponownie."
              : "Punkty: " + this.state.score + "/" + this.state.maxScore}
          </p>
        </div>
      </div>
    );
  }
}
