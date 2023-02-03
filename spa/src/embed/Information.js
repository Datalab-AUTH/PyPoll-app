import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import './Information.css';
import {Circle} from '@mui/icons-material';

function Legend(entities) {
    return entities?.map((entity, index) => (
        <div className="dot" key={index}>
            <Circle sx={{color: `rgba(${entity.color.r}, ${entity.color.g}, ${entity.color.b}, ${entity.color.a})`}} />
            &nbsp;
            <Typography variant="body2">
                {entity.full_name}
            </Typography>
        </div>
    ));
}

function Properties(date, source, properties, entities) {
    const date_options = { year: 'numeric', month: 'long', day: 'numeric' };
    let full_names = {};
    entities?.forEach((entity) => {
        full_names[entity.username] = entity.full_name;
    });
    return (
        <List dense>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Period</Typography>}
                    secondary={
                        <Typography variant="body2">
                            {(new Date(date?.from)).toLocaleDateString("en-US", date_options)} - {(new Date(date?.until)).toLocaleDateString("en-US", date_options)}
                        </Typography>
                    }
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Source</Typography>}
                    secondary={<Typography variant="body2">{source?.name}</Typography>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Number of {source?.label_of_documents}</Typography>}
                    secondary={<Typography variant="body2">{source?.number_of_documents}</Typography>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Number of Users</Typography>}
                    secondary={<Typography variant="body2">{properties?.nodes}</Typography>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Number of Interactions</Typography>}
                    secondary={<Typography variant="body2">{properties?.edges}</Typography>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Polarization</Typography>}
                    secondary={
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Entity A</TableCell>
                                    <TableCell>Entity B</TableCell>
                                    <TableCell>Index</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {RenderTableBodyRows(properties?.polarization_index, full_names)}
                            </TableBody>
                        </Table>
                    }
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Follows</Typography>}
                    secondary={Legend(entities)}
                />
            </ListItem>
        </List>
    );
}

function RenderTableBodyRows(obj, full_names) {
    if (obj) {
        return Object.keys(obj).map((key, index) => {
            const usernames = key.split('|')
            return (
                <TableRow key={index}>
                    <TableCell>{full_names[usernames[0]]}</TableCell>
                    <TableCell>{full_names[usernames[1]]}</TableCell>
                    <TableCell>{obj[key]}</TableCell>
                </TableRow>
            );
        })
    }
    return (<TableRow></TableRow>);
}

function Information(props) {
    const {openInformation, setOpenInformation} = props.control;
    const metadata = props.data;

    return (
        <Dialog
            open={openInformation}
            onClose={() => {
                setOpenInformation(false);
            }}
            aria-labelledby="information-dialog-title"
        >
            <DialogTitle id="information-dialog-title">
                {metadata.title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2">

                </Typography>
                {Properties(metadata.date, metadata.source, metadata.graph_properties, metadata.entities)}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpenInformation(false);
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Information;
