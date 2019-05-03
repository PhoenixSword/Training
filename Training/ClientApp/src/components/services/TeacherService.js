import token from './Auth-header';

export const teacherService={
  getSchoolChilds,
  addSchoolChilds
}

var result = "";

function getSchoolChilds() {
 return fetch('/api/teachers/getSchoolChilds', {headers: token()})
.then((resp)=>{ return resp.json() })
.then((json)=>{ 
  result = json;
  return result;
  })
}

function addSchoolChilds(data) {
 return fetch('/api/teachers/addSchoolChilds', 
   {
    method: 'POST',
    headers: token(),
    body: JSON.stringify(data) 
  })
.then((resp)=>{ return resp.json() })
.then((json)=>{ 
  result = json;
  return result;
  })
}

