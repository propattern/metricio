const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersions: {
    s3: '2006-03-01',
  },
});

// eslint-disable-next-line import/prefer-default-export
export const environmentHealthCheckRoute = async (req, res) => {
  const environmentName = req.params.env;
  const ebs = new AWS.ElasticBeanstalk();
  const params = {
    AttributeNames: [
      'All',
    ],
    EnvironmentName: environmentName,
  };
  const healthCheck = await ebs.describeEnvironmentHealth(params).promise();
  // const healthCheck =  await ebs.describeInstancesHealth(params).promise()

  res.status(200).send(healthCheck);
};
