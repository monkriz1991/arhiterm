module.exports = function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'https://arhiterm.by'
  if (env === 'production' && host === 'www.arhiterm.by') {
   
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }
 
  return next()
 }