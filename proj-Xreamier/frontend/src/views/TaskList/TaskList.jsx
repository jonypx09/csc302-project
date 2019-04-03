import React from 'react';
import {
    withStyles, IconButton, Tooltip, Input
} from 'material-ui';

import {
    PriorityHigh, Done, Cloud, Check, Edit, Close, CheckCircle, AddCircle, Cancel, Spellcheck
} from 'material-ui-icons';

import RegularCard from 'components/Cards/RegularCard';

import {
    P, Quote, Muted, Primary, Info, Success, Warning, Danger, Small, Button, Table, CustomInput, Snackbar
} from 'components';

const style = {
    typo: {
        paddingLeft: '25%',
        marginBottom: '40px',
        position: 'relative',
    },
    note: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        bottom: '10px',
        color: '#c0c1c2',
        display: 'block',
        fontWeight: '400',
        fontSize: '13px',
        lineHeight: '13px',
        left: '0',
        marginLeft: '20px',
        position: 'absolute',
        width: '260px',
    },
}

class TypographyPage extends React.Component {

    state = {
        open: false,
        place: 'tl',
        title: 'Create New Ticket',
        taskName: '',
        taskDetails: 'random text input',
        inputValue: ''
    }
    
    showDialog(color, title, duration, location){
        this.setState({open: true, place: location, color: color, title: title});
        setTimeout(function(){
            this.setState({open: false});
        }.bind(this),duration);
    }

    actionsSuite = [
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
    ];

    createActionsSuite(name, details){
        this.actionsSuite = [
            <Tooltip
                id="tooltip-top"
                title="Mark As Complete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Check" className={this.props.tableActionButton} onClick={() => this.addCompletedTask(name, details)}>
                    <Check className={this.props.tableActionButtonIcon + " " + this.props.check}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Edit" className={this.props.tableActionButton} onClick={() => this.modifyTask(name, details)}>
                    <Edit className={this.props.tableActionButtonIcon + " " + this.props.edit}/>
                </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top"
                title="Delete"
                placement="down"
                classes={{tooltip:this.props.tooltip}}>
                <IconButton aria-label="Close" className={this.props.tableActionButton} onClick={() => this.deleteTask(name, details)}>
                    <Close className={this.props.tableActionButtonIcon + " " + this.props.close}/>
                </IconButton>
            </Tooltip>
        ];
        return this.actionsSuite;
    } 

    retrieveTaskName(event) {
        this.setState({taskName: event.target.value});
    }

    retrieveTaskDetails(event){
        this.setState({taskDetails: event.target.value});
    }

    taskModifyDialog=
        <RegularCard
            cardTitle={"Edit this task"}
            cardSubtitle="Specify the name of the task and modify its details"
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

    addTaskDialog=
        <RegularCard
            cardTitle={"Add a New Task"}
            cardSubtitle="Specify the name and add details (if necessary)"
            content={
                <div>
                    <label>Name of Task: </label><Input fullWidth={true} id="taskNameAdd" type="text" onBlur={this.retrieveTaskName.bind(this)}/>
                    <label>Details of Task: </label><Input fullWidth={true} id="taskDetailsAdd" type="text" onBlur={this.retrieveTaskDetails.bind(this)}/>
                    <div>
                    </div>
                    <Button color="info" onClick={() => this.addTask(this.state.taskName, this.state.taskDetails)}>Add Task</Button>
                    <Button color="danger" onClick={() => this.setState({open:false})}>Cancel</Button>
                </div>
            }
        />
    ;

    outstandingTasks = [
        [ "Task 1" , "Ticket Creation" , this.createActionsSuite("Task 1", "Ticket Creation")],
        [ "Task 2" , "Ticket Deletion" , this.createActionsSuite("Task 2", "Ticket Deletion") ] ,
        [ "Task 3" , "Respond to Ticket Request" , this.createActionsSuite("Task 3", "Respond to Ticket Request") ] ,
        [ "Task 4" , "N/A" , this.createActionsSuite("Task 4", "N/A") ] ,
        [ "Task 5" , "N/A" , this.createActionsSuite("Task 5", "N/A") ] ,
        [ "Task 6" , "N/A" , this.createActionsSuite("Task 6", "N/A") ]
    ]

