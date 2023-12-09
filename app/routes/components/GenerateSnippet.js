
export function CreateCode(code) {
  const content = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      
  </body>
  </html>`

    

   
}

export function generateUniqueId() {
    // Use Date.now() for timestamp and Math.random() for randomness
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5);
  
    // Combine timestamp and random string to create a unique ID
    const uniqueId = `${timestamp}-${randomString}`;
  
    return uniqueId;
  }