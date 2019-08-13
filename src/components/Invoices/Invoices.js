import React from 'react';

import Content from '../MainPage/CommonContent';
import ColorButtonGreen from "../UI/Buttons/ColorButtonGreen";
import ColorButtonRed from "../UI/Buttons/ColorButtonRed";
import ColorButtonYellow from "../UI/Buttons/ColorButtonYellow";
import { makeStyles } from '@material-ui/core/styles';
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