import React from "react";
import "./App.css";
import { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Notifier from "./components/Notifier";
import Navbar from "./components/UI/Layout/Navbar/Navbar";
import AddPet from "./components/AddPet";
import ListPets from "./components/ListPets";
import KpiPets from "./components/KpiPets";

class App extends Component {
  render() {
    let content = null;
    content = (
      <React.Fragment>
        <CssBaseline />
        <Notifier />
        <div>
          <Router>
            <Switch>
              <Route path="/" exact component={Navbar} />
              <Route path="/AddPet" exact component={AddPet} />
              <Route path="/ListPets" exact component={ListPets}/>
              <Route path="/KpiPets" exact component={KpiPets}/>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
    return content;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
