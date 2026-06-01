import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/context/LanguageContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const langReadyRef = useRef(false);
  const fontsReadyRef = useRef(false);

  const maybeHideSplash = useCallback(() => {
    if (langReadyRef.current && fontsReadyRef.current) {
      SplashScreen.hideAsync();
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      fontsReadyRef.current = true;
      maybeHideSplash();
    }
  }, [fontsLoaded, fontError, maybeHideSplash]);

  const handleLangReady = useCallback(() => {
    langReadyRef.current = true;
    maybeHideSplash();
  }, [maybeHideSplash]);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <KeyboardProvider>
              <LanguageProvider onReady={handleLangReady}>
                <RootLayoutNav />
              </LanguageProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
