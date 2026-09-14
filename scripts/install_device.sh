#!/usr/bin/env bash
# =====================================================================
# ADB Installation Script for Android Device / Samsung S26
# =====================================================================
set -e

echo "Checking connected Android devices via ADB..."
adb devices

APK_PATH="app/build/outputs/apk/debug/app-debug.apk"

if [ ! -f "$APK_PATH" ]; then
    echo "APK not found at $APK_PATH. Please run scripts/build_apk.sh first."
    exit 1
fi

echo "Installing S26 Horizon Lock Camera APK onto device..."
adb install -r "$APK_PATH"

echo "=================================================="
echo "Installation complete! Open the app on your Android device"
echo "and grant Camera & Audio permissions to start shooting."
echo "=================================================="
