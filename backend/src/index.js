'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      const tokenService = strapi.service('admin::api-token');
      const existingTokens = await tokenService.list();
      const existingToken = existingTokens.find((t) => t.name === 'Full Access Token');

      const envPath = path.join(__dirname, '../../frontend/.env.local');
      let currentEnvToken = '';
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/STRAPI_API_TOKEN=(.*)/);
        if (match) {
          currentEnvToken = match[1].trim();
        }
      }

      const isPlaceholder =
        !currentEnvToken ||
        currentEnvToken === 'your_strapi_full_access_api_token_here';

      if (isPlaceholder) {
        if (existingToken) {
          await tokenService.revoke(existingToken.id);
        }

        const newToken = await tokenService.create({
          name: 'Full Access Token',
          description: 'Auto-generated full access token for frontend',
          type: 'full-access',
          lifespan: null,
        });

        const rawToken = newToken.accessKey;
        console.log('🔑 CREATED NEW STRAPI API TOKEN:', rawToken);

        if (fs.existsSync(envPath)) {
          let envContent = fs.readFileSync(envPath, 'utf8');
          envContent = envContent.replace(
            /STRAPI_API_TOKEN=.*/,
            `STRAPI_API_TOKEN=${rawToken}`
          );
          fs.writeFileSync(envPath, envContent, 'utf8');
          console.log('✅ UPDATED frontend/.env.local WITH NEW STRAPI_API_TOKEN!');
        }
      }
    } catch (err) {
      console.error('⚠️ Error in bootstrap API token creation:', err);
    }
  },
};
