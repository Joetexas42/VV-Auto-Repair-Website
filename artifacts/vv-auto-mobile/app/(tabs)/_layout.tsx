import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS } from "@/constants/data";

const TAB_BAR_HEIGHT = 56;

function LanguageBadge() {
  const { lang, setLang } = useLanguage();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isVI = lang === "vi";

  const badgeBottom = insets.bottom + TAB_BAR_HEIGHT / 2 - 12;

  return (
    <Pressable
      onPress={() => setLang(isVI ? "en" : "vi")}
      style={({ pressed }) => [
        styles.badge,
        {
          bottom: badgeBottom,
          backgroundColor: isVI ? colors.primary : colors.card,
          borderColor: isVI ? colors.primary : colors.border,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Switch language. Currently ${isVI ? "Vietnamese" : "English"}`}
      hitSlop={8}
    >
      <Text
        style={[
          styles.badgeText,
          { color: isVI ? "#fff" : colors.mutedForeground },
        ]}
      >
        {isVI ? "VI" : "EN"}
      </Text>
    </Pressable>
  );
}

function NativeTabLayout() {
  const { t } = useLanguage();
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
      <LanguageBadge />
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
          headerShown: false,
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
      <LanguageBadge />
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
  badge: {
    position: "absolute",
    right: 12,
    minWidth: 36,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
