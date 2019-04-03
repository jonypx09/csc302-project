import React from 'react';
import {
    withStyles, Card, CardContent, CardHeader, Typography, Tabs, Tab, IconButton, Tooltip, Input
} from 'material-ui';
import {
    PriorityHigh, Done, Cloud, Check, Edit, Close, CheckCircle, Cancel, Spellcheck
} from 'material-ui-icons';
import PropTypes from 'prop-types';

import { Tasks, Table, Button, CustomInput, Snackbar, RegularCard } from 'components';

import { tasksCardStyle } from 'variables/styles';

class TasksCard extends React.Component{
    state = {
        value: 0,
        open: false,
        place: 'tl',
        title: 'Create New Ticket'
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    taskModTitle = "";
    
    showDialog(color, title, duration, location){
        this.setState({value: 0, open: true, place: location, color: color, title: title});
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),duration);
    } 

    completedTasks = [[ "T1" , "Ticket Creation" ] ,[ "T2" , "Ticket Assignment" ] ,[ "T3" , "Offer Creation" ]];

    incompleteTasks = [
        ["Task 1", "Ticket Creation",
            <Tooltip
                id="tooltip-top"
                title="Mark As Complete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Check" className={this.props.tableActionButton} onClick={() => this.addCompletedTask("Task 1", "Ticket Creation")}>
                    <Check className={this.props.tableActionButtonIcon + " " + this.props.check}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Edit" className={this.props.tableActionButton} onClick={() => this.modifyTask("Task 1", "Ticket Creation")}>
                    <Edit className={this.props.tableActionButtonIcon + " " + this.props.edit}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Delete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Close" className={this.props.tableActionButton} onClick={() => this.deleteTask("Task 1", "Ticket Creation")}>
                    <Close className={this.props.tableActionButtonIcon + " " + this.props.close}/>
                </IconButton>
            </Tooltip>
        ],
        ["Task 2", "Ticket Deletion",
            <Tooltip
                id="tooltip-top"
                title="Mark As Complete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Check" className={this.props.tableActionButton} onClick={() => this.addCompletedTask("Task 2", "Ticket Deletion")}>
                    <Check className={this.props.tableActionButtonIcon + " " + this.props.check}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Edit" className={this.props.tableActionButton} onClick={() => this.modifyTask("Task 2", "Ticket Deletion")}>
                    <Edit className={this.props.tableActionButtonIcon + " " + this.props.edit}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Delete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Close" className={this.props.tableActionButton} onClick={() => this.deleteTask("Task 2", "Ticket Deletion")}>
                    <Close className={this.props.tableActionButtonIcon + " " + this.props.close}/>
                </IconButton>
            </Tooltip>
        ],
        ["Task 3", "Respond to Ticket Request",
            <Tooltip
                id="tooltip-top"
                title="Mark As Complete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Check" className={this.props.tableActionButton} onClick={() => this.addCompletedTask("Task 3", "Respond to Ticket Request")}>
                    <Check className={this.props.tableActionButtonIcon + " " + this.props.check}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="down"
                classes={{tooltip:this.props.tooltip}} >
                <IconButton aria-label="Edit" className={this.props.tableActionButton} onClick={() => this.modifyTask("Task 3", "Respond to Ticket Request")}>
                    <Edit className={this.props.tableActionButtonIcon + " " + this.props.edit}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Delete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Close" className={this.props.tableActionButton} onClick={() => this.deleteTask("Task 3", "Respond to Ticket Request")}>
                    <Close className={this.props.tableActionButtonIcon + " " + this.props.close}/>
                </IconButton>
            </Tooltip>
        ]
    ];

    retrieveTaskName(event) {
        this.setState({taskName: event.target.value});
    }

    retrieveTaskDetails(event){
        this.setState({taskDetails: event.target.value});
    }

    taskModifyDialog=
        <RegularCard
            cardTitle={"Edit this task" + this.taskModTitle}
            cardSubtitle="Modify the name and/or details of this task"
            content={
                <div>
                    <label>Name of Task: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTaskName.bind(this)}/>
                    <label>Details of Task: </label><Input fullWidth={true} type="text" onBlur={this.retrieveTaskDetails.bind(this)}/>
                    <div>
                    </div>
                    <Button color="warning" onClick={() => this.changeTask(this.state.taskName, this.state.taskDetails)}>Modify Task</Button>
                    <Button color="danger" onClick={() => this.setState({open:false})}>Cancel</Button>
                </div>
            }
        />
    ;

    dialogMessage = "Marked Task as Complete!";
    dialogIcon = CheckCircle;

    checkTask(taskName, name){
        return taskName[0] == this;
    }

    addCompletedTask(name, details) {
        this.completedTasks.push([name, details]);
        this.dialogIcon = CheckCircle;
        this.dialogMessage = "Marked Task As Complete!";
        this.incompleteTasks.splice(this.incompleteTasks.findIndex(this.checkTask, name), 1);
        this.showDialog('success', 'Create New Task', 2000, 'bl');
    }

    deleteTask(name, details){
        this.dialogMessage = "Successfully Deleted Task!";
        this.dialogIcon = CheckCircle;
        this.incompleteTasks.splice(this.incompleteTasks.findIndex(this.checkTask, name), 1);
        this.showDialog('danger', 'Deleted Task', 2000, 'bl');
    }

    modifyTask(name, details){
        this.dialogMessage = this.taskModifyDialog;
        this.dialogIcon = this.props.displayNone;
        this.taskModTitle = name;
        this.showDialog('primary', 'Modify Task', 100000000, 'tc');
    }
    changeTask(name, details){
        var indexOfItem = this.incompleteTasks.findIndex(this.checkTask, name);
        if (indexOfItem == -1){
            this.dialogIcon = Cancel;
            this.dialogMessage = "Unable to Find Task to Edit";
            this.showDialog('danger', 'Modify Task Failed', 3000, 'bl');
        }else{
            this.incompleteTasks[indexOfItem][1] = details;
            this.dialogIcon = Spellcheck;
            this.dialogMessage = "Successfully Modifed Task";
            this.showDialog('success', 'Modify Task Success', 2000, 'bl');
        }
    }
    render(){
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    classes={{
                        root: (classes.cardHeader),
                        title: (classes.cardTitle),
                        content: (classes.cardHeaderContent)
                    }}
                    title="Tasks:"
                    action={
                        <Tabs
                            classes={{
                                flexContainer: classes.tabsContainer
                            }}
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorClassName={classes.displayNone}
                            textColor="inherit">
                            <Tab
                                classes={{
                                    wrapper: classes.tabWrapper,
                                    rootLabelIcon: classes.labelIcon,
                                    label: classes.label,
                                    rootInheritSelected: classes.rootInheritSelected
                                }}
                                icon={<PriorityHigh className={classes.tabIcon}/>}
                                label={"Incomplete"}/>
                            <Tab
                                classes={{
                                    wrapper: classes.tabWrapper,
                                    rootLabelIcon: classes.labelIcon,
                                    label: classes.label,
                                    rootInheritSelected: classes.rootInheritSelected
                                }}
                                icon={<Done className={classes.tabIcon}/>}
                                label={"Completed"}/>
                        </Tabs>
                    }
                />
                <CardContent>
                    {
                        this.state.value === 0 && (
                            <Typography component="div">
                                <Table id="incompleteTasks"
                                    tableHeaderColor="primary"
                                    tableHead={['Task Name', 'Type', 'Actions', '', '']}
                                    tableData={this.incompleteTasks}
                                />
                            </Typography>
                        )
                    }
                    {
                        this.state.value === 1 && (
                            <Typography component="div">
                                <Table id="completedTasks"
                                    tableHeaderColor="primary"
                                    tableHead={['Task Name','Type']}
                                    tableData={this.completedTasks}
                                />
                            </Typography>
                        )
                    }
                    <Button color="primary" href="/mytasks">View All Tasks</Button>
                    <Snackbar
                        place={this.state.place}
                        color={this.state.color}
                        icon={this.dialogIcon}
                        message={this.dialogMessage}
                        open={this.state.open}
                        closeNotification={() => this.setState({open:false})}
                        close
                    />
                </CardContent>
            </Card>
        );
    }
}

TasksCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(tasksCardStyle)(TasksCard);
