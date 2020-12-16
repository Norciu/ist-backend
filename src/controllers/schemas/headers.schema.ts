export const authHeaders =  {
  type: "object",
  properties: {
    "csrf-token": {type: 'string'},
    authorization: {type: 'string'},
  },
  required: ["csrf-token", "jwt-token"]
}
