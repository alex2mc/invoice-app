import React from 'react';


import Content from './CommonContent';
import Button from "@material-ui/core/Button";



export default function MainPage() {

  return (
    <Content buttons={<Button variant="contained" color="secondary"> View </Button>}/>
  );
}