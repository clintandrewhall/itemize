export const hello = async (root, args, session) => {
  // if (!session.account) {
  //   throw Error('not authorized');
  // }
  return 'world';
};

export const readAccount = async (root, args, session) => {
  if (!session.account) {
    throw Error('not authorized');
  }

  return session.account;
};

export const mutateAccount = async (root, args, session) => {
  if (!session.account) {
    throw Error('not authorized');
  }

  const copy = session.account;
  delete copy.token;
  return copy;
};
