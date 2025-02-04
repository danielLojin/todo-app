export function dataResponse<T>(data: T) {
  return { success: true, data };
}

export function errorResponse(message: string) {
  return { success: false, message };
}
