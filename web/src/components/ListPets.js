import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import { requestListPets } from "../store/Actions/listPets";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import ApiError from "./ApiError";
import Navbar from "./UI/Layout/Navbar/Navbar";

const styles = (theme) => ({
  root: {
    width: 1000,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(15),
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 300,
    height: 200,
  },
  table: {
    minWidth: 700,
  },
  typography: {
    color: "#FFFFFF",
    backgroundColor: "#4dabf5",
  },
});

class ListPets extends Component {
  state = {
    page: 0,
    rowsPerPage: 6,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
    this.props.requestListPets();
  }

  render() {
    const { classes } = this.props;

    const { page, rowsPerPage } = this.state;

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, this.props.pets.length - page * rowsPerPage);

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al listar las Mascotas"
        />
      );

    return (
      <>
        <Navbar />
        <Paper justify="center" className={classes.root}>
          <Grid container spacing={2}>
            {this.props.pets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pet) => (
                <Grid xs={12} sm={4} key={pet._id} item>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          className={classes.typography}
                          variant="h5"
                          gutterBottom
                        >
                          Nombre: {pet.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                        >
                          Especie: {pet.species}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                        >
                          Genero: {pet.gender}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                        >
                          Edad: {pet.age}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                        >
                          F.Nacimiento:{" "}
                          {new Date(pet.dateBirth).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            {emptyRows > 0 && (
              <CardActionArea style={{ height: 48 * emptyRows }}>
                <CardContent colSpan={6} />
              </CardActionArea>
            )}
          </Grid>
          <Table className={classes.table}>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={this.props.pets.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[6, { label: "10", value: 10 }]}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelRowsPerPage="Filas"
                  labelDisplayedRows={(label) =>
                    `${label.from}-${label.to} de ${label.count}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  pets: state.listPets.pets,
  error: state.listPets.error,
});

const mapDispatchToProps = (dispatch) => ({
  requestListPets: (value) => dispatch(requestListPets(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListPets));
