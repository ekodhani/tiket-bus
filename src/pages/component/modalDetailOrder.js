import React, { useState } from 'react';
import { Button, Modal, RadioTileGroup, RadioTile, Grid, Row, Col, Badge,  } from 'rsuite';
import Swal from 'sweetalert2'

function ModalDetailOrder(props) {
    let url = 'http://localhost:8080/pd/v1';

    return (
        <>
            <Modal open={props.isOpen} onClose={props.isClose} backdrop={true} overflow={true} >
                <Modal.Header>
                    <Modal.Title>Detail Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.isClose} appearance="subtle">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDetailOrder;
