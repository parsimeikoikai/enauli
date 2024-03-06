
import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Label, ModalBody, Table } from 'reactstrap';
import { MdAdd, MdCancel, MdEdit,MdSave } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            show: false,

        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleShow() {
        this.setState({ show: true });
    }
    handleClose() {
        this.setState({ show: false });
    }
    deactivateSacco = () => {
        swal({
            title: "Alert",
            text: "You want resend this deactivate this sacco?",
            icon: "warning",
            dangerMode: true,
            buttons: ["No", "Yes"],
            closeOnClickOutside: false,
        })
            .then(willDelete => {
                alert("Call deactivate sacco endpoint..")
            });

    }
    render() {
        return (
            <div className="container-fluid sacco-page">
                <Card>
                    <CardHeader>
                        <div className="row">
                            <div className="col-md-6"><b>Manage Saccos</b></div>
                            <div className="col-md-6">
                                <button onClick={this.handleShow} className="btn btn-success">
                                    <MdAdd />Add Sacco</button>
                            </div>

                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="row">
                            <Table className="text-left table table-bordered table-stripped">
                                <thead>
                                    <tr className="table table-stripped">
                                        <th >Name</th>
                                        <th >Location</th>
                                        <th >Credit Limit</th>
                                        <th >Status</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td><button onClick={this.handleShow} className="btn btn-outline-primary">
                                            <MdEdit />Edit</button>
                                            <button onClick={() => this.deactivateSacco()} className="btn btn-outline-warning">
                                                <MdCancel />Deactivate</button>

                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
                <Modal
                    size="lg"
                    aria-labelledby="example-modal-sizes-title-lg"
                    show={this.state.show}
                    dialogClassName='modal-lg modal-90w'
                    onHide={this.handleClose}>
                    <Modal.Header closeButton className="alert alert-info">
                        <Modal.Title
                            id="example-modal-sizes-title-lg text-dark">Add New Sacco</Modal.Title>
                    </Modal.Header>
                    <ModalBody>

                        <Form onSubmit={this.createSacco}>
                            <div className="row">

                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            required

                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Location</Label>
                                        <Input
                                            type="text"
                                            name="Location"
                                            required

                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label>Credit Limit</Label>
                                        <Input
                                            type="text"
                                            name="credit_limit"
                                            required

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Status</Label>
                                        <Input
                                            type="text"
                                            name="Status"
                                            required

                                        />
                                    </FormGroup>

                                </div>
                                <div className='col-md-6'>
                                <button onClick={this.handleShow} className="btn btn-outline-success">
                                                <MdSave />Save</button>
                                </div>
                            </div>

                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}