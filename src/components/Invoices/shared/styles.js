import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  spacing: 8,
});

export const styles = ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100,
  },
  wrapper: {
    padding: theme.spacing(2),
  },
});
