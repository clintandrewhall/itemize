import arc from '@architect/functions';
import { github } from '../../auth';

const login = async request => {
  if (request.query.code) {
    let account = await github(request);

    return {
      session: { account },
      location: '/admin'
    };
  } else {
    return {
      location: '/?authorized=false'
    };
  }
};

export const handler = arc.http.async(login);
