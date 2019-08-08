import React from 'react';

import Content from '../MainPage/CommonContent';
import Button from "@material-ui/core/Button";



export default function Invoices() {


  return (
    <Content buttons={
      <>
        <Button variant="contained" color="secondary"> View </Button>
        <Button variant="contained" color="secondary"> Edit </Button>
        <Button variant="contained" color="secondary"> Delete </Button>
      </>}/>
  );
}