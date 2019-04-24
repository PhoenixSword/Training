import React from "react";
import { render } from "react-dom";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Main from "./Main";

@DragDropContext(HTML5Backend)
class App extends React.Component {
  render() {
    return <Main />;
  }
}

render(<App />, document.getElementById("root"));
