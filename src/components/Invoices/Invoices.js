import React from 'react';

import Content from '../MainPage/CommonContent';
import Button from "@material-ui/core/Button";

import { Link } from 'react-router-dom';


export default function Invoices() {


  return (
    <Content buttons={
      <>
        <Link to={`/editmode`}>
          <Button variant="contained" color="secondary"> Edit </Button>
        </Link>
        <Button variant="contained" color="secondary"> Delete </Button>
      </>}/>
  );
}