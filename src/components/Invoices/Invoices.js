import React from 'react';

import Content from '../MainPage/CommonContent';
import ColorButtonYellow from "../UI/Buttons/ColorButtonYellow";
// import { makeStyles } from '@material-ui/core/styles';


import { Link } from 'react-router-dom';


// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();
//
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles(theme => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: '5px',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 4),
//   },
//   buttons: {
//     marginTop: theme.spacing(2),
//     display: 'flex',
//     justifyContent: 'center'
//   }
// }));


export default function Invoices() {

  // const classes = useStyles();
  //
  // const [modalStyle] = React.useState(getModalStyle);
  // const [open, setOpen] = React.useState(false);
  //
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  //
  // const handleClose = () => {
  //   setOpen(false);
  // };



  return (
    <Content buttons={
      <>
        <Link to={`/editmode`}>
          <ColorButtonYellow variant="contained" color="secondary"> Edit </ColorButtonYellow>
        </Link>


      </>
    }
    />
  );
}