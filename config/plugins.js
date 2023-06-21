


module.exports = ({ env }) => ({
    
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'ipangram.devs@gmail.com',
          defaultReplyTo: 'ipangram.devs@gmail.com',
        },
      },
    },

        upload: {
          provider: 'aws-s3',
          providerOptions: {
            accessKeyId: env('ACCESS_KEY_ID'),
            secretAccessKey: env('SECRET_ACCESS_KEY'),
            region: env('REGION'),
            params: {
              Bucket: env('PHOTOGALLARY'),
            },
          },
        },
        'import-export-entries': {
          enabled: true
        },
  });