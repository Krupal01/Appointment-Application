class ApiResponse {
    constructor(statusCode, data = null, message = null) {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
    }
  
    static success(data) {
      return new ApiResponse(200, data);
    }
  
    static created(data, message = "") {
      return new ApiResponse(201, data, message);
    }
  
    static badRequest(message) {
      return new ApiResponse(400, null, message);
    }
  
    static unauthorized(message) {
      return new ApiResponse(401, null, message);
    }
  
    static notFound(message) {
      return new ApiResponse(404, null, message);
    }
  
    static serverError(message) {
      return new ApiResponse(500, null, message);
    }
  }
  
  module.exports = ApiResponse;
  