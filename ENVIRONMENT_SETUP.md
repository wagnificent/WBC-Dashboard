# Environment Setup Guide for WBC Dashboard

This guide explains how to set up your environment variables to run the Wooden Bat Classic Dashboard application securely.

## 🚨 Security Notice

**NEVER commit your actual API keys or sensitive credentials to version control!** This repository now uses environment variables to keep your credentials secure.

## 📋 Setup Instructions

### 1. Create your `.env` file

Copy the `.env.example` file to `.env`:

```bash
copy .env.example .env
```

### 2. Get your API credentials

#### Airtable Credentials
1. Go to [Airtable Account Page](https://airtable.com/account)
2. Scroll down to the "API" section
3. Click "Generate API key"
4. Copy your API key and Base ID

#### Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Scroll down to "Your apps" section
5. Copy the Firebase configuration object

### 3. Configure your `.env` file

Edit the `.env` file and replace the placeholder values with your actual credentials:

```env
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=G-your-measurement-id

# Development Mode
DEVELOPMENT_MODE=true
DEBUG_MODE=false
```

### 4. Using environment variables

#### For Node.js applications:
The environment variables will be automatically loaded when you run the Node.js scripts.

#### For browser applications:
You have several options:

1. **Use a backend proxy**: Create a simple Node.js server that loads environment variables and serves them to your frontend
2. **Use a build tool**: Tools like Webpack with `dotenv-webpack` can inject environment variables during build
3. **Manual configuration**: For development, you can temporarily add your credentials to the HTML file (but remove them before committing!)

### 5. Running the application

#### Node.js scripts:
```bash
# Set environment variables and run
node airtable-api-manager.js setup
```

#### Web applications:
```bash
# For development, you can use a simple HTTP server
npx serve
```

## 🔒 Security Best Practices

1. **Never commit `.env` files**: They are already in `.gitignore`
2. **Use different credentials for different environments**: Development vs Production
3. **Rotate your API keys regularly**: Especially if you suspect they may have been compromised
4. **Use restricted API keys**: Limit the permissions of your API keys to only what's necessary
5. **Keep your dependencies updated**: Regularly update your packages to get security patches

## 🛠️ Troubleshooting

### "API key not found" errors
- Make sure your `.env` file is in the root directory
- Check that you've copied the credentials correctly
- Restart your development server after making changes

### Permission errors
- Verify your API keys have the correct permissions
- Check your Airtable base sharing settings
- Ensure your Firebase rules allow the operations you're trying to perform

### CORS issues
- For Airtable, you may need to configure CORS settings
- For Firebase, make sure your domain is authorized in the Firebase console

## 📚 Additional Resources

- [Airtable API Documentation](https://airtable.com/api)
- [Firebase Documentation](https://firebase.google.com/docs)
- [12 Factor App Configuration](https://12factor.net/config)
