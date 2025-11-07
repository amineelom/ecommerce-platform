/**
 * Standardized API response formatter
 */

class ResponseFormatter {
  static success(res, data = {}, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res, message = 'Error', statusCode = 500, errors = {}) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  static paginated(res, data = [], total = 0, page = 1, limit = 10, message = 'Success') {
    const pages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        total,
        pages,
        currentPage: page,
        perPage: limit,
        hasNextPage: page < pages,
        hasPrevPage: page > 1,
      },
      timestamp: new Date().toISOString(),
    });
  }

  static created(res, data = {}, message = 'Resource created successfully') {
    return res.status(201).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static updated(res, data = {}, message = 'Resource updated successfully') {
    return res.status(200).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static deleted(res, message = 'Resource deleted successfully') {
    return res.status(200).json({
      success: true,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static badRequest(res, message = 'Bad Request', errors = {}) {
    return this.error(res, message, 400, errors);
  }

  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = 'Forbidden') {
    return this.error(res, message, 403);
  }

  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404);
  }

  static conflict(res, message = 'Conflict', errors = {}) {
    return this.error(res, message, 409, errors);
  }

  static serverError(res, message = 'Internal Server Error', errors = {}) {
    return this.error(res, message, 500, errors);
  }
}

module.exports = ResponseFormatter;
