# Invoify iOS Mobile App

This document provides an overview of the iOS mobile application for Invoify.

## Overview

The mobile app is built with **React Native** using **Expo**, providing a native iOS experience for creating and managing invoices. It communicates with the Next.js backend API for server-side operations like PDF generation and email sending.

## Architecture

### Technology Stack

- **React Native** - Mobile framework
- **Expo** - Development platform and tooling
- **Expo Router** - File-based routing
- **React Native Paper** - Material Design UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation (shared with web app)
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client for API calls

### Project Structure

```
mobile/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with providers
│   ├── index.tsx                # Home screen
│   └── invoice/
│       ├── create.tsx           # Invoice creation wizard
│       └── [id].tsx             # Invoice detail/view screen
├── components/
│   ├── form/                    # Reusable form components
│   │   ├── FormInput.tsx
│   │   └── DatePickerField.tsx
│   └── invoice/
│       ├── InvoiceFormWizard.tsx # Multi-step form wizard
│       └── sections/            # Form sections
│           ├── BillFromSection.tsx
│           ├── BillToSection.tsx
│           ├── InvoiceDetailsSection.tsx
│           ├── ItemsSection.tsx
│           ├── PaymentInformationSection.tsx
│           └── InvoiceSummarySection.tsx
├── services/
│   ├── api.ts                   # API client for Next.js backend
│   └── storage.ts               # Local storage service
├── shared/
│   ├── types.ts                # Shared TypeScript types
│   └── schemas.ts              # Shared Zod schemas
└── package.json
```

## Features

### ✅ Implemented

- Multi-step invoice creation wizard
- Form validation using Zod schemas
- Local invoice storage (AsyncStorage)
- PDF generation (via API)
- Invoice export (JSON, CSV, XML, XLSX)
- Email sending (via API)
- Native iOS UI with React Native Paper

### 🚧 To Be Implemented

- Native date picker (currently using text input)
- Signature capture/upload
- Invoice templates selection
- Tax and discount calculations
- Currency selector
- Language/i18n support
- Offline mode
- Push notifications
- Dark mode

## Setup Instructions

See `mobile/SETUP.md` for detailed setup instructions.

### Quick Start

```bash
# 1. Install dependencies
cd mobile
npm install

# 2. Configure API endpoint in mobile/services/api.ts
# For simulator: http://localhost:3000/api
# For device: http://YOUR_IP:3000/api

# 3. Start Next.js backend (in root directory)
npm run dev

# 4. Start Expo dev server
cd mobile
npm start

# 5. Run on iOS
npm run ios  # For simulator
# Or scan QR code with Expo Go app on physical device
```

## API Integration

The mobile app communicates with the Next.js backend through REST APIs:

### Endpoints

- `POST /api/invoice/generate` - Generate PDF from invoice data
- `POST /api/invoice/export` - Export invoice in various formats
- `POST /api/invoice/send` - Send invoice via email

### Configuration

Update `mobile/services/api.ts` to set the correct API base URL:

```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'  // Development
  : 'https://your-production-url.com/api';  // Production
```

## Data Flow

1. **Invoice Creation**: User fills form → Validated with Zod → Saved to AsyncStorage
2. **PDF Generation**: Invoice data → API call → PDF returned → Saved to device → Shared
3. **Export**: Invoice data → API call → File returned → Saved to device → Shared
4. **Email**: Invoice data + recipient → API call → Email sent via backend

## Building for Production

### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build for iOS
eas build --platform ios
```

### Local Build (Mac only)

```bash
# Generate native code
npx expo prebuild

# Open in Xcode
open ios/invoify.xcworkspace

# Build and archive from Xcode
```

## Development Notes

### Shared Code

Types and schemas are shared between web and mobile:
- `types.ts` - Re-exported from root `types.ts`
- `schemas.ts` - Re-exported from `lib/schemas.ts`

This ensures consistency between web and mobile data structures.

### Form Validation

Uses the same Zod schemas as the web app, ensuring consistent validation rules across platforms.

### State Management

- **Form State**: React Hook Form
- **Local Storage**: AsyncStorage (invoices)
- **API State**: Component-level state with loading/error handling

## Testing

### Manual Testing Checklist

- [ ] Create new invoice
- [ ] Edit invoice fields
- [ ] Add/remove items
- [ ] Save invoice locally
- [ ] Load saved invoices
- [ ] Generate PDF
- [ ] Export in different formats
- [ ] Send email
- [ ] Form validation
- [ ] Navigation between screens

## Known Issues

1. Date picker uses text input instead of native picker (needs `@react-native-community/datetimepicker`)
2. Signature functionality not yet implemented
3. Tax/discount calculations need to be added
4. Currency selector not implemented
5. i18n support not yet added

## Future Enhancements

- [ ] Android support
- [ ] Offline mode with sync
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Cloud sync
- [ ] Invoice templates
- [ ] Recurring invoices
- [ ] Client management
- [ ] Analytics and reporting

## Support

For issues or questions:
1. Check `mobile/SETUP.md` for setup issues
2. Check `mobile/README.md` for detailed documentation
3. Review Expo documentation: https://docs.expo.dev
4. Review React Native Paper: https://callstack.github.io/react-native-paper

## License

Same as the main Invoify project (MIT License).
