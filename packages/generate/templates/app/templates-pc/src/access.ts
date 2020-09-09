// src/access.ts
export default function (initialState: { currentUser?: any | undefined }) {
  const { currentUser } = initialState;
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
