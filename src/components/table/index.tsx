import React, { FC } from "react";

export const Table: FC<{ text: string; tasks: Array<ToDo> }> = ({
  children,
  text,
}) => {
  return (
    <div>
      <span>{text}</span>
      <h1>{children}</h1>
    </div>
  );
};
