import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const CATEGORIES = [
  { id: "1", label: "All recipes ", icon: "grid-outline" },
  { id: "2", label: "Nigerian", icon: "shirt-outline" },
  { id: "3", label: "Asian", icon: "laptop-outline" },
  { id: "4", label: "European", icon: "sparkles-outline" },
  { id: "5", label: "Cameroonian", icon: "home-outline" },
  { id: "6", label: "Cuban", icon: "barbell-outline" },
];

const FLASH_DEALS = [
  {
    id: "f1",
    name: "Egusi soup",
    originalPrice: 2.99,
    discount: 50,
    image: "https://imgs.search.brave.com/Qy-XniMZoIOU9TkRTl59BhdtGYhaLn9niH5jeYpFxB8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGhlb2N0b3B1c25l/d3MuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE3LzA5L2Vn/dXNpLXNvdXAtNTAw/eDMzMC5qcGc",
    rating: 4.8,
    reviews: 1240,
  },
  {
    id: "f2",
    name: "Eru",
    originalPrice: 2.99,
    discount: 30,
    image: "https://imgs.search.brave.com/7JsFx08sho6DWh0mInSbnsOhqujGILw6hna2314qvdo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cHJlY2lvdXNjb3Jl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxNy8wMi9wb3Qt/b2YtZXJ1LmpwZw",
    rating: 4.8,
    reviews: 1240,
  },
  {
    id: "f3",
    name: "Ekwang",
    price: 3.99,
    discount: 50,
    image: "https://imgs.search.brave.com/0TsODP2NXei2m97y65TJfxgEAxX_WMvDBr9dGvc0ZLM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hZnJp/Y2FudmliZXMuc3Rv/cmFnZS5nb29nbGVh/cGlzLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wOC8y/NzIyNTA1NS9Ib3ct/dG8tbWFrZS1kZWxp/Y2lvdXMtZWt3YW5n/LmpwZw",
    rating: 4.9,
    reviews: 2103,
  },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Fried chicken massala",
    price: 4.99,
    image: "https://imgs.search.brave.com/-q4voGdDM4WyPqNNhSRhGE7HN66JoJgOl_vYcXyuyR0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2tpbm55dGFzdGUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDExLzA2L0NoaWNr/ZW4tVGlra2EtTWFz/YWxhLTkuanBn",
    rating: 4.6,
    tag: "New",
  },
  {
    id: "p2",
    name: "rice curry",
    price: 1.99,
    image: "https://imgs.search.brave.com/dMFXoVLVk95M_jTnm69X9HforwIFiK60K7si1R01_dE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGFzdGVvZmhvbWUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzA5L0N1cnJ5/Q2hpY2tlbkFuZFJp/Y2VfVE9IRDI0X1JN/UzE5NDg2Ml9FbWls/eURhdmlzXzA0X1NP/Q0lBTC5qcGc_Zml0/PTcwMCwxMDI0",
    rating: 4.8,
    tag: "Hot",
  },
  {
    id: "p3",
    name: "egg fired rice",
    price: 4.99,
    image: "https://imgs.search.brave.com/1cSd41Zfe0mrXmHUbQ2dygBcBKKdrqTxtk51cPup16I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgz/NzkxNjM2L3Bob3Rv/L2VnZy1mcmllZC1y/aWNlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1TQ29QUWhy/THhBYmRzeXMyU2lo/WHFkNzhRaTU4blY5/bFNBMkNDVzRBUHc4/PQ",
    rating: 4.7,
    tag: "New",
  },
  {
    id: "p4",
    name: "tacos",
    price: 4.99,
    image: "https://imgs.search.brave.com/ZaB-fzo14mk7e68uUA2ts67_S1mI2OeXKtgLys9-u6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90YWNv/cy1hbC1wYXN0b3It/bWV4aWNhbi10YWNv/LXN0cmVldC1mb29k/LW1leGljby1jaXR5/LXRhY29zLWFsLXBh/c3Rvci1tZXhpY2Fu/LXRhY28tc3RyZWV0/LWZvb2QtbWV4aWNv/LWNpdHktdGFjb3Mt/bWV4aWNhbm9zLTEz/Njc0NDYxNi5qcGc",
    rating: 4.5,
    tag: "Hot",
  },
];

