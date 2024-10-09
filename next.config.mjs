/** @type {import('next').NextConfig} */
const nextConfig = {
    // Existing configuration
    images: {
        domains: ['images.unsplash.com'], // Add this line
    },

  };

  module.exports = {
    root: true,
    extends: ['next/core-web-vitals'],
    rules: {
        // Disable all rules by setting them to "off"
        'no-unused-vars': 'off',
        'react/no-unescaped-entities': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': 'off',
        'import/no-anonymous-default-export': 'off',
        // Add any other rules you want to disable
    },
};
  
  export default nextConfig;