#!/usr/bin/env bash
# =====================================================================
# Samsung Galaxy S26 Horizon Lock Camera - Gradle Build Script
# =====================================================================
set -e

echo "=================================================="
echo "Building Samsung Galaxy S26 Horizon Lock Camera APK"
echo "=================================================="

if [ ! -f "./gradlew" ]; then
    echo "Error: gradlew not found in root directory."
    exit 1
fi

chmod +x gradlew

echo "Running Gradle clean and assembleDebug..."
./gradlew clean assembleDebug --stacktrace

echo "=================================================="
echo "SUCCESS! Debug APK generated at:"
echo "app/build/outputs/apk/debug/app-debug.apk"
echo "=================================================="
