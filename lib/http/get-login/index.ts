import arc from '@architect/functions';
import { tradeCodeForUser } from '../../common/github/code';

const login = async request => {
  if (request.query.code) {
    let account = await tradeCodeForUser(request);

    return {
      session: { account },
      location: '/admin',
    };
  } else {
    return {
      location: '/?authorized=false',
    };
  }
};

export const handler = arc.http.async(login);