function FlashDealCard({ item }: { item: (typeof FLASH_DEALS)[0] }) {
  const [wished, setWished] = useState(false);

  return (
    <TouchableOpacity style={s.dealCard} activeOpacity={0.88}>
      <View style={s.dealImageWrap}>
        <Image source={{ uri: item.image }} style={s.dealImage} resizeMode="cover" />
        <View style={s.discountBadge}>
          <Text style={s.discountText}>-{item.discount}%</Text>
        </View>
        <TouchableOpacity style={s.wishBtn} onPress={() => setWished(!wished)}>
          <Ionicons name={wished ? "heart" : "heart-outline"} size={18} color={wished ? "#e6d00e" : "#dd6d05"} />
        </TouchableOpacity>
      </View>
      <View style={s.dealInfo}>
        <Text style={s.dealName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={s.priceRow}>
          <Text style={s.dealPrice}>${item.price}</Text>
          <Text style={s.dealOriginal}>${item.originalPrice}</Text>
        </View>
        <View style={s.ratingRow}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={s.ratingText}>
            {item.rating} ({item.reviews.toLocaleString()})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ProductCard({ item }: { item: (typeof PRODUCTS)[0] }) {
  const [wished, setWished] = useState(false);
  const tagColor =
    item.tag === "New"
      ? "#10B981"
      : item.tag === "Hot"
        ? "#efbc44"
        : item.tag === "Sale"
          ? "#F59E0B"
          : "transparent";

  return (
    <TouchableOpacity style={s.productCard} activeOpacity={0.88}>
      <View style={s.productImageWrap}>
        <Image source={{ uri: item.image }} style={s.productImage} resizeMode="cover" />
        {item.tag ? (
          <View style={[s.tagBadge, { backgroundColor: tagColor }]}>
            <Text style={s.tagText}>{item.tag}</Text>
          </View>
        ) : null}
        <TouchableOpacity style={s.wishBtn} onPress={() => setWished(!wished)}>
          <Ionicons name={wished ? "heart" : "heart-outline"} size={16} color={wished ? "#eca012" : "#888"} />
        </TouchableOpacity>
      </View>
      <View style={s.productInfo}>
        <Text style={s.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={s.productBottom}>
          <Text style={s.productPrice}>${item.price}</Text>
          <View style={s.addBtn}>
            <Ionicons name="add" size={18} color="#fff" />
          </View>
        </View>
        <View style={s.ratingRow}>
          <Ionicons name="star" size={11} color="#F59E0B" />
          <Text style={s.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("1");
  const [cartCount] = useState(3);
  const { user, getDisplayName, logout } = useAuth();

  if (!user) {
    router.replace("/(auth)/Login");
    return null;
  }

  const handleLogout = () => {
    Alert.alert("Log out", "Do you want to sign out of your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)/Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6e6f3" />
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Hello, {getDisplayName()}</Text>
            <Text style={s.subGreeting}>Find what you love today</Text>
          </View>
          <View style={s.headerRight}>
            <TouchableOpacity style={s.iconBtn} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={22} color="#390505" />
            </TouchableOpacity>
            <TouchableOpacity style={s.iconBtn}>
              <Ionicons name="notifications-outline" size={24} color="#390505" />
              <View style={s.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity style={s.iconBtn}>
              <Ionicons name="cart-outline" size={26} color="#390505" />
              {cartCount > 0 && (
                <View style={s.cartBadge}>
                  <Text style={s.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#aaa" style={{ marginRight: 10 }} />
          <TextInput
            style={s.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity>
            <LinearGradient
              colors={["#ec9c12", "#e45a0a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.filterBtn}
            >
              <Ionicons name="options-outline" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#ec8612", "#f0aa5a", "#dde40a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.heroBanner}
        >
          <View style={s.heroLeft}>
            <View style={s.heroPill}>
              <Text style={s.heroPillText}>Limited Offer</Text>
            </View>
            <Text style={s.heroTitle}>Get 30% Off{"\n"}Your First Order</Text>
            <TouchableOpacity style={s.heroBtn}>
              <Text style={s.heroBtnText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={16} color="#f0d25a" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: "https://imgs.search.brave.com/YJRK4pQvvf8jkKYnd1YpW9Lh_ZIrs7Hxe5d1tYPleBI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9taXgtZm9v/ZC1hc3NvcnRlZC10/YWJsZS0yNjBudy0y/NTAzMTkwOTk3Lmpw/Zw" }}
            style={s.heroImage}
            resizeMode="cover"
          />
        </LinearGradient>

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catScroll}>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;

            return (
              <TouchableOpacity
                key={cat.id}
                style={[s.catItem, active && s.catItemActive]}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.8}
              >
                {active ? (
                  <LinearGradient
                    colors={["#ecb912", "#e4480a"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={s.catIconWrap}
                  >
                    <Ionicons name={cat.icon as keyof typeof Ionicons.glyphMap} size={22} color="#fff" />
                  </LinearGradient>
                ) : (
                  <View style={[s.catIconWrap, s.catIconInactive]}>
                    <Ionicons name={cat.icon as keyof typeof Ionicons.glyphMap} size={22} color="#7F5AF0" />
                  </View>
                )}
                <Text style={[s.catLabel, active && s.catLabelActive]}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={s.sectionHeader}>
          <View style={s.flashTitleRow}>
            <Text style={s.sectionTitle}>Flash Deals</Text>
            <View style={s.flashPill}>
              <Ionicons name="flash" size={13} color="#fff" />
              <Text style={s.flashPillText}>Ends in 02:45:12</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={FLASH_DEALS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => <FlashDealCard item={item} />}
        />

        <View style={[s.sectionHeader, { marginTop: 24 }]}>
          <Text style={s.sectionTitle}>For You</Text>
          <TouchableOpacity>
            <Text style={s.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={s.productGrid}>
          {PRODUCTS.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f3e6",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "800",
    color: "#390505",
  },
  subGreeting: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 42,
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ec12c4",
    borderWidth: 1,
    borderColor: "#f6e6f3",
  },
  cartBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#410ae4",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f6e6f3",
  },
  cartBadgeText: {
    fontSize: 9,
    color: "#fff",
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#390505",
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    height: 160,
  },
  heroLeft: {
    flex: 1,
  },
  heroPill: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  heroPillText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    marginBottom: 14,
  },
  heroBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  heroBtnText: {
    color: "#7F5AF0",
    fontWeight: "700",
    fontSize: 13,
  },
  heroImage: {
    width: 120,
    height: 140,
    borderRadius: 16,
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a2e",
  },
  seeAll: {
    fontSize: 13,
    color: "#7F5AF0",
    fontWeight: "600",
  },
  flashTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flashPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
  },
  flashPillText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  catScroll: {
    paddingLeft: 16,
  },
  catItem: {
    alignItems: "center",
    marginRight: 16,
    width: 64,
  },
  catItemActive: {},
  catIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  catIconInactive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  catLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },
  catLabelActive: {
    color: "#410ae4",
    fontWeight: "700",
  },
  dealCard: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dealImageWrap: {
    position: "relative",
  },
  dealImage: {
    width: 170,
    height: 140,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  discountText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  wishBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealInfo: {
    padding: 10,
  },
  dealName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#410ae4",
  },
  dealOriginal: {
    fontSize: 12,
    color: "#94A3B8",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    color: "#94A3B8",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 16,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 4,
  },
  productImageWrap: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 160,
  },
  tagBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a1a2e",
    lineHeight: 18,
    marginBottom: 6,
  },
  productBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#410ae4",
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#ec12c4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ec12c4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
});
