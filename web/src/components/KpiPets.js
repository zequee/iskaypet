import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Navbar from "./UI/Layout/Navbar/Navbar";
import QuantityBySpecies from "./QuantityBySpecies";
import AverageDeviation from "./AverageDeviation";
import { requestQuantityBySpecies } from "../store/Actions/quantityBySpecies";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 800,
    marginLeft: theme.spacing(30),
    height:500,
  },
  Typography: {
    fontStyle: "arial",
    color: "grey",
    variant: "h6",
    fontSize: "1.5rem",
    marginLeft: theme.spacing(35),
  },
});

class KpiPets extends Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.requestQuantityBySpecies();
  }


  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Navbar />
        <Grid container justifycontent="center" style={{height:500}} className={classes.grid}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.Typography} id="tableTitle">
                - Indicadores -
              </Typography>
              <Paper className={classes.root}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  href="/drafts"
                >
                  <Tab label="Cantidad Especies" />
                  <Tab label="Promedio - Desv. estándar" />
                </Tabs>

                {this.state.value === 0 && <QuantityBySpecies />}
                {this.state.value === 1 && <AverageDeviation />}
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  
});
const mapDispatchToProps = (dispatch) => ({

    requestQuantityBySpecies: (value) => dispatch(requestQuantityBySpecies(value)),

});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KpiPets))
);
