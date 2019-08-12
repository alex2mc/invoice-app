import {withStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const ColorButtonGreen = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export default ColorButtonGreen;