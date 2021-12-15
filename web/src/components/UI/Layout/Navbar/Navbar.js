import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <AppBar position="static">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
            variant="raised"
            size="large"
          >
            <MenuIcon />
              Mascotas
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                height: "100ch",
                width: "30ch",
              },
            }}
          >
            <MenuItem>
              <List>
                <ListItem>
                  <Button variant="text" component={Link} to={`/ListPets`}>
                    Listado
                  </Button>
                </ListItem>
                <ListItem>
                  <Button variant="text" component={Link} to={`/AddPet`}>
                    Nueva Mascota
                  </Button>
                </ListItem>
                <ListItem>
                  <Button variant="text" component={Link} to={`/KpiPets`}>
                    Indicadores
                  </Button>
                </ListItem>
              </List>
            </MenuItem>
          </Menu>
        </AppBar>
      </div>
    </>
  );
}
