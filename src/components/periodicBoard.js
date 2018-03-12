import React from "react";
import {
  PeriodicElement,
  PeriodicElementEmpty,
  PeriodicElementHeader
} from "./periodicElement";

export const PeriodicBoard = ({
  periodicTable,
  boardState,
  onElementSelected
}) => {
  const onClick = (event, periodIdx, groupIdx) => {
    event.preventDefault();
    onElementSelected(periodIdx, groupIdx);
  };

  return (
    <div className="periodic-table">
      {periodicTable.map((period, periodIdx) => {
        return (
          <div className="periodic-table-period" key={periodIdx}>
            {period.map((element, groupIdx) => {
              if (typeof element === "string") {
                return (
                  <PeriodicElementHeader header={element} key={groupIdx} />
                );
              } else if (typeof element === "undefined") {
                return <PeriodicElementEmpty key={groupIdx} />;
              } else {
                return (
                  <PeriodicElement
                    {...element}
                    state={boardState[periodIdx][groupIdx]}
                    onClick={event => onClick(event, periodIdx, groupIdx)}
                    key={groupIdx}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
