import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS } from "@/constants/data";

function LanguageHeaderButton() {
  const { lang, setLang } = useLanguage();
  const colors = useColors();
  const isVI = lang === "vi";
  const btnBg = colors.primary;
  const badgeScale = useSharedValue(1);
  const pressScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    badgeScale.value = withSequence(
      withTiming(1.3, { duration: 100, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) })
    );
    glowOpacity.value = withSequence(
      withTiming(1, { duration: 80, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: 350, easing: Easing.out(Easing.quad) })
    );
  }, [lang]);

  const badgeAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const pressAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
    shadowColor: btnBg,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowOpacity.value * 0.85,
    shadowRadius: 10,
    elevation: glowOpacity.value * 10,
  }));

  function handlePressIn() {
    pressScale.value = withTiming(0.88, { duration: 100, easing: Easing.out(Easing.quad) });
    glowOpacity.value = withTiming(1, { duration: 100, easing: Easing.out(Easing.quad) });
  }

  function handlePressOut() {
    pressScale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) });
    glowOpacity.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.quad) });
  }

  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLang(isVI ? "en" : "vi");
  }

  return (
    <Animated.View style={pressAnimStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.headerLangBtn,
          {
            backgroundColor: btnBg,
            borderColor: colors.primaryForeground,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Switch language. Currently ${isVI ? "Vietnamese" : "English"}`}
        hitSlop={8}
      >
        <Animated.View style={badgeAnimStyle}>
          <Text
            style={[
              styles.headerLangText,
              { color: "#fff" },
            ]}
          >
            {isVI ? "VI" : "EN"}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

function NativeTabLayout() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Icon sf={{ default: "house", selected: "house.fill" }} />
          <Label>{t(STRINGS.home.en, STRINGS.home.vi)}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="services">
          <Icon sf={{ default: "wrench", selected: "wrench.fill" }} />
          <Label>{t(STRINGS.services.en, STRINGS.services.vi)}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="contact">
          <Icon sf={{ default: "phone", selected: "phone.fill" }} />
          <Label>{t(STRINGS.contact.en, STRINGS.contact.vi)}</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
      <View style={[styles.nativeHeaderBtn, { top: insets.top + 10 }]}>
        <LanguageHeaderButton />
      </View>
    </View>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.foreground,
          headerShadowVisible: false,
          headerRight: () => <LanguageHeaderButton />,
          headerRightContainerStyle: { paddingRight: 12 },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.mutedForeground,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: isIOS ? "transparent" : colors.background,
            borderTopWidth: isWeb ? 1 : 0,
            borderTopColor: colors.border,
            elevation: 0,
            ...(isWeb ? { height: 84 } : {}),
          },
          tabBarBackground: () =>
            isIOS ? (
              <BlurView
                intensity={100}
                tint={isDark ? "dark" : "light"}
                style={StyleSheet.absoluteFill}
              />
            ) : isWeb ? (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: colors.background },
                ]}
              />
            ) : null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t(STRINGS.home.en, STRINGS.home.vi),
            tabBarIcon: ({ color }) =>
              isIOS ? (
                <SymbolView name="house" tintColor={color} size={24} />
              ) : (
                <Feather name="home" size={22} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: t(STRINGS.services.en, STRINGS.services.vi),
            tabBarIcon: ({ color }) =>
              isIOS ? (
                <SymbolView name="wrench" tintColor={color} size={24} />
              ) : (
                <Feather name="tool" size={22} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="contact"
          options={{
            title: t(STRINGS.contact.en, STRINGS.contact.vi),
            tabBarIcon: ({ color }) =>
              isIOS ? (
                <SymbolView name="phone" tintColor={color} size={24} />
              ) : (
                <Feather name="phone" size={22} color={color} />
              ),
          }}
        />
      </Tabs>
    </View>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLangBtn: {
    minWidth: 36,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  headerLangText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  nativeHeaderBtn: {
    position: "absolute",
    right: 16,
    zIndex: 100,
  },
});
