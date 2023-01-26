export interface ISignInBody {
  username: string,
  password: string
}

export const signInBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  }
};
