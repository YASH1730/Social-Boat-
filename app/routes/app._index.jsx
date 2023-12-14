import React, { useEffect, useReducer } from 'react';
import styles from "./styles/main.css"
import Edit from './components/Edit';
import {  Button, Layout, Page} from '@shopify/polaris';
import AppStatus from './components/AppStatus';
import SocialMedia from './components/SocialMedia';
import { authenticate } from "../shopify.server";
import { useActionData, useSubmit } from '@remix-run/react';
import { Connect, CreateTag, CreateUser, UpdateScript } from './services/service';
import { YoutubeMinor } from '@shopify/polaris-icons';
import YT from './social/icons8-facebook.svg'


const Home = () => {
  const [state,localState] = useReducer(reducer,initialState);
  const data = useActionData();

  useEffect(()=>{
   data?.shop && localState({type : "Set_Value", payload : data.shop})},[data])
 
  async function handleEdit() {
    console.log("Called")
    let res = await UpdateScript(state);
    console.log(res)
  }

  return (
    <Page fullWidth title="Welcome to Social Boat">
      <Layout>
        <Layout.Section>
          <AppStatus state= {state} setState={localState}/>
        </Layout.Section>
        <Layout.Section>
          <SocialMedia state={state} setState = {localState} />
        </Layout.Section>
        <Layout.Section>
          <Edit state={state} setState={localState}/>
        </Layout.Section>
        <Layout.Section>
          <div className='flex' style={{justifyContent : 'end'}}>
            <Button variant='primary' onClick={handleEdit}>Apply</Button>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export async function action({ request }) {

  let shop = await Connect(request)
  console.log("********* 1")

  if (shop.status === 'success') {
      let res = await CreateTag(request, shop?.data?.name || "default")
      console.log("********* 2")

      if (res.status === 200) {
          console.log(shop?.data)
          let data = {
              username: shop?.data.owner,
              email: shop?.data.email,
              shop: shop?.data.name,
              tag_id: res.script_tag.id
          }
          let user = await CreateUser(data)
          if (user.status === 200)
              return { data: res, shop: data }
          else
              return { status: 500 }
      }
  }
  else
      return { status: 500 }
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

function reducer(state,action) {
  switch (action.type) {
    case "Add_Row":
      if(!state.rows.find(row=>action.payload.img === row.img))
      state = {...state, rows : [...state.rows,action.payload]}
      else 
      return state;
      return state
    case "Remove_Row":
      state = {...state, rows : state.rows.filter(row=>row.id!=action.payload.id)}
      let newState = state;
      delete newState[action.payload.id];
      state = newState
      return state
    case "Set_Value":
      state = {...state, ...action.payload}
      return state
    case "Set_URL":
      let newRows = state.rows.map(row=>{
        if(row.id === action.payload.id)
        {
          row = {...row, url : action.payload.url}
        }
        return row 
      })
      state = {...state,rows : newRows, [action.payload.id] : action.payload.url}
      return state
    case "Set_Connect":

      state = {...state,connected : action.payload}
      return state
    default:
      return state;
  }
}

const initialState = {
  rows : [],
  load : false,
  connected : false,
  position : "top-left",
  shape : "square",
  icon_width : 50,
  top_pos : 0,
  bottom_pos : 0,
  username : "",
  email : "",
  shop : "",
  tag_id : undefined
}


export default Home;
