import React from 'react';
import { Link } from 'react-router'
import {
    PowerSettingsNew, Notifications, Dashboard, Search,
} from 'material-ui-icons';
import classNames from 'classnames';
import {
    withStyles, IconButton, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Hidden, Tooltip
} from 'material-ui';
import { Manager, Target, Popper } from 'react-popper';

import { CustomInput, IconButton as SearchButton } from 'components';

import { headerLinksStyle } from 'variables/styles';

class HeaderLinks extends React.Component{
    state = {
      open: false,
    };
    handleClick = () => {
      this.setState({ open: !this.state.open });
    };

    handleClose = () => {
      this.setState({ open: false });
    };
    render(){
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <CustomInput
                    formControlProps={{
                        className: classes.top + " " + classes.search
                    }}
                    inputProps={{
                        placeholder:"Search",
                        inputProps:{
                            'aria-label': 'Search',
                        }
                    }}/>
                <SearchButton color="white" aria-label="edit" customClass={classes.top + " " + classes.searchButton}>
                    <Search className={classes.searchIcon}/>
                </SearchButton>
                <Manager style={{display:"inline-block"}}>
                    <Target>
                        <IconButton
                            color="inherit"
                            aria-label="Notifications"
                            aria-owns={open ? 'menu-list' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick} className={classes.buttonLink}>
                            <Notifications className={classes.links}/>
                            <span className={classes.notifications}>4</span>
                            <Hidden mdUp>
                                <p onClick={this.handleClick} className={classes.linkText}>Notifications</p>
                            </Hidden>
                        </IconButton>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={open}
                        className={classNames({ [classes.popperClose]: !open })+ " " + classes.pooperResponsive}>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                                <Paper className={classes.dropdown}>
                                    <MenuList role="menu">
                                        <a href="/notifications"><MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Ticket Request from Professor X</MenuItem></a>

                                        <a href="/notifications"><MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Offer Response from Student X</MenuItem></a>

                                        <a href="/notifications"><MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Ticket Request from Professor Y</MenuItem></a>

                                        <a href="/notifications"><MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Ticket Request from Professor Z</MenuItem></a>

                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>

                <Tooltip
                    id="tooltip-top"
                    title="Sign Out"
                    placement="top"
                    classes={{tooltip:classes.tooltip}}>
                    <IconButton color="inherit" aria-label="Sign Out" className={classes.buttonLink} href="/login">
                        <PowerSettingsNew className={classes.links}/>
                        <Hidden mdUp>
                            <p className={classes.linkText}>Logout</p>
                        </Hidden>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
