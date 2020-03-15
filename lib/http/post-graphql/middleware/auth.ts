import { isAuth, getAuthUrl } from '@architect/shared/auth';

export const auth = async req => {
  if (!isAuth(req)) {
    return {
      statusCode: 403,
      json: {
        error: 'not_authorized',
        message: 'please sign in',
        href: getAuthUrl()
      }
    };
  }
};
