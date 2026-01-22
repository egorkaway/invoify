# iOS Mobile App Setup Guide

This guide will help you set up and run the Invoify iOS mobile app.

## Quick Start

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure API Endpoint

Edit `mobile/services/api.ts` and update the `API_BASE_URL`:

- **For iOS Simulator**: Use `http://localhost:3000/api`
- **For Physical Device**: Use your computer's local IP (e.g., `http://192.168.1.100:3000/api`)

To find your local IP:
- Mac: `ifconfig | grep "inet " | grep -v 127.0.0.1`
- Windows: `ipconfig`
- Linux: `hostname -I`

### 3. Start Next.js Backend

Make sure your Next.js backend is running:

```bash
# In the root directory
npm run dev
```

The backend should be accessible at `http://localhost:3000`

### 4. Start Expo Development Server

```bash
cd mobile
npm start
```

### 5. Run on iOS

#### Option A: iOS Simulator (Mac only)

```bash
npm run ios
```

This will:
- Open iOS Simulator
- Install and launch the app
- Connect to Metro bundler

#### Option B: Physical iOS Device

1. Install **Expo Go** from the App Store
2. Scan the QR code from the terminal or Expo DevTools
3. The app will load on your device

**Important**: Make sure your phone and computer are on the same Wi-Fi network.

## Troubleshooting

### "Cannot connect to API" Error

- **Simulator**: Ensure `API_BASE_URL` is set to `http://localhost:3000/api`
- **Physical Device**: 
  - Use your computer's local IP address
  - Ensure both devices are on the same network
  - Check that your firewall allows connections on port 3000
  - Try accessing `http://YOUR_IP:3000` from your phone's browser

### Metro Bundler Issues

```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Build Errors

```bash
# Clean install
rm -rf node_modules
npm install
```

### Expo Go Not Loading

- Check your network connection
- Ensure Expo CLI is up to date: `npm install -g expo-cli`
- Try restarting the Expo dev server

## Development Tips

1. **Hot Reload**: Changes to your code will automatically reload in the app
2. **Debugging**: Shake your device or press `Cmd+D` in simulator to open developer menu
3. **Logs**: Check Metro bundler terminal for console logs
4. **Network**: Use React Native Debugger or Flipper for network inspection

## Building for Production

See the main README.md for production build instructions using EAS Build.

## Next Steps

- [ ] Test all invoice creation flows
- [ ] Test PDF generation
- [ ] Test email sending
- [ ] Test export functionality
- [ ] Add error handling and loading states
- [ ] Implement offline mode
- [ ] Add push notifications
