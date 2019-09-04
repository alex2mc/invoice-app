import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  spacing: 8,
});

export const styles = ({
  root: {
    width: '95%',
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  modalButtons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  modal: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(16, 12, 26, 0.78)',
    top: 0,
    left: 0,
    display: 'flex',
    zIndex: 999,
    transition: '0.3s',
    justifyContent: 'center',
    alignItems: 'center',
  },
});