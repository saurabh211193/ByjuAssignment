export default class Response {
    constructor(data = {}, message = 'Success', status = 200) {
        this.data = data || {};
        this.message = message;
        this.statusCode = status;
    }
}
