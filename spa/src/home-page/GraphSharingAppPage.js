import React, { Fragment } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Stack,
    Typography
} from '@mui/material';
import './LandPage.css';

function SectorA() {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Graph sharing app
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    With Graph sharing app, a user uploads a GEXF graph file (e.g., created by PyPoll), and receives a URL
                    with an online visualization of the uploaded graph. The URL can be shared with anyone and
                    other users can view and interact with the graph online through the browser without restrictions
                    (i.e. create an account). For security reasons, users that want to create visualizations need
                    to create an account (for free) and login, whereas for accessing a visualization no account is
                    needed.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" href="https://github.com/dpgiakatos/PyPoll">Go to PyPoll</Button>
                </Stack>
            </Container>
        </Box>
    );
}

function MyCard({title, body, code, link}) {
    return (
        <Card sx={{ minWidth: 275, m: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <div>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    {code.length > 0 &&
                        <pre>
                            {code.map((line, index) => (
                                <Fragment key={index}>
                                    {line}
                                    {index < (code.length-1) ? <br /> : ""}
                                </Fragment>
                            ))}
                        </pre>
                    }
                </div>
            </CardContent>
            {link !== "" &&
                <CardActions>
                    <Button size="small" href={link}>Learn More</Button>
                </CardActions>
            }
        </Card>
    );
}

function SectorB() {
    const API_URL = process.env.REACT_APP_API_HOST
    const APP_URL = process.env.REACT_APP_APP_HOST;
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Typography
                component="h2"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Instructions
            </Typography>
            <Container maxWidth="md">
                <MyCard
                    title={"Step 1"}
                    body={"Create a graph GEXF file using PyPoll."}
                    code={[]}
                    link={"https://github.com/dpgiakatos/PyPoll"}
                />
                <MyCard
                    title={"Step 2A"}
                    body={"Use PyPoll SDK to login. If you do not have an account go to Step 2B."}
                    code={["from pypoll import SDK", `sdk = SDK("${API_URL}")`, `sdk.sign_in("your@email.com", "your_password")`]}
                    link={""}
                />
                <MyCard
                    title={"Step 2B"}
                    body={"Create an account using PyPoll SDK. After the creation of the account you must contact us to activate your account."}
                    code={[`sdk.sign_up("your@email.com", "your_password", "your_first_name", "your_last_name")`]}
                    link={""}
                />
                <MyCard
                    title={"Step 3"}
                    body={"Upload your GEXF file from Step 1 using PyPoll SDK. The function will return the ID of the uploaded graph."}
                    code={[`sdk.upload_graph("your_graph.gexf")`]}
                    link={""}
                />
                <MyCard
                    title={"Step 4"}
                    body={"You can share graph using the following url. Where the <graph_id> is the ID of the uploaded graph from the Step 3."}
                    code={[`${APP_URL}/embed/<graph_id>`]}
                    link={""}
                />
            </Container>
        </Box>
    );
}

function GraphSharingAppPage() {
    return (
        <Box>
            <SectorA />
            <SectorB />
        </Box>
    );
}

export default GraphSharingAppPage;
