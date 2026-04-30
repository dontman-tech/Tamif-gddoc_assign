# gdgocApp E-commerce App.

A simple Expo Router authentication demo built with React Native and TypeScript.

This project shows how to build a small but realistic mobile app flow with:

- a login screen
- a sign-up screen
- shared authentication state with React Context
- route protection using Expo Router
- a personalized home screen
- logout support

It is intentionally lightweight and tutorial-friendly, making it a good starter project for learning how navigation and auth state work together in a React Native app.

## Overview

The app starts by checking whether a user is currently available in the shared auth context:

- If a user exists, the app redirects to the home screen.
- If no user exists, the app redirects to the login screen.

Users can:

- sign up with `name`, `email`, and `password`
- sign in with `email` and `password`
- see a personalized greeting on the home screen
- log out and return to the login screen

The greeting behavior is:

- If the user signed up, the app uses the entered name.
- If the user only signed in, the app uses the part of the email before `@`.
- If the display name is longer than 5 characters, it is truncated with `...`.

Example:

- `Michael` becomes `Micha...`
- `janedoe@gmail.com` becomes `janed...`

## Important Note

This is a front-end authentication demo only.

There is currently:

- no backend
- no database
- no real password verification
- no token handling
- no persistent login storage

That means authentication state is kept only in memory while the app is running. If the app fully reloads, the signed-in user is lost.

## Features

- Expo Router based navigation
- Shared auth state with React Context
- Basic form validation
- Protected home screen
- Personalized greeting
- Logout flow with confirmation alert
- Gradient-based mobile UI
- TypeScript strict mode

## Tech Stack

- Expo SDK 54
- React 19
- React Native 0.81
- Expo Router
- TypeScript
- `@expo/vector-icons`
- `expo-linear-gradient`
- `react-native-safe-area-context`

## Project Structure

```text
gdgocApp/
|-- app/
|   |-- _layout.tsx
|   |-- index.tsx
|   |-- auth-context.tsx
|   |-- (auth)/
|   |   |-- Login.tsx
|   |   |-- SignUp.tsx
|   |   |-- styles.ts
|   |-- main/
|   |   |-- home.tsx
|-- assets/
|   |-- adaptive-icon.png
|   |-- favicon.png
|   |-- icon.png
|   |-- splash-icon.png
|-- app.json
|-- package.json
|-- tsconfig.json
```

## Route Flow

### `app/_layout.tsx`

Defines the root navigation stack and wraps the whole app with `AuthProvider`.

Why this matters:

- every screen can access auth state
- navigation is centralized
- auth logic stays shared instead of duplicated

### `app/index.tsx`

Acts as the entry redirect.

Behavior:

- redirects to `/main/home` when a user exists
- redirects to `/(auth)/Login` when no user exists

This is the project's route gatekeeper.

### `app/auth-context.tsx`

Stores and exposes the shared auth state.

Main responsibilities:

- stores the current user with `useState`
- provides `signIn`
- provides `signUp`
- provides `logout`
- computes the display name with `getDisplayName`

Display name logic:

- uses `name` if present
- otherwise uses the first part of the email
- truncates names longer than 5 characters

### `app/(auth)/Login.tsx`

Handles user sign-in.

What it does:

- collects `email` and `password`
- validates empty fields
- validates email format
- validates minimum password length
- calls `signIn(email)`
- navigates to the home screen with `router.replace`

### `app/(auth)/SignUp.tsx`

Handles user registration.

What it does:

- collects `name`, `email`, and `password`
- validates empty fields
- validates email format
- validates password length
- calls `signUp(name, email)`
- shows a success alert
- routes to the home screen

### `app/(auth)/styles.ts`

Shared styles used by the authentication screens.

Why it exists:

- keeps auth screen components cleaner
- improves visual consistency
- avoids repeating style objects

### `app/main/home.tsx`

Represents the post-authenticated screen.

What it does:

- checks if a user exists
- redirects to login if not authenticated
- displays the personalized greeting
- provides logout
- renders demo home content such as categories, flash deals, and products

This file mixes auth-aware UI with mock product content to simulate a real app landing screen.

## Authentication Logic

The authentication flow is intentionally simple:

1. The user opens the app.
2. `index.tsx` checks auth state.
3. If no user exists, the app sends the user to login.
4. The user can either log in or navigate to sign up.
5. On successful form validation:
   - `Login.tsx` stores the email
   - `SignUp.tsx` stores the name and email
6. The app navigates to `home.tsx`.
7. The home screen reads the auth context and greets the user.
8. Logging out clears the shared user state and returns to login.

## Validation Rules

The project currently applies simple client-side validation:

- all required fields must be filled
- email must match a basic regex pattern
- password must be at least 6 characters long

These checks are useful for UI flow, but they are not a substitute for server-side authentication.

## UI Notes

The project uses a bright, gradient-based design with:

- rounded inputs
- icon-based form fields
- large auth headings
- gradient call-to-action buttons
- card-based home screen sections

The home screen also includes mock shopping UI content so the auth flow has a believable destination after login.

## Getting Started

### Prerequisites

Make sure you have:

- Node.js installed
- npm installed
- Expo Go on your device, or an emulator/simulator

Recommended:

- Node.js 18 or later

### Installation

```bash
npm install
```

### Start the Development Server

```bash
npm start
```

### Run on Specific Platforms

```bash
npm run android
npm run ios
npm run web
```

## Type Checking

To run TypeScript checks:

```bash
npx tsc --noEmit
```

On some Windows PowerShell setups, script execution may block `npx.ps1`. If that happens, use:

```bash
.\node_modules\.bin\tsc.cmd --noEmit
```

## Scripts

Available scripts from `package.json`:

- `npm start` - start Expo
- `npm run android` - open on Android
- `npm run ios` - open on iOS
- `npm run web` - open in the browser

## Current Limitations

- Auth state is not persisted between app reloads.
- Passwords are not sent to a backend.
- Social buttons are UI placeholders only.
- The home screen uses mock data instead of API data.
- Some UI and business logic are still combined in large screen files.

## Suggested Improvements

If you want to continue developing this project, good next steps are:

- persist auth state with AsyncStorage or SecureStore
- connect login and sign-up to a real backend
- add loading states and inline error messages
- add password visibility toggle
- implement forgot-password flow
- move reusable home screen cards into `components/`
- add tests for auth logic and screen behavior
- clean up any unused folders or starter scaffolding

## Troubleshooting

### App always returns to login

That is expected after a full reload because auth is stored only in memory. Add persistence if you want users to stay signed in.

### Login works with any email/password combination

That is also expected in the current version. This project validates input format, but it does not verify credentials against a backend.

### Icons fail to load

Make sure dependencies are installed:

```bash
npm install
```

The project depends on `@expo/vector-icons`.

## Who This Project Is For

This project is a good fit for:

- beginners learning Expo Router
- developers practicing React Context
- students building a simple auth demo
- tutorial creators explaining mobile navigation and state

## Version

Current app version from `app.json`:

- `1.0.0`

## License

No license file is currently included in this repository. Add one if you plan to distribute or open-source the project publicly.
