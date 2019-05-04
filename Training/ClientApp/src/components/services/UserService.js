export const userService={
  authorize,
  login,
  register,
  logout
}

var message = "";

function authorize() {
  return localStorage.getItem('user') ? true : false;
}

function login(data) {
 return fetch('/api/users/login', 
  {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  })
.then((resp)=>{ return resp.json() })
.then((json)=>{ 
  if(json.resultStatus)
  {
    localStorage.setItem('user', JSON.stringify(json)); 
    message = null;
  }
  else
    message = "Incorrect login or password";
  return message;
  })
}

function register(data) {
  console.log(data);
 return fetch('/api/users/register',
 {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify(data) 
  })
.then((resp)=>{ return resp.json() })
.then((json)=>{ 
  if(json.resultStatus)
  {
    localStorage.setItem('user', JSON.stringify(json)); 
    message = null;
  }
  else
    message = json.errors[0].description;
  return message;
  })
}


function logout() {
  localStorage.removeItem('user');
}