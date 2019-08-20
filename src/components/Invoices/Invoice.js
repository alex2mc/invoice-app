import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import { withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import StyledTableCell from "../UI/Table/StyledTableCell";
import StyledTableRow from "../UI/Table/StyledTableRow";
import ColorButtonYellow from "../UI/Buttons/ColorButtonYellow";

import ColorButtonRed from "../UI/Buttons/ColorButtonRed";
import Modal from "@material-ui/core/Modal";
import ColorButtonGreen from "../UI/Buttons/ColorButtonGreen";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  getInvoices } from '../../store/invoices/actions';



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
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  modalButtons: {
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
  },

});




class Invoice extends Component {
  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState({isOpen: true})
  };

  handleClose = () => {
    this.setState({isOpen: false})
  };

  handleDelete = async (id) => {
    // this.props.deleteInvoice(id);
    this.setState({isOpen: false});
    await this.props.fetchInvoices();
    this.props.history.push("/invoices")
  };

  render() {
    const {id, discount, total, customers, classes} = this.props;

    // console.log(this.props)
    return (

      <StyledTableRow>
        <StyledTableCell component="th" scope="row">{id}</StyledTableCell>
        <StyledTableCell>

          {customers &&
          (customers.find(customer => customer._id === this.props.customer_id ) || { name: 'Unnamed' }).name
          }

        </StyledTableCell>
        <StyledTableCell>{discount ? discount : 0}</StyledTableCell>
        <StyledTableCell>{total}</StyledTableCell>
        <StyledTableCell className={classes.buttons}>

          <Link to={`/viewmode/${id}`}>
            <Button variant="contained" color="secondary"> View </Button>
          </Link>


          {
            this.props.location.pathname === "/invoices"
              ?
              <>
                <Link to={`/editmode/${id}`}>
                  <ColorButtonYellow variant="contained" color="secondary"> Edit </ColorButtonYellow>
                </Link>

                {/*<ColorButtonRed variant="contained" color="secondary" onClick={this.handleOpen}> Delete </ColorButtonRed>*/}
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

              <div className={classes.modalButtons}>
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
    // deleteInvoice,
  getInvoices
  }, dispatch);

export default (withStyles(styles)(connect(null,mapDispatchToProps)(withRouter(Invoice))))