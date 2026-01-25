// File runs once when the server starts

export async function register() {
  // Only run on the server
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureAllDataFiles } = await import('./src/lib/ensureDataFiles.js');
    await ensureAllDataFiles();
    console.log('Data files initialized.');
  }
}
