import React from 'react';
import {
    withStyles, Grid, Tooltip
} from 'material-ui';
import {
    ContentCopy, AttachMoney, InfoOutline, Warning, DateRange, LocalOffer, Update, ArrowUpward, AccessTime, LocalActivity
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';

import {
    StatsCard, ChartCard, TasksCard, RegularCard, Table, SnackbarContent, Snackbar, ItemGrid, Button
} from 'components';

import {
    dailySalesChart ,
    emailsSubscriptionChart,
} from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tc: false
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

    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render(){
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={AttachMoney}
                            iconColor="green"
                            title="Current Budget"
                            description="$500,000"
                            statIcon={DateRange}
                            statText="Last 5 Hours"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3} href="/tickets">
                        <Tooltip
                            id="tooltip-top"
                            title="View all tickets"
                            placement="down"
                            classes={{tooltip:this.props.tooltip}}>
                            <a href="/tickets">
                                <StatsCard
                                    icon={LocalActivity}
                                    iconColor="blue"
                                    title="Total Ticket Count"
                                    description="6"
                                    statIcon={Update}
                                    statLink={{text: "Just Updated"}}
                                />
                            </a>
                        </Tooltip>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <Tooltip
                            id="tooltip-top"
                            title="View all tickets"
                            placement="down"
                            classes={{tooltip:this.props.tooltip}}>
                            <a href="/tickets">
                                <StatsCard
                                    icon={InfoOutline}
                                    iconColor="orange"
                                    title="Tickets Issued"
                                    description="4"
                                    statIcon={Update}
                                    statLink={{text: "Just Updated", href:"/tickets"}}
                                />
                            </a>
                        </Tooltip>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={LocalOffer}
                            iconColor="red"
                            title="Pending Offers"
                            description="0"
                            statIcon={Update}
                            statText="Just Updated"
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={40}>
                        <ChartCard
                            chart={
                                <ChartistGraph
                                    className="ct-chart"
                                    data={emailsSubscriptionChart.data}
                                    type="Bar"
                                    options={emailsSubscriptionChart.options}
                                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                    listener={
                                        emailsSubscriptionChart.animation
                                    }
                                />
                            }
                            chartColor="orange"
                            title="Incoming Applications"
                            text="Current influx of graduate applications"
                            statIcon={AccessTime}
                            statText="Updated 2 hours ago"
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <TasksCard />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <RegularCard
                            headerColor="blue"
                            cardTitle="Faculty Stats"
                            cardSubtitle="Current status as of 12th March, 2018"
                            content={
                                <div>
                                    <Table
                                        tableHeaderColor="warning"
                                        tableHead={['ID','Name','Budget','Tickets Issued']}
                                        tableData={[
                                            [ '1' , "Professor 1" , "$20,000" , "5"] ,
                                            [ '2' , "Professor 2" , "$25,000" , "3" ] ,
                                            [ '3' , "Professor 3" , "$30,000" , "6" ] ,
                                            [ '4' , "Professor 4" , "$25,000" , "5" ] ,
                                        ]}
                                    />
                                    <Button color="info" href="/faculty">View All Faculty Members</Button>
                                </div>
                            }
                        />
                    </ItemGrid>
                </Grid>

            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
