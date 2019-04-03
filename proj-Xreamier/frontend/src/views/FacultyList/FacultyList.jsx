import React from 'react';
import {
    withStyles, IconButton
} from 'material-ui';

import {
    PriorityHigh, Done, Cloud, Check, Edit, Close
} from 'material-ui-icons';

import RegularCard from 'components/Cards/RegularCard';

import {
    P, Quote, Muted, Primary, Info, Success, Warning, Danger, Small, Button, Table
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

class TypographyPage extends React.Component{
    render(){
        return (
            <RegularCard
                cardTitle={"Faculty List"}
                cardSubtitle={"List of All Faculty Members"}
                content={
                    <div>
                        <Table
                            tableHeaderColor="info"
                            tableHead={['Name','Budget', 'Tickets Issued']}
                            tableData={[
                                [ "Professor 1" , "$20,000" , "5" ] ,
                                [ "Professor 2" , "$20,000" , "3" ] ,
                                [ "Professor 3" , "$25,000" , "4" ] ,
                                [ "Professor 4" , "$20,000" , "5" ] ,
                                [ "Professor 5" , "$20,000" , "6" ] ,
                                [ "Professor 6" , "$20,000" , "3" ]
                            ]}
                        />
                    </div>
                }
            />
        );
    }
}

export default withStyles(style)(TypographyPage);
