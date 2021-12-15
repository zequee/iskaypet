import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Navbar from "./UI/Layout/Navbar/Navbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/es";
import MenuItem from "@material-ui/core/MenuItem";
import { addPetOnFieldChange } from "../store/Actions/addPet";
import { addPetOnCancel } from "../store/Actions/addPet";
import { addPetOnSave } from "../store/Actions/addPet";
import FormControl from "@material-ui/core/FormControl";
import ApiError from "./ApiError";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const styles = (theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: 300,
    marginLeft: theme.spacing(10),
  },
  button: {
    marginRight: theme.spacing(100),
  },

  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 500,
    marginLeft: theme.spacing(45),
  },
  year: {
    marginLeft: theme.spacing(10),
    width: 2000,
  },
  sltGender: {
    marginLeft: theme.spacing(10),
    width: 300,
  },
  Typography: {
    fontStyle:'arial', 
    color:'grey',
    variant:"h6",
    fontSize: '1.5rem',
    marginLeft: theme.spacing(15),
  },
});

class AddPet extends Component {
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

    const genders = [
      {
        value: "Masculino",
        label: "Masculino",
      },
      {
        value: "Femenino",
        label: "Femenino",
      },
    ];
    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al agregar la Mascota"
        />
      );

    return (
      <>
        <Navbar />
        <Grid container justifycontent="center" className={classes.grid}>
          <Card className={classes.card}>
          <Typography className={classes.Typography} id="tableTitle">
                - Nueva Mascota -
              </Typography>
            <CardContent>
              <FormControl className={classes.formControl}>
                <TextField
                  id="name"
                  label="Nombre"
                  className={classes.textField}
                  value={this.props.name ? this.props.name : ''}
                  onChange={(e) => this.props.onChange("name", e.target.value.toUpperCase())}
                  margin="normal"
                  required={true}
                />
              </FormControl>
              <FormControl className={classes.sltGender}>
                <TextField
                  id="slt_species"
                  select
                  label="Especie"
                  value={this.props.species ? this.props.species : ''}
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
              </FormControl>

              <FormControl className={classes.sltGender}>
                <TextField
                  id="slt_gender"
                  select
                  label="Genero"
                  value={this.props.gender ? this.props.gender : ''}
                  required={true}
                  onChange={(e) =>
                    this.props.onChange("gender", e.target.value)
                  }
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Selecione..."
                  margin="normal"
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="age"
                  label="Edad"
                  className={classes.textField}
                  value={this.props.age ? this.props.age : ''}
                  onChange={(e) => this.props.onChange("age", e.target.value)}
                  margin="normal"
                  required={true}
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 99 } }}
                />
              </FormControl>
              <Grid xs={12} sm={6} item className={classes.year}>
                <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="dateBirth"
                    label="Fecha Nacimiento"
                    value={this.props.dateBirth ? this.props.dateBirth : null}
                    onChange={(date) => this.props.onChange("dateBirth", date)}
                    format={(new Date(), "dd/MM/yyyy")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    required={true}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "right" }}>
              <Button
                className={classes.button}
                size="small"
                variant="text"
                disabled={
                  this.props.name === "" ||
                  this.props.species === "" ||
                  this.props.gender === "" ||
                  this.props.dateBirth === null ||
                  this.props.age === ""
                }
                onClick={() => this.props.addPetOnSave()}
              >
                Guardar
              </Button>
              <Button
                className={classes.button}
                size="small"
                variant="text"
                onClick={() => this.props.addPetOnCancel()}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.addPet.name,
  species: state.addPet.species,
  gender: state.addPet.gender,
  dateBirth: state.addPet.dateBirth,
  age: state.addPet.age,
  error: state.addPet.error,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (field, value) => dispatch(addPetOnFieldChange(field, value)),

  addPetOnCancel: () => dispatch(addPetOnCancel()),

  addPetOnSave: () => dispatch(addPetOnSave()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddPet));
