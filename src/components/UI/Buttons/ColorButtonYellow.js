import {withStyles} from "@material-ui/core";
import {orange, red} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const ColorButtonYellow = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);

export default ColorButtonYellow;