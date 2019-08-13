import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import { withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ColorButtonRed from "../UI/Buttons/ColorButtonRed";
import Modal from "@material-ui/core/Modal";
import ColorButtonGreen from "../UI/Buttons/ColorButtonGreen";



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteInvoice} from '../../store/actions/invoices';

import StyledTableCell from "../UI/Table/StyledTableCell";
import StyledTableRow from "../UI/Table/StyledTableRow";
import ColorButtonYellow from "../UI/Buttons/ColorButtonYellow";



const styles = theme => ({
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
  },
  modal: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(16, 12, 26, 0.78)',
    top: 0,
    left: 0,
    display: 'flex',
    zIndex: 999,
    transition: '0.3s',
    justifyContent: 'center',
    alignItems: 'center',
  }
});




class Invoice extends Component {
  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleDelete = id => {
    this.props.deleteInvoice(id)
    this.setState({isOpen: false})
  }

  render() {
    const {id, discount, total, customers, classes} = this.props

    // console.log(this.props)
    return (

      <StyledTableRow>
        <StyledTableCell component="th" scope="row">{id}</StyledTableCell>
        <StyledTableCell>

          {customers &&
          (customers.find(customer => customer.id === this.props.customer ) || { name: 'Unnamed' }).name
          }

        </StyledTableCell>
        <StyledTableCell>{discount}</StyledTableCell>
        <StyledTableCell>{total}</StyledTableCell>
        <StyledTableCell>

          <Link to={`/viewmode/${id}`}>
            <Button variant="contained" color="primary"> View </Button>
          </Link>


          {
            this.props.location.pathname === "/invoices"
              ?
              <>
                <Link to={`/editmode`}>
                  <ColorButtonYellow variant="contained" color="secondary"> Edit </ColorButtonYellow>
                </Link>

                <ColorButtonRed variant="contained" color="secondary" onClick={this.handleOpen}> Delete </ColorButtonRed>
              </>
              : null
          }

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.isOpen}
            onClose={this.handleClose}
            className={classes.modal}
          >
            <div className={classes.paper}>
              Are you sure you want to delete an invoice?

              <div className={classes.buttons}>
                <ColorButtonGreen variant="contained" color="secondary" onClick={() => this.handleDelete(id)}>
                  Yes
                </ColorButtonGreen>
                <ColorButtonRed variant="contained" color="secondary" onClick={this.handleClose}>
                  Cancel
                </ColorButtonRed>
              </div>
            </div>
          </Modal>

        </StyledTableCell>

      </StyledTableRow>

    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    deleteInvoice
  }, dispatch);

export default (withStyles(styles)(connect(null,mapDispatchToProps)(withRouter(Invoice))))