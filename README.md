This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: It has been published on the Android market. Anyone interested can download and use it from this link [CoinPulse](https://play.google.com/store/apps/details?id=com.cryptoprice).

## Create keystore:

Create .keystore file for debug build. And move to file --> android/app/debug.keystore

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000
```
