import React from 'react';
import {
    Grid, InputLabel, InputAdornment, Input
} from 'material-ui';

import {
    AddAlert, Sms, ConfirmationNumber, NoteAdd, Email, AddCircle, CheckCircle, Cancel, CheckBox
} from 'material-ui-icons';

import {
    RegularCard, Table, ItemGrid, Button, Snackbar, SnackbarContent, CustomInput
} from 'components';

class TableList extends React.Component{
    state = {
        open: false,
        place: 'tl',
        title: 'Create New Ticket',
        prompt: 'Specify the ticket id and assign it to a professor (if necessary). The ticket ID must begin with a T',
        okButton: 'Create',
        ticketID: '',
        ticketProf: '',
        ticketStatus: ''
    }
    showDialog(color, title, duration, location){
        this.setState({open: true, place: location, color: color, title: title});
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),duration);
    }
    
    showCreateDialog(){
        this.setState({open: true, place: 'tc', color: 'info', title:'Create New Ticket', 
            prompt: 'Specify the ticket id and assign it to a professor (if necessary)', okButton: 'Create Ticket'});
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),600000);
    }
    showModifyDialog(){
        this.setState({open: true, place: 'tc', color: 'warning', title:'Modify Existing Ticket', 
            prompt:'Specify the ticket id and make any changes such as status', okButton: 'Modify Ticket'});
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),600000);
    }
    addTicketInput(){
        this.dialogMessage = this.addTicketDialog;
        this.dialogIcon = this.props.displayNone;
        this.showDialog('info', 'Add Ticket', 100000000, 'tc');
    }
    modifyTicketInput(){
        this.dialogMessage = this.modifyTicketDialog;
        this.dialogIcon = this.props.displayNone;
        this.state.prompt = 'Specify the ticket id and change its status';
        this.showDialog('warning', 'Modify Ticket', 100000000, 'tc');
    }
    retrieveTicketID(event) {
        this.setState({ticketID: event.target.value});
    }

    retrieveTicketProf(event){
        this.setState({ticketProf: event.target.value});
    }
    retrieveTicketStatus(event){
        this.setState({ticketStatus: event.target.value});
    }

    dialogMessage = "";
    dialogIcon = CheckCircle;

    checkTicket(ticketID, id){
        return ticketID[0] == this;
    }

    ticketList = [
        [ "T001" , "N/A" , "Initial" ] ,
        [ "T002" , "Professor 1" , "Granted" ] ,
        [ "T003" , "Professor 2" , "Granted" ] ,
        [ "T004" , "Professor 3" , "Granted" ] ,
        [ "T005" , "N/A" , "Initial" ] ,
        [ "T006" , "Bodgan Simion" , "Granted" ]
    ];

    addTicketDialog=
        <RegularCard
            cardTitle={this.state.title}
            cardSubtitle={this.state.prompt}
            content={
                <div>
                    <label>Ticket ID*: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTicketID.bind(this)}/>
                    <label>Assign To: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTicketProf.bind(this)}/>
                    <label>Specify Status: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTicketStatus.bind(this)}/>
                    <Button color="warning" onClick={() => this.addTicket(this.state.ticketID, this.state.ticketProf, this.state.ticketStatus)}>{this.state.okButton}</Button>
                    <Button color="danger" onClick={() => this.setState({open:false})}>Cancel</Button>
                </div>
            }
        />
    ;

    modifyTicketDialog=
        <RegularCard
            cardTitle="Modify Existing Ticket"
            cardSubtitle="Specify the ticket you wish to modify and change its status"
            content={
                <div>
                    <label>Ticket ID*: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTicketID.bind(this)}/>
                    <label>Assign To: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTicketProf.bind(this)}/>
                    <label>Specify Status: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTicketStatus.bind(this)}/>
                    <Button color="warning" onClick={() => this.modifyTicket(this.state.ticketID, this.state.ticketProf, this.state.ticketStatus)}>Modify Ticket</Button>
                    <Button color="danger" onClick={() => this.setState({open:false})}>Cancel</Button>
                </div>
            }
        />
    ;

    addTicket(id, prof, status){
        var filteredID = id.trim();
        if (filteredID[0] != 'T'){
            this.setState({open:false});
            this.dialogIcon = Cancel;
            this.dialogMessage = "Invalid Ticket ID!";
            this.showDialog('danger', 'Invalid New Ticket', 2000, 'bl');
        }else{
            this.ticketList.push([filteredID, prof, status]);
            this.setState({open:false});
            this.dialogIcon = AddCircle;
            this.dialogMessage = "Successfully Added Ticket";
            this.showDialog('success', 'Create New Ticket', 2000, 'bl');
        }
    }

    modifyTicket(id, prof, status){
        var indexOfItem = this.ticketList.findIndex(this.checkTicket, id);
        if (indexOfItem == -1){
            this.dialogIcon = Cancel;
            this.dialogMessage = "Unable to Find Ticket to Edit";
            this.showDialog('danger', 'Modify Ticket Failed', 3000, 'bl');
        }else{
            this.ticketList[indexOfItem][1] = prof;
            this.ticketList[indexOfItem][2] = status;
            this.dialogIcon = CheckBox;
            this.dialogMessage = "Successfully Modifed Ticket!";
            this.showDialog('success', 'Modify Ticket Success', 2000, 'bl');
        }
    }
    render(){
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle="Tickets Issued"
                        cardSubtitle="Here is a list of tickets that have already been issued to professors"
                        content={
                            <div>
                                <Button color="info" onClick={() => this.addTicketInput()}>Create New Ticket</Button>
                                <Snackbar
                                    place={this.state.place}
                                    color={this.state.color}
                                    icon={this.dialogIcon}
                                    message={this.dialogMessage}
                                    open={this.state.open}
                                />
                                <Button color="info" onClick={() => this.modifyTicketInput()}>Modify Existing Ticket</Button>
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={['Ticket ID','Issued To', 'Status']}
                                    tableData={this.ticketList}
                                />
                            </div>
                        }
                    />
                </ItemGrid>
            {/* Add more ItemGrid objects here */}
            </Grid>
        );
    }
}

export default TableList;
