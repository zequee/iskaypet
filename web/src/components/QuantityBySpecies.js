import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { requestQuantityBySpecies } from "../store/Actions/quantityBySpecies";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 10,
    marginTop: theme.spacing(3),
  },
  Typography: {
    marginLeft: theme.spacing(2),
  },
});

class QuantityBySpecies extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} item>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.Typography}
              id="tableTitle"
            >
              Total:
              {this.props.quantity ? this.props.quantity.sumTotSpeci : null}
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "gray" }}>Especie</TableCell>
                  <TableCell align="center" style={{ color: "gray" }}>
                    Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.quantity.quant
                  ? this.props.quantity.quant.sort().map((qa) => (
                      <TableRow key={qa._id}>
                        <TableCell>{qa.specie}</TableCell>
                        <TableCell align="center">{qa.quantity}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  quantity: state.quantityBySpecies.quantity,
});
const mapDispatchToProps = (dispatch) => ({
  requestQuantityBySpecies: (value) =>
    dispatch(requestQuantityBySpecies(value)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(QuantityBySpecies))
);