    completedTasksData = [
        [ "T1" , "Ticket Creation" ] ,
        [ "T2" , "Ticket Assignment" ] ,
        [ "T3" , "Offer Creation" ]

    ]

    dialogMessage = "Marked Task as Complete!";
    dialogIcon = CheckCircle;

    checkTask(taskName, name){
        return taskName[0] == this;
    }

    addCompletedTask(name, details) {
        this.completedTasksData.push([name, details]);
        this.dialogMessage = "Marked Task As Complete!";
        this.outstandingTasks.splice(this.outstandingTasks.findIndex(this.checkTask, name), 1);
        this.showDialog('success', 'Complete Task', 2000, 'bl');
    }

    deleteTask(name, details){
        this.dialogMessage = "Successfully Deleted Task!";
        this.dialogIcon = CheckCircle;
        this.outstandingTasks.splice(this.outstandingTasks.findIndex(this.checkTask, name), 1);
        this.showDialog('danger', 'Deleted Task', 2000, 'bl');
    }

    modifyTask(name, details){
        this.dialogMessage = this.taskModifyDialog;
        this.dialogIcon = this.props.displayNone;
        this.taskModTitle = name;
        this.showDialog('primary', 'Modify Task', 100000000, 'tc');
    }

    addTaskInput(){
        this.dialogMessage = this.addTaskDialog;
        this.dialogIcon = this.props.displayNone;
        this.showDialog('info', 'Add Task', 100000000, 'tc');
    }

    addTask(name, details){
        var filteredName = name.trim();
        if (filteredName == ''){
            this.setState({open:false});
            this.dialogIcon = Cancel;
            this.dialogMessage = "You Must Specify the Name of This Task!";
            this.showDialog('primary', 'Create New Task Failed', 2000, 'bl');
        }else{
            this.outstandingTasks.push([name, details, this.createActionsSuite(filteredName, details)]);
            this.setState({open:false});
            this.dialogIcon = AddCircle;
            this.dialogMessage = "Successfully Added Task";
            this.showDialog('success', 'Create New Task', 2000, 'bl');
        }    
    }

    changeTask(name, details){
        var indexOfItem = this.outstandingTasks.findIndex(this.checkTask, name);
        if (indexOfItem == -1){
            this.dialogIcon = Cancel;
            this.dialogMessage = "Unable to Find Task to Edit";
            this.showDialog('danger', 'Modify Task Failed', 3000, 'bl');
        }else{
            this.outstandingTasks[indexOfItem][1] = details;
            this.dialogIcon = Spellcheck;
            this.dialogMessage = "Successfully Modifed Task";
            this.showDialog('success', 'Modify Task Success', 2000, 'bl');
        }
    }

    render(){
        return (
            <div>
                <RegularCard
                    cardTitle={"My Outstanding Tasks"}
                    cardSubtitle={"Here is your list of outstanding tasks"}
                    content={
                        <div>
                            <Button color="info" onClick={() => this.addTaskInput()}>Add New Task</Button>
                            <Snackbar
                                place={this.state.place}
                                color={this.state.color}
                                icon={this.dialogIcon}
                                message={this.dialogMessage}
                                open={this.state.open}
                            />
                            <Table
                                tableHeaderColor="info"
                                tableHead={['Name of Task','Details of Task', 'Actions']}
                                tableData={this.outstandingTasks}
                            />
                        </div>
                    }
                />
                <RegularCard
                    cardTitle={"Completed Tasks"}
                    cardSubtitle={"Here is your list of completed tasks"}
                    headerColor='green'
                    content={
                        <div>
                            <Table
                                tableHeaderColor="success"
                                tableHead={['Name of Task','Details of Task']}
                                tableData={this.completedTasksData}
                            />
                        </div>
                    }
                />
            </div>
        );
    }
}

export default withStyles(style)(TypographyPage);
