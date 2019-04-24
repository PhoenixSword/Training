export const service={
  send
}
function send(file1, file2) {
	if(( typeof file1 === 'undefined' ) || ( typeof file2 === 'undefined' )) return;

	var data = new FormData();

	data.append( "file1", file1 );
	data.append( "file2", file2 );

	  const requestOptions = {
        method: 'POST',
        body: data
    };
    return fetch(`/api/SampleData/Test/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
	      return data;
	  });
	}