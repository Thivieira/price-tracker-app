# 🚀 Crypto Price Tracker App

## 📌 Overview

A **React Native** mobile application built with **Expo**, allowing users to **track cryptocurrency prices, set alerts, and manage their crypto portfolio** with a seamless experience.

## 🔑 Key Features

### 🔐 Authentication & Security

- Phone number verification via OTP
- Secure password enforcement
- PIN-based access control
- JWT authentication with refresh token support

### 📊 Cryptocurrency Tracking

- Live price updates
- Cryptocurrency price conversion
- Bookmark favorite cryptocurrencies
- Powerful search functionality

### 🛠️ User Experience

- Smooth onboarding
- Toast notifications for real-time feedback
- Form validation with **Zod**
- Responsive design across screen sizes

## ⚙️ Tech Stack

- **Frontend**: React Native (Expo)
- **State Management**: React Context API
- **Navigation**: Expo Router
- **Styling**: Styled Components
- **Forms**: React Hook Form + Zod
- **Authentication**: JWT (with refresh tokens)
- **UI Components**: Custom + Expo UI components
- **Animations**: React Native Reanimated

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

```bash

# Required dependencies

Node.js (LTS version)
npm or yarn
Expo CLI
```

### 📥 Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd price-tracker-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_API_URL=your_api_url
   ```

### ▶️ Running the App

Start with default settings:

```bash
npm start
```

Start with tunnel for external access:

```bash
npm run start:tunnel
```

Run on specific platforms:

```bash
npm run android
npm run ios
npm run web
```

## 🧪 Testing

Run tests using:

```bash
npm test
```

## 📂 Project Structure

### 🏗 Root Layout Configuration

```tsx
// app/layout.tsx
export default function RootLayout() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <CurrencyProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/_ Stack screens configuration _/}
          </Stack>
          <Toast config={toastConfig} />
        </CurrencyProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}
```

### 🛠 TypeScript Configuration

```json
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/": ["./"]
    }
  }
}
```

## 📦 Build & Deployment

The app uses **EAS (Expo Application Services)** for building and deployment.

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "autoIncrement": true
    }
  }
}
```

## ✅ Best Practices

### 🔹 Type Safety

- Strict TypeScript enforcement
- Strongly-typed components and functions

### 🔹 State Management

- Context-based global state
- Well-structured provider hierarchy

### 🔹 Security

- Secure authentication flow
- PIN-based app lock
- Phone verification for account security

### 🔹 Performance

- Optimized rendering
- Lazy loading & code splitting
- Efficient state updates

### 🔹 Code Quality

- Modular component structure
- Reusable hooks
- Clean and consistent **styled-components**

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to your branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request
