import { Box, Button, ButtonGroup, Card, Form, Grid, Page, Text } from '@shopify/polaris';
import React, { useEffect } from 'react';
import { Connect, CreateTag, CreateUser } from '../services/service';
import { useSubmit } from '@remix-run/react';

const AppStatus = ({ state, setState }) => {

    const submit = useSubmit();
    function handleConnection() {
        submit({ state: JSON.stringify(state) }, { method: "post" });
        setState({
            type: "Set_Connect",
            payload: !state.connected
        })
    }

    return (
        <Box>
            <Text as="p" tone="subdued">
                App Status
            </Text>
            <Grid gap={"xs"}>
                <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <Card>
                        <Grid>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 11, lg: 11, xl: 11 }}>
                                <Text variant='bodyLg' as="p" tone="subdued">
                                    The Social-Boat is {state.connected ? <Text variant='bodyLg' as='span' tone="success">active</Text> : <Text variant='bodyLg' as='span' tone="critical">inactive</Text>} in store.
                                </Text>
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 1, lg: 1, xl: 1 }}>
                                <ButtonGroup>
                                <Form method='post'>
                                    {state.connected ?
                                        <Button type='submit' onClick={handleConnection}>Disable</Button>
                                        :
                                        <Button type='submit' variant="primary" onClick={handleConnection}>Enable</Button>
                                    }
                                    </Form>
                                </ButtonGroup>
                            </Grid.Cell>
                        </Grid>
                    </Card>
                </Grid.Cell>
            </Grid>
        </Box>

    );
}



export default AppStatus;
