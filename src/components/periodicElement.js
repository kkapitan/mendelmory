import React from "react";

export const PeriodicElementState = {
  HIDDEN: "HIDDEN",
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT"
};

const classNameForState = state => {
  switch (state) {
    case PeriodicElementState.CORRECT:
      return "periodic-element-correct";
    case PeriodicElementState.INCORRECT:
      return "periodic-element-incorrect";
    default:
      return "";
  }
};

const visibilityForState = state => {
  switch (state) {
    case PeriodicElementState.CORRECT:
      return true;
    case PeriodicElementState.INCORRECT:
      return true;
    default:
      return false;
  }
};

export const PeriodicElement = ({ symbol, name, state, onClick }) => {
  const containerClass =
    "periodic-element periodic-element-filled " + classNameForState(state);

  const showContents = visibilityForState(state);
  return (
    <div className={containerClass} onClick={e => onClick(e)}>
      {showContents && (
        <div>
          <p className="periodic-element-symbol">{symbol}</p>
          <p className="periodic-element-name">{name}</p>
        </div>
      )}
    </div>
  );
};

export const PeriodicElementEmpty = ({}) => {
  return <div className="periodic-element periodic-element-empty" />;
};
