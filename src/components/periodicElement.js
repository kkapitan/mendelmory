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
  const baseContainerClass = "periodic-element periodic-element-filled ";
  const containerClass = baseContainerClass + classNameForState(state);

  const visible = visibilityForState(state);
  const visibilityClass = visible
    ? "periodic-element-visible"
    : "periodic-element-hidden";

  return (
    <div className={containerClass} onClick={e => !visible && onClick(e)}>
      <div className={visibilityClass}>
        <p className="periodic-element-symbol">{symbol}</p>
        <p className="periodic-element-name">{name}</p>
      </div>
    </div>
  );
};

export const PeriodicElementEmpty = ({}) => {
  return <div className="periodic-element periodic-element-empty" />;
};
