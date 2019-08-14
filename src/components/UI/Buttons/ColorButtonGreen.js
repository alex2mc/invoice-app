import {withStyles} from "@material-ui/core";
import {teal} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const ColorButtonGreen = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[600]),
    backgroundColor: teal[400],
    '&:hover': {
      backgroundColor: teal[600],
    },
  },
}))(Button);

export default ColorButtonGreen;