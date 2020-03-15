import data from '@begin/data';
import xss from 'xss';

export const account = async (root, args, session) => {
  if (!session.account) throw Error('not authorized');
  let copy = session.account;
  delete copy.token;
  return copy;
};

export const draft = async (root, args, session) => {
  return await data.get({
    table: 'drafts',
    ...args
  });
};

export const drafts = async (root, args, session) => {
  return await data.get({
    table: 'drafts'
  });
};

export const save = async (root, draft, session) => {
  if (!session.account) throw Error('not authorized');
  let required = ['title', 'body'];
  for (let param of required) {
    if (!draft[param]) throw ReferenceError(`missing param ${param}`);
    if (draft[param] && draft[param].length < 4)
      throw RangeError(`${param} must be four or more characters`);
  }
  draft.author = session.account.name;
  draft.avatar = session.account.avatar;
  draft.title = xss.filterXSS(draft.title);
  draft.body = xss.filterXSS(draft.body);
  return await data.set({
    table: 'drafts',
    ...draft
  });
};

export const destroy = async (root, draft, session) => {
  if (!session.account) throw Error('not authorized');
  return await data.destroy({
    table: 'drafts',
    ...draft
  });
};
