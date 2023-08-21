export function isEmptyObject(obj:any) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function generateUniqueId() {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'; // Excluding 'O' for clarity
  const idLength = 6;
  let generatedId = '';

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    generatedId += characters[randomIndex];
  }

  return generatedId;
}
