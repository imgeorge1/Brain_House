const DEV_MODE = process.env.NODE_ENV === "developer";

const authRequests = async (req, res) => {
  // Converting Express req headers to Fetch API's Headers
  const headers = new Headers();
  for (const headerName in req.headers) {
    const headerValue = req.headers[headerName]?.toString() ?? "";
    if (Array.isArray(headerValue)) {
      for (const value of headerValue) {
        headers.append(headerName, value);
      }
    } else {
      headers.append(headerName, headerValue);
    }
  }

  // Creating Fetch API's Request object from Express' req
  const request = new Request(
    DEV_MODE ? "http://localhost:5173" : process.env.CLIENT_URL + req.url,
    {
      method: req.method,
      headers: headers,
      body: req.body,
    }
  );

  // Main Auth.js function
  const response = await Auth(request, config);

  // Converting Fetch API's Response to Express' res
  res.status(response.status);
  res.contentType(response.headers.get("content-type") ?? "text/plain");
  response.headers.forEach((value, key) => {
    if (value) {
      res.setHeader(key, value);
    }
  });
  const body = await response.text();

  res.send(body);
};
export default authRequests;
