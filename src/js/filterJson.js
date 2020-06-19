const keys = ['request', 'response'];
const blacklist = ['email', 'password', 'job']
const maskData = maskJson(blacklist);

function filterJson(requests) {
    //fetch XHR Request 
    const XHR_REQUESTS = requests.filter(obj => obj.type === 'XHR');
    const MASK_XHR_REQUESTS = [];
    XHR_REQUESTS.forEach((req, index) => {
        for (let key of Object.keys(req)) {
            if (_.includes(keys, key)) {

                if (key === "request" && req[key].hasPostData) {
                    console.log('...TYPEOF postData', typeof req[key].postData)
                    const obj = JSON.parse(req[key].postData);
                    req[key].postData = maskData(obj);
                }
                if (key === "response" && req[key].body) {
                    let obj = req[key].body;
                    obj = JSON.parse(obj.body);
                    req[key].body = { body: maskData(obj) };
                }
            }
            // req[key] = value
        }
        MASK_XHR_REQUESTS[index] = req;
    });
    console.log('....MASK_XHR_REQUESTS.',MASK_XHR_REQUESTS);
    return MASK_XHR_REQUESTS;
}