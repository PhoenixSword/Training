import {token} from './Auth-header';

export const schoolchildService={
  getEvents,
  save
}

var result = [];

function getEvents() {
 return fetch('/api/schoolchilds/getEvents', {headers: {'Authorization': 'Bearer ' + token()}})
.then((resp)=>{ 
 if (resp.ok) return resp.json(); else return result;})
.then((json)=>{ 
  result = json;
  return result;
  })
}

function save(eventId, score) {
  
    console.log(score);
 return fetch('/api/schoolchilds/saveResults', 
   {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token()
        },
    body: JSON.stringify({eventId, score}) 
  })
.then((resp)=>{ return resp.json() })
.then((json)=>{ 
  result = json;
  return result;
  })
}

