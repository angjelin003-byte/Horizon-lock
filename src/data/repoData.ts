import { RepoFile, Commit, Issue } from '../types';

export const INITIAL_FILES: RepoFile[] = [
  {
    name: '.github',
    path: '.github',
    type: 'folder',
    children: [
      {
        name: 'workflows',
        path: '.github/workflows',
        type: 'folder',
        children: [
          {
            name: 'build.yml',
            path: '.github/workflows/build.yml',
            type: 'file',
            size: '1.8 KB',
            content: `name: Build Android Debug APK

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-apk:
    name: Build Debug APK & Run Tests
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Grant execute permission for Gradle wrapper
      run: chmod +x gradlew

    - name: Build Debug APK with Gradle
      run: ./gradlew assembleDebug --stacktrace

    - name: Run Unit Tests
      run: ./gradlew testDebugUnitTest

    - name: Upload Debug APK Artifact
      uses: actions/upload-artifact@v4
      with:
        name: s26-horizon-lock-debug-apk
        path: app/build/outputs/apk/debug/app-debug.apk`
          },
          {
            name: 'android_ci.yml',
            path: '.github/workflows/android_ci.yml',
            type: 'file',
            size: '1.4 KB',
            content: `name: S26 Camera CI/CD Build

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
    - name: Build Debug APK
      run: ./gradlew assembleDebug
    - name: Run Horizon Lock Unit Tests
      run: ./gradlew testDebugUnitTest`
          }
        ]
      }
    ]
  },
  {
    name: 'app',
    path: 'app',
    type: 'folder',
    children: [
      {
        name: 'src',
        path: 'app/src',
        type: 'folder',
        children: [
          {
            name: 'main',
            path: 'app/src/main',
            type: 'folder',
            children: [
              {
                name: 'java',
                path: 'app/src/main/java',
                type: 'folder',
                children: [
                  {
                    name: 'com',
                    path: 'app/src/main/java/com',
                    type: 'folder',
                    children: [
                      {
                        name: 'samsung',
                        path: 'app/src/main/java/com/samsung',
                        type: 'folder',
                        children: [
                          {
                            name: 'camera',
                            path: 'app/src/main/java/com/samsung/camera',
                            type: 'folder',
                            children: [
                              {
                                name: 'horizonlock',
                                path: 'app/src/main/java/com/samsung/camera/horizonlock',
                                type: 'folder',
                                children: [
                                  {
                                    name: 'MainActivity.kt',
                                    path: 'app/src/main/java/com/samsung/camera/horizonlock/MainActivity.kt',
                                    type: 'file',
                                    size: '4.1 KB',
                                    content: `package com.samsung.camera.horizonlock

import android.Manifest
import android.content.ContentValues
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.samsung.camera.horizonlock.databinding.ActivityMainBinding
import com.samsung.camera.horizonlock.engine.HorizonLockEngine
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var horizonEngine: HorizonLockEngine
    
    private val REQUEST_CODE_PERMISSIONS = 10
    private val REQUIRED_PERMISSIONS = arrayOf(
        Manifest.permission.CAMERA,
        Manifest.permission.RECORD_AUDIO,
        Manifest.permission.WRITE_EXTERNAL_STORAGE
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 1. Request camera and storage permissions on startup
        if (allPermissionsGranted()) {
            startCameraAndEngine()
        } else {
            ActivityCompat.requestPermissions(this, REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
        }

        setupUIControls()
    }

    private fun startCameraAndEngine() {
        horizonEngine = HorizonLockEngine(this, binding.viewFinder)
        horizonEngine.initialize(
            mode = HorizonLockEngine.Mode.FULL_360_LOCK,
            targetFps = 60,
            npuAcceleration = true
        )
        Toast.makeText(this, "Galaxy S26 Camera Initialized Successfully", Toast.LENGTH_SHORT).show()
    }

    private fun setupUIControls() {
        // 2. Horizon Lock Toggle Button
        binding.btnToggleLock.setOnClickListener {
            val isLocked = horizonEngine.toggleHorizonLock()
            if (isLocked) {
                binding.btnToggleLock.text = "Horizon Lock: ON (360°)"
                Toast.makeText(this, "Samsung 360° Horizon Lock Engaged", Toast.LENGTH_SHORT).show()
            } else {
                binding.btnToggleLock.text = "Horizon Lock: OFF"
                Toast.makeText(this, "Standard OIS Mode", Toast.LENGTH_SHORT).show()
            }
        }

        // 3. Video Record Button to save video to phone storage
        binding.btnRecordVideo.setOnClickListener {
            if (horizonEngine.isRecording()) {
                horizonEngine.stopVideoRecording { savedUri ->
                    binding.btnRecordVideo.text = "Record Video"
                    Toast.makeText(this, "Video saved to phone gallery: $savedUri", Toast.LENGTH_LONG).show()
                }
            } else {
                horizonEngine.startVideoRecording {
                    binding.btnRecordVideo.text = "Stop & Save Video"
                    Toast.makeText(this, "Recording S26 Horizon Locked Video...", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (allPermissionsGranted()) {
                startCameraAndEngine()
            } else {
                Toast.makeText(this, "Camera and Audio permissions are required to use S26 Horizon Lock.", Toast.LENGTH_LONG).show()
                finish()
            }
        }
    }
}`
                                  },
                                  {
                                    name: 'HorizonLockEngine.kt',
                                    path: 'app/src/main/java/com/samsung/camera/horizonlock/engine/HorizonLockEngine.kt',
                                    type: 'file',
                                    size: '5.8 KB',
                                    content: `package com.samsung.camera.horizonlock.engine

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.util.Log
import android.view.SurfaceView
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class HorizonLockEngine(
    private val context: Context,
    private val surfaceView: SurfaceView
) : SensorEventListener {

    enum class Mode {
        FULL_360_LOCK,
        SUPER_STEADY_PLUS,
        GIMBAL_PAN,
        DYNAMIC_AUTO
    }

    private var cameraProvider: ProcessCameraProvider? = null
    private var camera: Camera? = null
    private var preview: Preview? = null
    private val cameraExecutor: ExecutorService = Executors.newSingleThreadExecutor()
    
    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val rotationVectorSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    
    private var currentMode: Mode = Mode.FULL_360_LOCK
    private var angleThreshold: Int = 360
    private var isLockedEnabled: Boolean = true
    private var npuAccel: Boolean = true

    fun initialize(mode: Mode, targetFps: Int, npuAcceleration: Boolean) {
        this.currentMode = mode
        this.npuAccel = npuAcceleration
        
        // Register sensor listener for real-time S26 gyro fusion
        rotationVectorSensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_GAME)
        }

        initCameraX()
        Log.i("HorizonLockEngine", "Initialized S26 Engine with mode: \${mode}, NPU: \${npuAcceleration}")
    }

    private fun initCameraX() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
        cameraProviderFuture.addListener({
            cameraProvider = cameraProviderFuture.get()
            bindCameraUseCases()
        }, ContextCompat.getMainExecutor(context))
    }

    private fun bindCameraUseCases() {
        val cameraProvider = cameraProvider ?: return
        val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

        preview = Preview.Builder()
            .setTargetAspectRatio(AspectRatio.RATIO_16_9)
            .build()

        try {
            cameraProvider.unbindAll()
            camera = cameraProvider.bindToLifecycle(
                context as LifecycleOwner,
                cameraSelector,
                preview
            )
            // Apply Samsung proprietary Horizon Lock extension if available on S26 Exynos / Snapdragon 8 Gen 5
            applySamsungHardwareStabilization()
        } catch (exc: Exception) {
            Log.e("HorizonLockEngine", "Use case binding failed", exc)
        }
    }

    private fun applySamsungHardwareStabilization() {
        // Vendor extension hook for Galaxy S26 NPU ISP Horizon Leveling
        val cameraControl = camera?.cameraControl
        if (npuAccel) {
            // Enable hardware sensor-shift + electronic roll correction
            Log.d("HorizonLockEngine", "S26 NPU ISP 360° roll compensation engaged.")
        }
    }

    fun toggleHorizonLock() {
        isLockedEnabled = !isLockedEnabled
        // Dynamically adjust crop region and rotation matrix
    }

    fun setAngleThreshold(angle: Int) {
        this.angleThreshold = angle
    }

    fun isLocked(): Boolean = isLockedEnabled

    override fun onSensorChanged(event: SensorEvent) {
        if (event.sensor.type == Sensor.TYPE_ROTATION_VECTOR) {
            val rotationMatrix = FloatArray(9)
            SensorManager.getRotationMatrixFromVector(rotationMatrix, event.values)
            
            val orientation = FloatArray(3)
            SensorManager.getOrientation(rotationMatrix, orientation)
            
            val roll = Math.toDegrees(orientation[2].toDouble()).toFloat()
            val pitch = Math.toDegrees(orientation[1].toDouble()).toFloat()
            
            if (isLockedEnabled) {
                // Apply counter-rotation transform to preview surface
                applyCounterRotationToPreview(-roll, pitch)
            }
        }
    }

    private fun applyCounterRotationToPreview(roll: Float, pitch: Float) {
        // Render matrix transformation for S26 zero-latency leveling
        surfaceView.rotationZ = if (isLockedEnabled) 0f else roll
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Not used
    }
}`
                                  },
                                  {
                                    name: 'SensorFusionService.kt',
                                    path: 'app/src/main/java/com/samsung/camera/horizonlock/sensor/SensorFusionService.kt',
                                    type: 'file',
                                    size: '2.4 KB',
                                    content: `package com.samsung.camera.horizonlock.sensor

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager

class SensorFusionService(context: Context) : SensorEventListener {
    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val gyro = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
    private val accel = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)

    interface OnStabilizationUpdateListener {
        onRollPitchYawUpdated(roll: Float, pitch: Float, yaw: Float)
    }

    private var listener: OnStabilizationUpdateListener? = null

    fun start(listener: OnStabilizationUpdateListener) {
        this.listener = listener
        gyro?.let { sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_FASTEST) }
        accel?.let { sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_FASTEST) }
    }

    fun stop() {
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent) {
        // Complementary filter fusion for S26 sub-millisecond stabilization
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
}`
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'AndroidManifest.xml',
                path: 'app/src/main/AndroidManifest.xml',
                type: 'file',
                size: '1.2 KB',
                content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.samsung.camera.horizonlock">

    <uses-feature android:name="android.hardware.camera.any" />
    <uses-feature android:name="android.hardware.sensor.accelerometer" android:required="true" />
    <uses-feature android:name="android.hardware.sensor.gyroscope" android:required="true" />

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="28" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.S26HorizonLock">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="user">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
              }
            ]
          },
          {
            name: 'build.gradle.kts',
            path: 'app/build.gradle.kts',
            type: 'file',
            size: '2.1 KB',
            content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.samsung.camera.horizonlock"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.samsung.camera.horizonlock"
        minSdk = 26
        targetSdk = 35
        versionCode = 260
        versionName = "2.6.0-S26-ULTRA"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.2.0")
    
    // CameraX core & lifecycle
    val cameraxVersion = "1.4.1"
    implementation("androidx.camera:camera-core:\${cameraxVersion}")
    implementation("androidx.camera:camera-camera2:\${cameraxVersion}")
    implementation("androidx.camera:camera-lifecycle:\${cameraxVersion}")
    implementation("androidx.camera:camera-view:\${cameraxVersion}")
    
    // Samsung S26 NPU Tensor Extension SDK
    implementation("com.samsung.android.sdk:npu-vision:26.0.1")
}`
          }
        ]
      }
    ]
  },
  {
    name: 'build.gradle.kts',
    path: 'build.gradle.kts',
    type: 'file',
    size: '850 B',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("com.android.application") version "8.7.0" apply false
    id("org.jetbrains.kotlin.android") version "2.1.0" apply false
}`
  },
  {
    name: 'README.md',
    path: 'README.md',
    type: 'file',
    size: '3.4 KB',
    content: `# Samsung Galaxy S26 Ultra - Horizon Lock Camera SDK & App

[![Android SDK](https://img.shields.io/badge/Android-15%2F16-green.svg)](https://developer.android.com)
[![CameraX](https://img.shields.io/badge/CameraX-1.4.1-blue.svg)](https://developer.android.com/training/camerax)
[![License](https://img.shields.io/badge/License-Apache%202.0-orange.svg)](LICENSE)
[![Samsung S26 Ready](https://img.shields.io/badge/Samsung-S26%20Ultra%20NPU-purple.svg)](https://samsung.com)

Official reference implementation and configuration repository for the **Samsung Galaxy S26 Horizon Lock Camera** engine. This repository provides developers with production-grade Kotlin code for 360-degree gimbal-like horizon leveling, sub-millisecond gyroscope sensor fusion, and NPU-accelerated video stabilization.

---

## 🌟 Key Features of Galaxy S26 Horizon Lock

1. **360° Full Horizon Lock**: Keep videos and photos perfectly level even when the phone is rotated upside down or tilted at extreme angles up to 360 degrees.
2. **NPU-Powered Sensor Fusion**: Leverages the Snapdragon 8 Gen 5 / Exynos 2600 Neural Processing Unit to eliminate motion jitter with < 3ms glass-to-glass latency.
3. **Multi-Camera Alignment**: Seamless switching between Ultra-Wide (0.6x), Wide (1x), and Telephoto (3x/5x) while maintaining lock.
4. **Action Sports & Night Stabilization**: Enhanced low-light multi-frame horizon correction.

---

## 🚀 Quick Start Guide

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/samsung/galaxy-s26-horizon-lock.git
   \`\`\`
2. Open in **Android Studio Koala / Ladybug**.
3. Sync Gradle and connect a Samsung Galaxy S26 device or emulator supporting CameraX 1.4+.
4. Build and run.

---

## 🛠 Configuration API Example

\`\`\`kotlin
val horizonEngine = HorizonLockEngine(context, surfaceView)
horizonEngine.initialize(
    mode = HorizonLockEngine.Mode.FULL_360_LOCK,
    targetFps = 60,
    npuAcceleration = true
)
\`\`\`
`
  },
  {
    name: 'LICENSE',
    path: 'LICENSE',
    type: 'file',
    size: '1.0 KB',
    content: `Apache License 2.0
Copyright 2026 Samsung Electronics Co., Ltd.
Licensed under the Apache License, Version 2.0.`
  }
];

export const INITIAL_COMMITS: Commit[] = [
  {
    id: 'c1',
    message: 'feat(s26): implement 360-degree NPU horizon lock tensor pipeline',
    author: 'Min-Soo Park',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    timestamp: '2 hours ago',
    hash: 'a9f82b1'
  },
  {
    id: 'c2',
    message: 'perf(gyro): optimize sensor fusion sampling rate to 1000Hz',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
    timestamp: 'Yesterday',
    hash: '7c34e19'
  },
  {
    id: 'c3',
    message: 'fix(camerax): resolve preview rotation mismatch on foldable S26 Z Fold',
    author: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    timestamp: '3 days ago',
    hash: '3f21b90'
  },
  {
    id: 'c4',
    message: 'docs: add architecture diagram and S26 NPU benchmark results',
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    timestamp: '5 days ago',
    hash: '8e12d45'
  }
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 104,
    title: '[S26 Ultra] Horizon lock stutters slightly during rapid 360 rotation in low light',
    author: 'camerageek99',
    labels: ['bug', 'hardware', 's26-ultra'],
    status: 'open',
    commentsCount: 6,
    created: '4 hours ago'
  },
  {
    id: 103,
    title: 'Request: Add custom smoothing curve API for cinematic panning shots',
    author: 'film-maker-pro',
    labels: ['enhancement', 'api'],
    status: 'open',
    commentsCount: 12,
    created: '2 days ago'
  },
  {
    id: 101,
    title: 'Support for Galaxy S26+ dual-telephoto horizon stabilization',
    author: 'dev_jin',
    labels: ['feature', 's26-plus'],
    status: 'closed',
    commentsCount: 9,
    created: '1 week ago'
  }
];
