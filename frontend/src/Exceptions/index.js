export const exception = (error)=>{
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.response && error.response.data.error
    ? error.response.data.error
    : error.message;
    return message;
}