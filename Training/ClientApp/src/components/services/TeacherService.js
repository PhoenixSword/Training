import {token} from './Auth-header';

export const teacherService={
  getSchoolChilds,
  addSchoolChilds,
  removeSchoolChilds,
  getSchoolChildsWithEvents,
  getEvents,
  addEvents,
  removeEvents,
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

function getSchoolChildsWithEvents() {
 return fetch('/api/teachers/getSchoolChildsWithEvents', {headers: {'Authorization': 'Bearer ' + token()}})
.then((resp)=>{ 
 if (resp.ok) return resp.json(); else return result;})
.then((json)=>{ 
  result = json;
  return result;
  })
}

function getEvents() {
 return fetch('/api/teachers/getEvents', {headers: {'Authorization': 'Bearer ' + token()}})
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
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
    body: JSON.stringify(data) 
  })
.then((resp)=>{
if (resp.ok) return resp.json(); else return result;})
.then((json)=>{ 
  result = json;
  return result;
  })
}

function addEvents(data) {
 return fetch('/api/teachers/addEvents', 
   {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
    body: JSON.stringify(data) 
  })
.then((resp)=>{
if (resp.ok) return resp.json(); else return result;})
.then((json)=>{ 
  result = json;
  return result;
  })
}

function removeSchoolChilds(id) {
 return fetch(`/api/teachers/removeSchoolChilds?id=${id}`, 
   {
    method: 'DELETE',
    headers: {'Authorization': 'Bearer ' + token()}
  })
.then((resp)=>{ 
  return resp;
  })
}

function removeEvents(id) {
 return fetch(`/api/teachers/removeEvents?id=${id}`, 
   {
    method: 'DELETE',
    headers: {'Authorization': 'Bearer ' + token()}
  })
.then((resp)=>{ 
  return resp;
  })
}
