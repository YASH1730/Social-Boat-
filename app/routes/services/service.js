import { authenticate } from "../../shopify.server";
import axios from "axios";

const url = "https://5a21-2401-4900-1c7a-ed05-25be-d4c2-ce22-1461.ngrok-free.app/api";

export async function Connect(request) {
  const { admin, session } = await authenticate.admin(request);
  const res = await admin.rest.resources.Shop.all({
    session: session
  });

  if (res?.data?.[0])
    return {
      status: "success",
      data: {
        name: res.data[0].name,
        email: res.data[0].email,
        owner: res.data[0].shop_owner
      }
    };
  else
    return {
      status: "fail",
      data: {}
    };
}

export async function CreateTag(request, fileName) {
  // hit backend for file url;
  let fileURL = await axios.get(`${url}/createFile?fileName=${fileName}`);

  if (fileURL?.data?.status === "success") fileURL = fileURL.data.url;

  // hit Shopify APIS for creating the tag in online store
  const { admin, session } = await authenticate.admin(request);
  let script_tag = new admin.rest.resources.ScriptTag({ session: session });

  script_tag.event = "onload";
  script_tag.src = fileURL;

  await script_tag.save({
    update: true
  });

  // get the script tag ID
  let list = await admin.rest.resources.ScriptTag.all({
    session: session
  });

  list = list?.data || [];

  return { script_tag: list[list.length - 1] || [], status: 200 };
}
export async function RemoveTag(request, id) {
  // hit Shopify APIS for creating the tag in online store
  const { admin, session } = await authenticate.admin(request);
  const script_tag = await admin.rest.resources.ScriptTag.delete({
    session: session,
    id
  });

  const res = await script_tag.save({
    update: true
  });

  console.log(res);
  return { script_tag };
}

export async function CreateUser(data) {
  let res = await axios.post(`${url}/createUser`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  if (res.status === 200) return { status: 200 };
  else {
    console.log(res.data.error);
    return {
      status: 500,
      message: "Fail"
    };
  }
}

export async function UpdateScript(data) {
    
  let res = await axios.post(`${url}/updateScript`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  console.log(res)
  if (res.status === 200) return { status: 200 };
  else {
    console.log(res.data.error);
    return {
      status: 500,
      message: "Fail"
    };
  }
}


export async function uploadIcon(data){
  let res = await axios.post(`${url}/uploadIcon`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  if (res.status === 200) return { ...res.data };
  else {
    console.log(res.data.error);
    return {
      status: 500,
      message: "Fail"
    };
  }
}