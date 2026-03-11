'use strict';

const cdk = require('aws-cdk-lib');

class InfraStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Add your infrastructure resources here.
  }
}

module.exports = { InfraStack };
