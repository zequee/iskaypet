import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@material-ui/core/CardActions";
import { AverageDesvPetOnFieldChange } from "../store/Actions/averageDeviation";
import { calcAv } from "../store/Actions/averageDeviation";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 700,
    marginLeft: theme.spacing(3),
    height: 300,
  },
  Typography: {
    fontStyle: "arial",
    color: "grey",
    variant: "h6",
    fontSize: "1.5rem",
    marginLeft: theme.spacing(35),
  },
  sltSpecies: {
    marginLeft: theme.spacing(10),
    width: 200,
  },
  button: {
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(20),
  },
});

class AverageDeviation extends Component {
  render() {
    const { classes } = this.props;

    const species = [
      {
        value: "Mamifero",
        label: "Mamifero",
      },
      {
        value: "Ave",
        label: "Ave",
      },
      {
        value: "Pez",
        label: "Pez",
      },
      {
        value: "Insecto",
        label: "Insecto",
      },
    ];

    return (
      <>
        <Grid container justifycontent="center" className={classes.grid}>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <FormControl className={classes.sltSpecies}>
                  <TextField
                    id="slt_species"
                    select
                    label="Especie"
                    value={this.props.species ? this.props.species : ""}
                    required={true}
                    onChange={(e) =>
                      this.props.onChange("species", e.target.value)
                    }
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Selecione..."
                    margin="normal"
                  >
                    {species.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      className={classes.button}
                      size="small"
                      variant="contained"
                      disabled={this.props.species === ""}
                      onClick={() => this.props.calcAv(this.props.species)}
                    >
                      Calcular
                    </Button>
                  </CardActions>
                </FormControl>
                <FormControl className={classes.sltSpecies}>
                  Cantidad:
                  <TextField
                    id="average"
                    // label="Cantidad"
                    className={classes.textField}
                    value={this.props.calc ? this.props.calc.totalSpecie : ""}
                    margin="normal"
                    disabled={true}
                  />
                  Promedio Edad:
                  <TextField
                    id="average"
                    // label="Promedio"
                    className={classes.textField}
                    value={this.props.calc ? this.props.calc.average : ""}
                    margin="normal"
                    disabled={true}
                  />
                  Desviacion Estandar:
                  <TextField
                    id="average"
                    // label="Desviacion Estandar"
                    className={classes.textField}
                    value={this.props.calc ? this.props.calc.stdDeviation : ""}
                    margin="normal"
                    disabled={true}
                  />
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  species: state.averageDeviation.species,
  calc: state.averageDeviation.calc,
});
const mapDispatchToProps = (dispatch) => ({
  onChange: (field, value) =>
    dispatch(AverageDesvPetOnFieldChange(field, value)),

  calcAv: (value) => dispatch(calcAv(value)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(AverageDeviation))
);
