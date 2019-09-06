import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import StyledTableCell from "../../UI/Table/StyledTableCell";
import StyledTableRow from "../../UI/Table/StyledTableRow";
import ColorButtonYellow from "../../UI/Buttons/ColorButtonYellow";
import ColorButtonRed from "../../UI/Buttons/ColorButtonRed";
import ColorButtonGreen from "../../UI/Buttons/ColorButtonGreen";
import Spinner from "../../UI/Spinner/Spinner";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInvoices, deleteInvoice } from '../../../store/invoices/actions';

import { styles } from './styles';





const InvoiceListItem  = ({inv_id, discount, total, customers, deleteInvoice, ...props}) => {
  const [isOpen, setToggleOpen] = useState(false)

  const handleToggleOpen = () => {
    setToggleOpen(!isOpen)
  };


  const handleDelete = async (id) => {
    deleteInvoice(id);
    handleToggleOpen();
  };

    if(!customers) {
      return <Spinner />
    }

    return (

      <StyledTableRow>
        <StyledTableCell component="th" scope="row">{inv_id}</StyledTableCell>
        <StyledTableCell>
          { customers[props.customer_id] ? customers[props.customer_id].name : 'name'}
        </StyledTableCell>
        <StyledTableCell>{discount ? discount : 0}</StyledTableCell>
        <StyledTableCell>{total.toFixed(2)}</StyledTableCell>
        <StyledTableCell style={styles.buttons}>

          <Link to={`/viewinvoice/${inv_id}`}>
            <Button variant="contained" color="secondary"> View </Button>
          </Link>

          {
            props.location.pathname === "/invoices"
              ?
              <>
                <Link to={`/editinvoice/${inv_id}`}>
                  <ColorButtonYellow variant="contained" color="secondary"> Edit </ColorButtonYellow>
                </Link>

                <ColorButtonRed variant="contained" color="secondary" onClick={handleToggleOpen}> Delete </ColorButtonRed>
              </>
              : null
          }

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={handleToggleOpen}
            style={styles.modal}
          >
            <div style={styles.paper}>
              Are you sure you want to delete an invoice?

              <div style={styles.modalButtons}>
                <ColorButtonGreen variant="contained" color="secondary" onClick={() => handleDelete(inv_id)}>
                  Yes
                </ColorButtonGreen>
                <ColorButtonRed variant="contained" color="secondary" onClick={handleToggleOpen}>
                  Cancel
                </ColorButtonRed>
              </div>
            </div>
          </Modal>

        </StyledTableCell>

      </StyledTableRow>

    );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    deleteInvoice,
    getInvoices
  }, dispatch);

export default connect(null,mapDispatchToProps)(withRouter(InvoiceListItem))