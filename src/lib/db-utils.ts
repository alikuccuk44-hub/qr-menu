/**
 * Runs a promise with a timeout. 
 * If the promise doesn't resolve within the timeout, it throws an error.
 */
export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 1000): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('DB_TIMEOUT'));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result as T;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}
