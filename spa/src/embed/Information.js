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

function Legend(users) {
    const entities = [];
    for (const key in users) {
        entities.push(users[key])
    }
    return entities?.map((user, index) => (
        <div className="dot" key={index}>
            <Circle sx={{color: `rgba(${user.color.r}, ${user.color.g}, ${user.color.b}, ${user.color.a})`}} />
            &nbsp;
            <Typography variant="body2">
                {user.full_name}
            </Typography>
        </div>
    ));
}

function Properties(description, source, graph_properties, users) {
    let full_names = {};
    for (const key in users) {
        full_names[key] = users[key].full_name;
    }
    return (
        <List dense>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Description</Typography>}
                    secondary={
                        <Typography variant="body2">
                            {description}
                        </Typography>
                    }
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Source</Typography>}
                    secondary={<Typography variant="body2">{source}</Typography>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Number of Users</Typography>}
                    secondary={<Typography variant="body2">{graph_properties?.nodes}</Typography>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Number of Interactions</Typography>}
                    secondary={<Typography variant="body2">{graph_properties?.edges}</Typography>}
                />
            </ListItem>
            {/*<ListItem>*/}
            {/*    <ListItemText*/}
            {/*        disableTypography*/}
            {/*        primary={<Typography variant="body2">Polarization</Typography>}*/}
            {/*        secondary={*/}
            {/*            <Table>*/}
            {/*                <TableHead>*/}
            {/*                    <TableRow>*/}
            {/*                        <TableCell>Entity A</TableCell>*/}
            {/*                        <TableCell>Entity B</TableCell>*/}
            {/*                        <TableCell>Index</TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                </TableHead>*/}
            {/*                <TableBody>*/}
            {/*                    {RenderTableBodyRows(graph_properties?.polarization_index, full_names)}*/}
            {/*                </TableBody>*/}
            {/*            </Table>*/}
            {/*        }*/}
            {/*    />*/}
            {/*</ListItem>*/}
            <ListItem>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2">Legend</Typography>}
                    secondary={Legend(users)}
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
                {Properties(metadata.description, metadata.source, metadata.graph_properties, metadata.users)}
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
