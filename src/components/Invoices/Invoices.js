import React from 'react';

import Content from '../MainPage/CommonContent';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';

import { Link } from 'react-router-dom';


export default function Invoices() {

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

  return (
    <Content buttons={
      <>
        <Link to={`/editmode`}>
          <ColorButtonYellow variant="contained" color="secondary"> Edit </ColorButtonYellow>
        </Link>
        <ColorButtonRed variant="contained" color="secondary"> Delete </ColorButtonRed>
      </>}/>
  );
}