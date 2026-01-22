# Invoify Mobile (iOS)

This is the React Native mobile application for Invoify, built with Expo. It provides a native iOS experience for creating and managing invoices.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- iOS Simulator (via Xcode) or physical iOS device
- Expo CLI (`npm install -g expo-cli`)
- For iOS builds: Xcode (Mac only)

## Setup Instructions

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure API Endpoint

Update the API base URL in `mobile/services/api.ts`:

```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'  // For local development
  : 'https://your-production-url.com/api';  // For production
```

**Important**: For iOS Simulator, use `http://localhost:3000`. For physical devices, use your computer's local IP address (e.g., `http://192.168.1.100:3000`).

### 3. Start the Development Server

```bash
npm start
```

This will:
- Start the Expo development server
- Open the Expo DevTools in your browser
- Allow you to run on iOS Simulator or physical device

### 4. Run on iOS

#### Option A: iOS Simulator (Mac only)

```bash
npm run ios
```

This will automatically open the iOS Simulator and launch the app.

#### Option B: Physical Device

1. Install the Expo Go app from the App Store on your iOS device
2. Scan the QR code shown in the terminal or Expo DevTools
3. The app will load on your device

## Building for Production

### Using Expo Application Services (EAS)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure the project:
```bash
eas build:configure
```

4. Build for iOS:
```bash
eas build --platform ios
```

This will create a build that can be submitted to the App Store.

### Local iOS Build (Mac only)

1. Generate native code:
```bash
npx expo prebuild
```

2. Open in Xcode:
```bash
open ios/invoify.xcworkspace
```

3. Build and run from Xcode

## Project Structure

```
mobile/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── invoice/           # Invoice screens
├── components/            # React Native components
│   ├── form/             # Form components
│   └── invoice/           # Invoice-specific components
├── services/              # API and storage services
│   ├── api.ts            # API client for Next.js backend
│   └── storage.ts        # Local storage (AsyncStorage)
├── shared/                # Shared types and schemas
│   ├── types.ts          # TypeScript types
│   └── schemas.ts        # Zod schemas
└── package.json
```

## Features

- ✅ Create invoices with multi-step wizard
- ✅ Save invoices locally
- ✅ Generate PDFs (via Next.js API)
- ✅ Export invoices (JSON, CSV, XML, XLSX)
- ✅ Send invoices via email
- ✅ Native iOS UI with React Native Paper

## Backend Requirements

The mobile app requires the Next.js backend to be running for:
- PDF generation
- Email sending
- Export functionality

Make sure your Next.js server is running and accessible from the mobile app.

## Troubleshooting

### API Connection Issues

- **iOS Simulator**: Use `http://localhost:3000`
- **Physical Device**: Use your computer's local IP (e.g., `http://192.168.1.100:3000`)
- Ensure both devices are on the same network
- Check that the Next.js server allows connections from your network

### Build Issues

- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Reset Metro bundler: `npm start -- --reset-cache`

## Next Steps

- [ ] Add Android support
- [ ] Implement offline mode
- [ ] Add push notifications
- [ ] Implement biometric authentication
- [ ] Add dark mode support
- [ ] Optimize for iPad

## License

Same as the main Invoify project (MIT License).
