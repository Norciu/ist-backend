export const authHeader =  {
  type: "object",
  properties: {
    authorization: {type: 'string'},
  },
  required: [ "authorization"]
}
