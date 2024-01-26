import React from "react";
import { CompletedDistribution } from "./Report";

export class PrintableDistribution extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <CompletedDistribution />;
  }
}

export default PrintableDistribution;
