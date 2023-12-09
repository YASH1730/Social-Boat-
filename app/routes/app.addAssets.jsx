
import { authenticate } from '../shopify.server';

import React from 'react';


export async function loader({ request }) {
   
    const { admin,session } = await authenticate.admin(request);
//    get all tag 
     const res = await admin.rest.resources.ScriptTag.all({
        session: session,
      });

    // del tag 
    // const arr = [198896844847]
    // const res = await  Promise.all(arr.map(async id=>await admin.rest.resources.ScriptTag.delete({
    //     session: session,
    //     id,
    //   })))

    // add tag 
//     const script_tag = new admin.rest.resources.ScriptTag({ session: session });
//     script_tag.id = 8302043259;
//     script_tag.event = "onload";
//     script_tag.src = "https://2b30-182-69-18-33.ngrok-free.app/script.js";
//     console.log(script_tag)
 
//     // const res = script_tag;
    
//    const res = await script_tag.save({
//         update: true,
//     });
   
    console.log(" >>> ",res)

    return null
}


const AppAddAssetsName = () => {
    return (
        <div>
            yashwant
        </div>
    );
}

export default AppAddAssetsName;
