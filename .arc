@app
wonder-w6v

@static

@http
get /
get /admin
get /graphql
get /login
post /graphql
post /logout

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
