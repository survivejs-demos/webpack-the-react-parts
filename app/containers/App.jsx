import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Loadable from "react-loadable";
import Lanes from "../components/Lanes.jsx";
import { createLane } from "../actions/lanes";

const App = ({ lanes, createLane }) => (
  <div>
    <LoadableAddLane createLane={createLane} />
    <Lanes lanes={lanes} />
  </div>
);

const LoadableAddLane = Loadable({
  loader: () => import("../components/AddLane"),
  loading: () => <div>Loading...</div>
});

export default compose(
  connect(
    state => ({
      lanes: state.lanes
    }),
    {
      createLane
    }
  ),
  DragDropContext(HTML5Backend)
)(App);
