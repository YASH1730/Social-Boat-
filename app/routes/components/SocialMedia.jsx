import {  Box, Button, Card, Grid, Text, TextField } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { AddMajor, DeleteMajor } from '@shopify/polaris-icons'
import ModalBox from './utility/Modal_Box';
import { generateUniqueId } from './GenerateSnippet.js';
const SocialMedia = ({ state, setState }) => {
    const [active, setActive] = useState(false);

    const handleModal = useCallback(() => setActive(!active), [active]);
    const addRow =useCallback((icon) => {

       return  setState({
            type : "Add_Row",
            payload:{
                id :generateUniqueId(),
                img : icon.img,
                name : icon.name,
                url : "hr",
            }
        })
    },[state.rows]);

    const removeRow =useCallback((id) => {
      return  setState({
            type : "Remove_Row",
            payload:{
                id :id
            }
        })
    },[state.rows]);

    

    const activator = <div className='flex' style={{ width: "100%", justifyContent: 'end' }}>
        <Button icon={AddMajor} onClick={handleModal} tone='success'>Add Social Icon</Button>
    </div>;

function handleChange(target,val) {
    setState({
        type : "Set_URL",
        payload : {
            id : target,
            url : val
        }
    })    
}

    return (
        <Box>
            <Text as="p" tone="subdued" >Social Section</Text>
            <Card>
                <Grid columns={{ sm: 3 }}>
                    <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <ModalBox activator={activator} active={active} handleChange={handleModal} addRow={addRow}/>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <Table state={state} handleChange={handleChange} removeRow={removeRow} />
                    </Grid.Cell>
                </Grid>
            </Card>
        </Box>
    );
}

function Table({ state, removeRow, handleChange }) {
    return <div style={{overflowY : 'auto', height : "250px"}}>
        <table style={{ width: "100%" }} >
            <thead>
                <tr>
                    <th>Social Icon</th>
                    <th>URL</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {state.rows.map((row,i) => <tr key={row.id}>
                    <td><Box as='button' className='icon-card' ><img src={row.img} alt="icon" />
                    </Box></td>
                    <td><TextField type='url' name={row.id} value = {state[row.id] || ""} onChange={(val)=>handleChange(row.id,val)} placeholder='Enter the url'/></td>
                    <td><Button icon={DeleteMajor}  onClick={()=>removeRow(row.id)}></Button></td>
                </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default SocialMedia;
