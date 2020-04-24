@app
wonder-w6v

@static
folder build

@http
get /admin
get /github
get /graphql
get /login
post /graphql
post /logout

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
