const keys = ['responseBody', 'requestBody'];
const blacklist = ['email', 'password', 'job']
const maskDataConversion = maskJson(blacklist);

function filterJson(requests, isEnableMask) {
    //fetch XHR Request 
     if (!isEnableMask || !requests) {
        return requests;
    } else {
            for (let key of Object.keys(requests)) {
                if (_.includes(keys, key)) {
                    if (key === "requestBody") {
                         const obj = JSON.parse(requests[key]);
                        requests[key] = maskDataConversion(obj);
                    }
                    if (key === "responseBody") {
                        let obj = requests[key];
                        obj = obj !== "" ? JSON.parse(obj) : "";
                        requests[key] = maskDataConversion(obj);
                    }
                }
                // req[key] = value
            }
      
        console.log('....MASK_XHR_REQUESTS.', requests);
        return requests;
    }
}

//TODO: Dont delete we have to re-wrute in future
/*function filterArrayJson(requests, isEnableMask) {
    //fetch XHR Request 
    const XHR_REQUESTS = requests.filter(obj => obj.type === 'XHR');
    if (!isEnableMask) {
        return XHR_REQUESTS;
    } else {
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
        console.log('....MASK_XHR_REQUESTS.', MASK_XHR_REQUESTS);
        return MASK_XHR_REQUESTS;
    }
}*/