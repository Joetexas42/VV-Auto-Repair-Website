import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SERVICES, STRINGS } from "@/constants/data";
import { useLanguage } from "@/context/LanguageContext";
import { useColors } from "@/hooks/useColors";

function ServiceItem({ en, vi }: { en: string; vi: string }) {
  const { t } = useLanguage();
  const colors = useColors();
  return (
    <View style={[styles.serviceItem, { borderBottomColor: colors.border }]}>
      <View style={[styles.checkDot, { backgroundColor: colors.primary + "20" }]}>
        <Feather name="check" size={12} color={colors.primary} />
      </View>
      <Text style={[styles.serviceText, { color: colors.foreground }]}>{t(en, vi)}</Text>
    </View>
  );
}

function ServiceSection({
  title,
  subtitle,
  color,
  icon,
  services,
}: {
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  services: { en: string; vi: string }[];
}) {
  const colors = useColors();
  return (
    <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <LinearGradient colors={[color, color + "cc"]} style={styles.sectionHeader}>
        <View style={styles.sectionHeaderInner}>
          <View style={[styles.sectionIconCircle, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <Feather name={icon as any} size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.servicesList}>
        {services.map((s, i) => (
          <ServiceItem key={i} en={s.en} vi={s.vi} />
        ))}
      </View>
    </View>
  );
}

export default function ServicesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

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
      <Text style={[styles.pageTitle, { color: colors.foreground }]}>
        {t(STRINGS.services.en, STRINGS.services.vi)}
      </Text>
      <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
        {t("Two specialized shops for all your auto needs", "Hai cơ sở chuyên biệt cho mọi nhu cầu xe của bạn")}
      </Text>

      <ServiceSection
        title={t("Dallas — Mechanical Repair", "Dallas — Sửa Máy")}
        subtitle="11366 Jupiter Rd, Dallas, TX"
        color="#3f5f85"
        icon="tool"
        services={SERVICES.dallas}
      />

      <ServiceSection
        title={t("Garland — Body Shop", "Garland — Đồng Sơn")}
        subtitle="3730 Marquis Dr, Garland, TX"
        color="#e63030"
        icon="layers"
        services={SERVICES.garland}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  section: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  sectionHeader: {
    padding: 16,
  },
  sectionHeaderInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  servicesList: {
    padding: 8,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
