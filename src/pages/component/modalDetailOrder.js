import React, { useState } from 'react';
import { Button, Modal, Table  } from 'rsuite';
import Swal from 'sweetalert2'
import ModalEditKursi from './modalEditKursi';
const { Column, HeaderCell, Cell } = Table;

function ModalDetailOrder(props) {
    let url = 'http://localhost:8080/pd/v1';

    const [openEditKursi, setOpenEditKursi] = useState(false)
    const [idKursi, setIdKursi] = useState()

    // CELL FOR EDIT 
    const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
        const editing = rowData.status === 'EDIT';
        return (
            <Cell {...props} style={{ padding: '5px'}} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                className="rs-input"
                defaultValue={rowData[dataKey]}
                onChange={event => {
                    onChange && onChange(rowData.id, dataKey, event.target.value);
                }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
            </Cell>
        );
    };

    // CELL FOR EDIT KURSI
    const EditableCellNoKursi = ({ rowData, dataKey, onChange, ...props }) => {
        const editing = rowData.status === 'EDIT';
        return (
            <Cell {...props} style={{ padding: '5px'}} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <Button appearance='primary' color="blue" onClick={() => handleChangeKursi(rowData[dataKey])}>Pilih Kursi</Button>
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
            </Cell>
        );
    };

    // Action Cell
    const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
        return (
            <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                onClick(rowData.id);
                }}
            >
                {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
            </Button>
            </Cell>
        );
    };

    // TRIGER HANDLE CHANGE EDIT
    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], props.dataDetail);
        nextData.find(item => item.id === id)[key] = value;
        props.setDataDetail(nextData);
    };

    // EVENT HANDLE KLIK EDIT
    const handleEditState = id => {
        const nextData = Object.assign([], props.dataDetail);
        const activeItem = nextData.find(item => item.id === id);
        activeItem.status = activeItem.status ? null : 'EDIT';
        props.setDataDetail(nextData);
    };

    const handleChangeKursi = (e) => {
        // BUKA MODAL DAN MUNCULKAN DATA KURSI YANG AKTIF
        console.log(e)
        setOpenEditKursi(true)
        setIdKursi(e)
    }

    return (
        <>
            <Modal open={props.isOpen} onClose={props.isClose} backdrop={true} overflow={true} >
                <Modal.Header>
                    <Modal.Title>Detail Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table
                        virtualized
                        autoHeight={true}
                        showHeader={true}
                        data={props.dataDetail}
                        // onRowClick={(rowData, index) => {
                        //     console.log(index);
                        // }}
                        >
                        <Column align="center" fixed>
                            <HeaderCell>No</HeaderCell>
                            <Cell style={{ padding: '5px'}}>
                                {(rowData, index) => (
                                    ++index
                                )}
                            </Cell>
                        </Column>
                        <Column align="center" fixed>
                            <HeaderCell>NIK</HeaderCell>
                            <EditableCell dataKey="nik" onChange={handleChange} />
                        </Column>
                        <Column align="center" fixed>
                            <HeaderCell>Nama</HeaderCell>
                            <EditableCell dataKey="nama" onChange={handleChange} />
                        </Column>
                        <Column align="center" fixed>
                            <HeaderCell>Nomor Kursi</HeaderCell>
                            <EditableCellNoKursi dataKey="id_kursi" onChange={handleChange}/>
                        </Column>
                        <Column align="center" fixed>
                            <HeaderCell>Action</HeaderCell>
                            <ActionCell dataKey="id" onClick={handleEditState} />
                        </Column>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.isClose} appearance="subtle">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalEditKursi
                isOpen={openEditKursi}
                isClose={(e) => setOpenEditKursi(e)}
                isIdKursi={idKursi}
            >
            </ModalEditKursi>
        </>
    );
}

export default ModalDetailOrder;
