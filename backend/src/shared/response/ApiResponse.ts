export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T;

  private constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  public static success<T>(data: T, message = "Request completed successfully") {
    return new ApiResponse<T>(true, message, data);
  }
}
