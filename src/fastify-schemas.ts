export interface ISignInBody {
  returnTo: string,
  username: string,
  password: string
}

export const signInBodySchema = {
  type: 'object',
  properties: {
    returnTo: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' }
  }
};
