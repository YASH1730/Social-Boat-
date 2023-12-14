import { Box, Card, Divider, Grid, RangeSlider, Select, Text, } from '@shopify/polaris';
import React, { useEffect } from 'react';

export default function Edit({ state, setState }) {
  function handleChange(target, e) {
    setState({
      type: "Set_Value",
      payload: {
        [target]: e
      }
    })
  }

 

  const options = [
    { label: 'top-right', value: 'top-right' },
    { label: 'top-left', value: 'top-left' },
    { label: 'bottom-right', value: 'bottom-right' },
    { label: 'bottom-left', value: 'bottom-left' },
  ];

  const optionsShape = [
    { label: 'rounded', value: 'rounded' },
    { label: 'square', value: 'square' },
    ];

  useEffect(()=>{
    handleOnChangePos();
  },[state.position])

  function handleOnChangePos() {
    setState({
      type :"Set_Value",
      payload : state.position.includes('bottom') ? {top_pos :0} : {bottom_pos : 0}
    })
    
  }

  return (
    <Box>
      <Text as="p" tone="subdued" >Edit Widget</Text>
      <Grid columns={{ sm: 2 }} >
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Card>
            <Text as="p" tone="subdued" >Set Position</Text>
            <Divider></Divider>
            <div className='spacing' />
            <Select
              options={options}
              label="Position"
              placeholder='Select position were to display...'
              onChange={(val) => handleChange("position", val)}
              name='position'
              value={state.position}
            />
            <div className='spacing' />

            <Select
              label="Select Icon Shape"
              options={optionsShape}
              placeholder='Select icon shape...'
              onChange={(val) => handleChange("shape", val)}
              name='shape'
              value={state.shape}
            />
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Card>
            <Text as="p" tone="subdued" >Set Dimension</Text>
            <Divider></Divider>
            <div className='spacing' />
            <RangeSlider
              label="Icon Width"
              min={20}
              max={200}
              value={state.icon_width}
              prefix={<p>50</p>}
              suffix={
                <p
                  style={{
                    minWidth: '24px',
                    textAlign: 'right',
                  }}
                >
                  {300}
                </p>
              }
              onChange={(val) => handleChange("icon_width", val)}
              output
            />
            <div className='spacing' />

            <RangeSlider
              label="Top Margin (Only Applicable when position in top related.)"
              value={state.top_pos}
              prefix={<p>0</p>}
              disabled = {state?.position.includes("bottom")}
              min={0}
              max={100}
              suffix={
                <p
                  style={{
                    minWidth: '24px',
                    textAlign: 'right',
                  }}
                >
                  {"100%"}
                </p>
              }
              onChange={(val) => handleChange("top_pos", val)}
              output
            />
            <div className='spacing' />

            <RangeSlider
              label="Bottom Margin (Only Applicable when position in bottom related.)"
              value={state.bottom_pos}
              prefix={<p>0</p>}
              disabled = {state?.position.includes("top")}
              min={0}
              max={100}
              suffix={
                <p
                  style={{
                    minWidth: '24px',
                    textAlign: 'right',
                  }}
                >
                  {"100%"}
                </p>
              }
              onChange={(val) => handleChange("bottom_pos", val)}
              output
            />
          </Card>
        </Grid.Cell>
      </Grid>
    </Box>
  );
}