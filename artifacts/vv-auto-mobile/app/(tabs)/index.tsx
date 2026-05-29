import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLanguage } from "@/context/LanguageContext";
import { useColors } from "@/hooks/useColors";
import { LOCATIONS, STRINGS } from "@/constants/data";

function QuickAction({
  icon,
  label,
  onPress,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  color: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.quickAction, { opacity: pressed ? 0.75 : 1 }]}
      testID={`quick-action-${label}`}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>{icon}</View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

function LocationCard({
  locationKey,
}: {
  locationKey: "dallas" | "garland";
}) {
  const colors = useColors();
  const { t } = useLanguage();
  const loc = LOCATIONS[locationKey];

  const call = (phone: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${phone}`);
  };

  const directions = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(loc.mapUrl);
  };

  return (
    <View style={[styles.locationCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.locationHeader, { backgroundColor: loc.color }]}>
        <Text style={styles.locationTag}>{locationKey === "dallas" ? t(loc.tagEn, loc.tagVi) : t(loc.tagEn, loc.tagVi)}</Text>
        <Text style={styles.locationName}>{t(loc.name.en, loc.name.vi)}</Text>
      </View>

      <View style={styles.locationBody}>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color={colors.mutedForeground} />
          <Text style={[styles.locationText, { color: colors.foreground }]}>{loc.address}</Text>
        </View>

        <View style={styles.locationRow}>
          <Feather name="clock" size={14} color={colors.mutedForeground} />
          <Text style={[styles.locationText, { color: colors.mutedForeground }]}>
            {t(loc.hours.en, loc.hours.vi)}
          </Text>
        </View>

        <View style={styles.locationActions}>
          <Pressable
            onPress={() => call(loc.phone1.number)}
            style={({ pressed }) => [
              styles.callBtn,
              { backgroundColor: loc.color, opacity: pressed ? 0.8 : 1 },
            ]}
            testID={`call-${locationKey}`}
          >
            <Feather name="phone" size={14} color="#fff" />
            <Text style={styles.callBtnText}>{loc.phone1.display}</Text>
          </Pressable>

          <Pressable
            onPress={directions}
            style={({ pressed }) => [
              styles.dirBtn,
              { borderColor: loc.color, opacity: pressed ? 0.75 : 1 },
            ]}
            testID={`directions-${locationKey}`}
          >
            <Feather name="navigation" size={14} color={loc.color} />
            <Text style={[styles.dirBtnText, { color: loc.color }]}>
              {t(STRINGS.getDirections.en, STRINGS.getDirections.vi)}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, lang, setLang } = useLanguage();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 34 + 84 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.navy, colors.navyDark ?? "#2e4a6a"]}
        style={[styles.hero, { paddingTop: topPad + 16 }]}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.logoArea}>
            <View style={[styles.logoIcon, { backgroundColor: colors.red }]}>
              <Feather name="tool" size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.logoTextBold}>VV AUTO</Text>
              <Text style={styles.logoTextLight}>REPAIR</Text>
            </View>
          </View>

          <Pressable
            onPress={() => setLang(lang === "en" ? "vi" : "en")}
            style={({ pressed }) => [
              styles.langToggle,
              { opacity: pressed ? 0.75 : 1 },
            ]}
            testID="language-toggle"
          >
            <Text style={styles.langToggleText}>{lang === "en" ? "🇻🇳 VI" : "🇺🇸 EN"}</Text>
          </Pressable>
        </View>

        <Text style={styles.tagline}>{t(STRINGS.tagline.en, STRINGS.tagline.vi)}</Text>
        <Text style={styles.subtitle}>{t(STRINGS.subtitle.en, STRINGS.subtitle.vi)}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#f5c842" />
          <Ionicons name="star" size={14} color="#f5c842" />
          <Ionicons name="star" size={14} color="#f5c842" />
          <Ionicons name="star" size={14} color="#f5c842" />
          <Ionicons name="star-half" size={14} color="#f5c842" />
          <Text style={styles.ratingText}>{t(STRINGS.rating.en, STRINGS.rating.vi)}</Text>
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Feather name="users" size={11} color="rgba(255,255,255,0.8)" />
            <Text style={styles.badgeText}>{t(STRINGS.familyOwned.en, STRINGS.familyOwned.vi)}</Text>
          </View>
          <View style={styles.badge}>
            <Feather name="shield" size={11} color="rgba(255,255,255,0.8)" />
            <Text style={styles.badgeText}>{t(STRINGS.insured.en, STRINGS.insured.vi)}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          {t("Our Locations", "Các Chi Nhánh")}
        </Text>
        <LocationCard locationKey="dallas" />
        <LocationCard locationKey="garland" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoTextBold: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
    lineHeight: 20,
  },
  logoTextLight: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 3,
  },
  langToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  langToggleText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  tagline: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    lineHeight: 32,
    marginBottom: 6,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 12,
  },
  ratingText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    marginLeft: 4,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  badgeText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  section: {
    padding: 20,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  locationCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  locationHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationTag: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  locationName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  locationBody: {
    padding: 16,
    gap: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  locationActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  callBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  callBtnText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  dirBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  dirBtnText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  quickAction: {
    alignItems: "center",
    gap: 6,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: "#657080",
  },
});
