export async function safe<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    if (error instanceof Error) {
      return [error, null];
    }
    return [new Error(String(error)), null];
  }
}
