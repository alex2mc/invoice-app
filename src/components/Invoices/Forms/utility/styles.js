import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  spacing: 8,
});

export const styles = ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 145,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});