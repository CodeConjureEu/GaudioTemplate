# GaudioTemplate

Welcome to the Project Name React Native app! This document will guide you through the setup process so you can start
developing and testing our app quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- Git (for version control)
- Watchman (for macOS users)

## Setup

Follow these steps to set up the project on your local machine:

### 1. Clone the repository

To get started, clone the project repository to your local machine using Git:

```bash
git https://github.com/CodeConjureEu/GaudioTemplate/tree/dev
cd GaudioTemplate
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### 3. Start the development server

You can start the Expo development server by running:

```bash
npm run start
```

This command will open up a development environment in your default web browser, where you can scan the QR code with
your Expo Go app on your smartphone or use a simulator/emulator.

### 4. Running the app on a device/simulator directly

To run the app on a device or simulator directly, you can use the following commands:

```bash
npm run android
```

To run the app on an iOS simulator (macOS only):

```bash
npm run ios
```

## Setting Up Emulators

To run the app on an emulator, you'll need to set up Android Studio for Android emulation or Xcode for iOS simulation.

### Android Emulator

1. **Install Android Studio**:
   Download and install Android Studio from [Android Developer Website](https://developer.android.com/studio).

2. **Setup the Emulator**:
    - Open Android Studio.
    - Navigate to "Tools > AVD Manager" and select "Create Virtual Device".
    - Choose a device definition and select a system image (recommend using a Play Store enabled image for best
      compatibility).
    - Finish creating the AVD.

3. **Run the Emulator**:
    - Start the AVD you created from the AVD Manager.
    - Once the emulator is running, you can launch your app from the Expo development environment by pressing 'Run on
      Android device/emulator'.

### iOS Simulator (macOS only)

1. **Install Xcode**:
   Download Xcode from the Mac App Store.

2. **Open Simulator**:
    - Open Xcode.
    - Navigate to "Xcode > Developer Tools > Simulator".

3. **Run on the Simulator**:
    - Once the simulator is open, start the app through the Expo development environment by clicking 'Run on iOS
      simulator'.

### Using the Simulator

1. **“Recommended” Button**:
 button labeled “Recommended”.
This button should highlight or show the three nearest coordinates based on the user’s current location.
Ensure that these locations are immediately visible on the map.
2. **“Guide Me” Button**:
 button labeled “Guide Me”.
This button should appear when a location is selected.
Provide navigation assistance (e.g., a path or directions) from the user’s current location to the selected destination.

3. **“Refresh”  Button**:
 button labeled “Refresh”.
This button refresh selected  location.

