import React from "react";

import { css } from "@emotion/core";
import { DotLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loading() {
  return (
    <div className="sweet-loading">
      <DotLoader
        css={override}
        size={150}
        //size={"150px"} this also works
        color={"red"}
      />
    </div>
  );
}

export default Loading;
