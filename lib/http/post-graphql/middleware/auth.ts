import { isAuth, getAuthUrl } from '../../../common/auth';

export const auth = async req => {
  if (!isAuth(req)) {
    return {
      statusCode: 403,
      json: {
        error: 'not_authorized',
        message: 'please sign in',
        href: getAuthUrl(),
      },
    };
  }
};
