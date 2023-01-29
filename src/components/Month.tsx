import Day from "./Day";
import React from "react";

type Props = {
  month: Date[][];
}

export default function Month({ month }: Props) {
  return (
    <div className={`flex-1 grid grid-cols-7 border-t border-l border-gray-200`}>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
} 
