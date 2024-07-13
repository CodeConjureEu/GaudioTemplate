# GaudioTemplate

Welcome to the Project Name React Native app! This document will guide you through the setup process so you can start
developing and testing our app quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- Git (for version control)

## Setup

Follow these steps to set up the project on your local machine:

### 1. Install dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### 2. Start the development server

You can start the Expo development server by running:

```bash
npm run start
```

This command will open up a development environment in your default web browser, where you can scan the QR code with
your Expo Go app on your smartphone or use a simulator/emulator.

### 3. Running the app on a device/simulator directly

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

## Testing

### Resolution

The app is designed mainly with the base resolution of 350 x 680. But we should test the following resolution values:

| Dimension | Min | Max |
|-----------|-----|-----|
| Width     | 360 | 430 |
| Height    | 640 | 932 | 

## Current Objective
Business Context:
The Gaudio app offers personalized guides for exploring museums or local cities. We aim to enhance our app with a map feature to guide users through cities, starting with a curated experience in Einsiedeln.

Objective:  
Create a React Native screen that integrates a map, usable across Web, iOS, and Android environments, with specific functionality as detailed below.

Project Requirements:
1.	Map Integration: 
  *  Integrate a map using react-native-maps or react-native-maps-expo or other.
  *	Ensure the map works seamlessly on web, iOS, and Android platforms using the Expo framework.
2. Selectable Coordinates:
* Add markers for the following 8 locations with their respective coordinates:
  * Frauen Brunnen Einsiedeln: 47.1265432, 8.7523298
  * Kloster Einsiedeln: 47.1267771, 8.7523689
  * Wildbienen Paradies: 47.1253739, 8.7519874
  * Aussichtpunkt St. Benedikt Plattform: 47.1251207, 8.7556303
  * Panorama Einsiedeln: 47.1303645, 8.7495532
  * Chärnehus: 47.1262062, 8.7457947
  * Bibliothek Werner Oechslin: 47.1251934, 8.7449378
  * Pumptrack Einsiedeln: 47.1370108, 8.7404847
3.	Feature Implementation:
* “Recommended” Button:
  *	Implement a button labeled “Recommended”.
  *	This button should highlight or show the three nearest coordinates based on the user’s current location.
  *	Ensure that these locations are immediately visible on the map.
* “Guide Me” Button:
  *	Implement a button labeled “Guide Me”.
  *	This button should appear when a location is selected.
  *	Provide navigation assistance (e.g., a path or directions) from the user’s current location to the selected destination.

Starting Point:
* Use the provided React Native Expo Project as the base for development.

Additional Notes:
* Ensure the user interface is clean and user-friendly.
* Consider performance optimizations for smooth functionality across all platforms. 
* Document your code and provide clear instructions on how to run the project.
* Ensure cross-platform compatibility and test the application on all three environments (web, iOS, Android).

Deliverables:
* Source code for the React Native screen with the map and specified features.
* Documentation on setup, running the project, and any configuration steps.

Timeline:
* The task should be completed within 8 hours.

Communication:
* Provide regular updates on progress.
* Inform immediately if any issues arise that may impact the timeline.


