import React  from 'react';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditButton from '@material-ui/icons/Edit';

const column = () => {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Activated',
            dataIndex: 'active',
            key: 'active',
            tableCellProps:{align:'center'},
            render: (text, record) =>  
                <Switch
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
        },
        {
            title: 'Update',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            tableCellProps:{align:'center'},
            render: (text, record) => 
                <IconButton
                    aria-label="edit"
                >
                    <EditButton fontSize="small" />
                </IconButton>

            
        },
        {
            title: 'Action',
            dataIndex: 'actions',
            key: 'actions',
            tableCellProps:{align:'center'},
            render: (text, record) => 
                <Button
                    variant='contained'
                    color='primary'
                    style={{color:'#fff'}}
                    aria-label="action page"
                   
                >
                Actions
                </Button>

            
        },

    ];
};

export default column;