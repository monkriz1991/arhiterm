module.exports = {
  apps: [
    {
      name: 'Arhiterm.by',
      exec_mode: 'cluster',
      instances: 'max', //
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
