import PeriodicBoard from "./periodicBoard";
import React from "react";

export default class GameBoard extends React.Component {
  constructor({ allElements, periodicTable }) {
    super();

    const elements = allElements;

    this.state = {
      elements,
      currentElementIdx: 0
    };
  }

  onElementSelected(state) {
    const currentElementIdx = this.state.currentElementIdx + 1;
    this.setState({ currentElementIdx });
  }

  currentElement() {
    return this.state.elements[this.state.currentElementIdx];
  }

  render() {
    return (
      <div className="game-container">
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
    );
  }
}
