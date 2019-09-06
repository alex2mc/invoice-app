import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  spacing: 8,
});

export const styles = ({
  wrapper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  numberFormControl: {
    maxWidth: 65,
  },
  main: {
    display: 'flex'
  },
  items: {
    width: '75%',
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    overflowX: 'auto',
  },
  discount: {
    width: '25%',
    maxHeight: '150px',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflowX: 'auto',
  },
  product: {
    width: '60%'
  },
  quantity: {
    width: '15%',
  },
  price: {
    width: '15%',
    textAlign: 'center'
  },
  totalHeader: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  total: {
    textAlign: 'center'
  },
  buttonWrapper: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

});