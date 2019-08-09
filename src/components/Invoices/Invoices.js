import React from 'react';

import Content from '../MainPage/CommonContent';
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { orange, red, green } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';

import { Link } from 'react-router-dom';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
  },
  buttons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}));


export default function Invoices() {

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ColorButtonYellow = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    },
  }))(Button);

  const ColorButtonRed = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);

  const ColorButtonGreen = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);




  return (
    <Content buttons={
      <>
        <Link to={`/editmode`}>
          <ColorButtonYellow variant="contained" color="secondary"> Edit </ColorButtonYellow>
        </Link>
        <ColorButtonRed variant="contained" color="secondary" onClick={handleOpen}> Delete </ColorButtonRed>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            Are you sure you want to delete an invoice?

            <div className={classes.buttons}>
              <ColorButtonGreen variant="contained" color="secondary" onClick={handleOpen}>
                Yes
              </ColorButtonGreen>
              <ColorButtonRed variant="contained" color="secondary" onClick={handleOpen}>
                Cancel
              </ColorButtonRed>
            </div>
          </div>
        </Modal>
      </>}/>
  );
}