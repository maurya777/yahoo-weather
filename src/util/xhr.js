
class XHR {
  send({method, url}) {
    if (!url) {
      throw new Error('XHR needs a url');
    }
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open(method || 'GET', url);
      request.responseType = 'json';
      request.onload = function() {
        if (request.status === 200) {
          resolve(typeof request.response === 'object' ? request.response : JSON.parse(request.response));
        } else {
          reject(Error('XHR Failed with error code:' + request.statusText));
        }
      };
      request.onerror = function() {
        reject(Error('There was a network error.'));
      };
      request.send();
    });
  }
}

export default XHR;
