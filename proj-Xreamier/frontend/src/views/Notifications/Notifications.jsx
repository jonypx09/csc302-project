import React from 'react';
import {
    Grid
} from 'material-ui';
import {
    AddAlert, Sms, ConfirmationNumber
} from 'material-ui-icons';

import {
    RegularCard, A, P, Small, Button, SnackbarContent, Snackbar, ItemGrid, HeaderLinks
} from 'components';


class Notifications extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tl: false,
            tc: false,
            tr: false,
            bl: false,
            bc: false,
            br: false
        };
    }
    showNotification(place){
        var x = [];
        x[place] = true;
        this.setState(x);
        setTimeout(function(){
            x[place] = false;
            this.setState(x);
        }.bind(this),6000);
    }

    ticketNotifications = [
        <a href="/tickets">
        <SnackbarContent
            message={"Ticket Request from Professor X"}
            color="warning"
            icon={ConfirmationNumber}
            close
        /></a>,
        <a href="/tickets">
        <SnackbarContent
            message={"Ticket Request from Professor Y"}
            color="warning"
            icon={ConfirmationNumber}
            close
        /></a>,
        <a href="/tickets">
        <SnackbarContent
            message={"Ticket Request from Professor Z"}
            color="warning"
            icon={ConfirmationNumber}
            close
        /></a>
    ];

    offerNotifications = [
        <SnackbarContent
            message={"Offer Response from Student X"}
            color="info"
            icon={Sms}
            close
        />
    ];

    notificationContent = 
        <div>
            <Button color="danger" onClick={() => this.clearAllNotifications()}>Clear All Notifications</Button>
            <Grid container>
                <ItemGrid xs={12} sm={12} md={6}>
                    <h5>Ticket Requests</h5>
                    {this.ticketNotifications}
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
                    <h5>Offer Responses</h5>
                    {this.offerNotifications}
                </ItemGrid>
            </Grid>
            <br />
            <br />
        </div>
    ;

    clearAllNotifications() {
        this.ticketNotifications = [];
        this.offerNotifications = [];
    }

    render(){
        return (
            <RegularCard
                cardTitle="Notifications"
                content={this.notificationContent}
            />
        );
    }
}

export default Notifications;
