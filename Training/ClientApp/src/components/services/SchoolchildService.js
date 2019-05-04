import token from './Auth-header';

export const teacherService={
  getSchoolChilds,
  addSchoolChilds
}

var result = [];

function getSchoolChilds() {
 return fetch('/api/teachers/getSchoolChilds', {headers: {'Authorization': 'Bearer ' + token()}})
.then((resp)=>{ 
 if (resp.ok) return resp.json(); else return result;})
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
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
    body: JSON.stringify(data) 
  })
.then((resp)=>{ return resp.json() })
.then((json)=>{ 
  result = json;
  return result;
  })
}

