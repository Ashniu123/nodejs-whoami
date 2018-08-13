module.exports = {
  apps : [{
    name      : 'WHOAMI',
    script    : './server.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : 'ec2-34-230-31-235.compute-1.amazonaws.com',
      key  : '~/.ssh/whoami.pem',
      ref  : 'origin/master',
      repo : 'git@github.com:Ashniu123/nodejs-whoami.git',
      path : '/home/ubuntu/nodejs-whoami',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
