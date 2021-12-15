import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";

const styles = (theme) => ({
  icon: {
    fontSize: 350,
  },
  container: { marginTop: theme.spacing.unit * 4 },
});

const apiError = ({ error, classes }) => {
  return (
    <Fragment>
      <Grid container justify="center" className={classes.container}>
        <ErrorIcon
          fontSize="inherit"
          color="disabled"
          className={classes.icon}
        />
      </Grid>
      <Grid container justify="center" className={classes.container}>
        <Typography variant="headline">{error}</Typography>
      </Grid>
      <Grid container justify="center" className={classes.container}>
        <Button
          style={{ justifyContent: "center" }}
          variant="contained"
          className={classes.button}
          onClick={() => {
            window.location.reload();
          }}
        >
          VOLVER
        </Button>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(apiError);
