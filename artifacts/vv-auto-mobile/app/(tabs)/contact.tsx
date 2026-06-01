import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LOCATIONS, STRINGS } from "@/constants/data";
import { useLanguage } from "@/context/LanguageContext";
import { useColors } from "@/hooks/useColors";
import { useLocationConfig } from "@/hooks/useLocationConfig";

function PhoneRow({
  phone,
  label,
  color,
}: {
  phone: { number: string; display: string; label: { en: string; vi: string } };
  label?: string;
  color: string;
}) {
  const colors = useColors();
  const { t } = useLanguage();

  const call = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${phone.number}`);
  };

  return (
    <Pressable
      onPress={call}
      style={({ pressed }) => [
        styles.phoneRow,
        { backgroundColor: colors.muted, opacity: pressed ? 0.8 : 1 },
      ]}
      testID={`call-${phone.number}`}
    >
      <View style={[styles.phoneIconWrap, { backgroundColor: color }]}>
        <Feather name="phone" size={16} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.phoneLabel, { color: colors.mutedForeground }]}>
          {t(phone.label.en, phone.label.vi)}
        </Text>
        <Text style={[styles.phoneNumber, { color: colors.foreground }]}>{phone.display}</Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </Pressable>
  );
}

function LocationContactCard({ locationKey }: { locationKey: "dallas" | "garland" }) {
  const colors = useColors();
  const { t } = useLanguage();
  const loc = LOCATIONS[locationKey];
  const { data: locationConfig } = useLocationConfig();
  const mapsUrl = locationConfig?.[locationKey].mapsUrl ?? "";

  const openMaps = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(mapsUrl);
  };

  const openEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(`mailto:${loc.email}`);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <LinearGradient colors={[loc.color, loc.color + "dd"]} style={styles.cardHeader}>
        <Text style={styles.cardTag}>{t(loc.tagEn, loc.tagVi)}</Text>
        <Text style={styles.cardTitle}>{t(loc.name.en, loc.name.vi)}</Text>
      </LinearGradient>

      <View style={styles.cardBody}>
        <Pressable
          onPress={openMaps}
          style={({ pressed }) => [
            styles.infoRow,
            { borderBottomColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
          testID={`maps-${locationKey}`}
        >
          <View style={[styles.infoIcon, { backgroundColor: colors.muted }]}>
            <Feather name="map-pin" size={16} color={loc.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
              {t("Address", "Địa Chỉ")}
            </Text>
            <Text style={[styles.infoValue, { color: colors.foreground }]}>{loc.address}</Text>
          </View>
          <Feather name="external-link" size={14} color={colors.mutedForeground} />
        </Pressable>

        <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
          <View style={[styles.infoIcon, { backgroundColor: colors.muted }]}>
            <Feather name="clock" size={16} color={loc.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
              {t(STRINGS.hours.en, STRINGS.hours.vi)}
            </Text>
            <Text style={[styles.infoValue, { color: colors.foreground }]}>
              {t(loc.hours.en, loc.hours.vi)}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={openEmail}
          style={({ pressed }) => [
            styles.infoRow,
            { borderBottomColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
          testID={`email-${locationKey}`}
        >
          <View style={[styles.infoIcon, { backgroundColor: colors.muted }]}>
            <Feather name="mail" size={16} color={loc.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
              {t(STRINGS.email.en, STRINGS.email.vi)}
            </Text>
            <Text style={[styles.infoValue, { color: loc.color }]}>{loc.email}</Text>
          </View>
          <Feather name="chevron-right" size={14} color={colors.mutedForeground} />
        </Pressable>

        <View style={styles.phones}>
          <Text style={[styles.phonesTitle, { color: colors.mutedForeground }]}>
            {t("Phone Numbers", "Số Điện Thoại")}
          </Text>
          <PhoneRow phone={loc.phone1} color={loc.color} />
          <PhoneRow phone={loc.phone2} color={loc.color} />
        </View>

        <Pressable
          onPress={openMaps}
          style={({ pressed }) => [
            styles.directionsBtn,
            { backgroundColor: loc.color, opacity: pressed ? 0.85 : 1 },
          ]}
          testID={`directions-btn-${locationKey}`}
        >
          <Feather name="navigation" size={16} color="#fff" />
          <Text style={styles.directionsBtnText}>
            {t(STRINGS.getDirections.en, STRINGS.getDirections.vi)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, lang, setLang } = useLanguage();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: topPad + 8,
        paddingBottom: Platform.OS === "web" ? 34 + 84 : 100,
        padding: 16,
        gap: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>
            {t(STRINGS.contact.en, STRINGS.contact.vi)}
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
            {t("Tap any number to call directly", "Nhấn vào số để gọi ngay")}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setLang(lang === "en" ? "vi" : "en");
          }}
          style={({ pressed }) => [
            styles.langToggle,
            { backgroundColor: colors.navy, opacity: pressed ? 0.75 : 1 },
          ]}
          testID="language-toggle"
        >
          <Text style={styles.langToggleText}>{lang === "en" ? "🇻🇳 VI" : "🇺🇸 EN"}</Text>
        </Pressable>
      </View>

      <LocationContactCard locationKey="dallas" />
      <LocationContactCard locationKey="garland" />

      <View style={[styles.disclaimer, { backgroundColor: colors.muted, borderColor: colors.border }]}>
        <Feather name="info" size={14} color={colors.mutedForeground} />
        <Text style={[styles.disclaimerText, { color: colors.mutedForeground }]}>
          {t(
            "Walk-ins welcome. For complex repairs, appointments recommended.",
            "Chào đón khách vãng lai. Với sửa chữa phức tạp, nên hẹn trước."
          )}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  langToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  langToggleText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
  },
  cardTag: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  cardBody: {
    padding: 12,
    gap: 0,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  phones: {
    marginTop: 12,
    gap: 8,
  },
  phonesTitle: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 10,
  },
  phoneIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginBottom: 1,
  },
  phoneNumber: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  directionsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
  },
  directionsBtnText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
});
