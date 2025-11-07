/**
 * Validate required environment variables
 */

const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRE',
];

const optionalEnvVars = [
  'STRIPE_PUBLIC_KEY',
  'STRIPE_SECRET_KEY',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET',
  'AWS_REGION',
];

function validateEnv() {
  const missing = [];

  // Check required variables
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach((envVar) => {
      console.error(`   - ${envVar}`);
    });
    process.exit(1);
  }

  // Warn about optional variables
  const missingOptional = [];
  optionalEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingOptional.push(envVar);
    }
  });

  if (missingOptional.length > 0) {
    console.warn('⚠️  Missing optional environment variables:');
    missingOptional.forEach((envVar) => {
      console.warn(`   - ${envVar}`);
    });
  }

  // Validate environment values
  if (!['development', 'production', 'test'].includes(process.env.NODE_ENV)) {
    console.error('❌ NODE_ENV must be one of: development, production, test');
    process.exit(1);
  }

  if (isNaN(process.env.PORT)) {
    console.error('❌ PORT must be a valid number');
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️  JWT_SECRET should be at least 32 characters long');
  }

  console.log('✅ Environment variables validated successfully');
}

module.exports = validateEnv;
