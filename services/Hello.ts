async function handler(event: any, context: any) {
  return {
    statusCode: 400,
    body: "Hello World!",
  };
}

export { handler };
