import { describe, expect, it } from "vitest";
import {
  PropertySearchCardSchema,
  SearchFacetsSchema,
  SearchFiltersSchema,
  SearchRequestSchema,
  SearchResultSchema,
  SearchSortOptionEnum,
} from "../src/search/index.js";

describe("Search Domain Contracts", () => {
  describe("Search Request & Filters", () => {
    it("should accept valid SearchRequest and parse default parameters", () => {
      const input = {
        query: "Hostels in Hinjawadi",
        filters: {
          cityId: "city_pune_01",
          localityIds: ["loc_hinjawadi_01"],
          occupancies: [1, 2],
          minPrice: 6000,
          maxPrice: 12000,
          foodIncluded: true,
          verifiedOnly: true,
        },
        sortBy: SearchSortOptionEnum.enum.price_asc,
      };
      const result = SearchRequestSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1); // Default page
        expect(result.data.limit).toBe(20); // Default limit
        expect(result.data.sortBy).toBe("price_asc");
      }
    });

    it("should coerce numerical pagination params", () => {
      const input = {
        page: "2",
        limit: "15",
      };
      const result = SearchRequestSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(2);
        expect(result.data.limit).toBe(15);
      }
    });

    it("should accept comprehensive SearchFilters", () => {
      const filters = {
        cityId: "city_pune_01",
        localityIds: ["loc_hinjawadi_01", "loc_wakad_01"],
        propertyTypeIds: ["pt_hostel", "pt_pg"],
        categoryIds: ["pc_coed"],
        amenityIds: ["am_wifi", "am_ac"],
        occupancies: [1, 2, 3],
        minPrice: 5000,
        maxPrice: 15000,
        foodIncluded: true,
        verifiedOnly: true,
        nearbyPoiId: "poi_symbiosis_01",
        maxDistanceMeters: 2000,
        minRating: 4.0,
      };
      expect(SearchFiltersSchema.safeParse(filters).success).toBe(true);
    });
  });

  describe("PropertySearchCard", () => {
    it("should validate high-performance PropertySearchCard payload", () => {
      const validCard = {
        id: "prop_urban_stay_01",
        name: "Urban Nest Luxury PG",
        slug: "urban-nest-luxury-pg",
        propertyTypeName: "Hostel / Co-Living",
        categoryNames: ["Co-Ed", "Students"],
        coverImageUrl: "https://assets.getstay.com/gallery/cover.jpg",
        localityName: "Hinjawadi Phase 1",
        cityName: "Pune",
        addressSummary: "Near Infosys Gate 2, Hinjawadi Phase 1",
        startingPrice: 8500,
        securityDeposit: 8500,
        occupanciesAvailable: [1, 2, 3],
        highlightedAmenityNames: ["WiFi", "AC", "Daily Housekeeping", "3-Time Meals"],
        ratingSummary: {
          averageRating: 4.8,
          totalReviews: 24,
        },
        nearbyTargetMetrics: {
          poiId: "poi_symbiosis_01",
          poiName: "Symbiosis SCIT",
          distanceMeters: 650,
          durationMinutes: 8,
          travelMode: "WALK",
        },
        isVerified: true,
        foodIncluded: true,
      };
      const result = PropertySearchCardSchema.safeParse(validCard);
      expect(result.success).toBe(true);
    });
  });

  describe("SearchResult & Facets", () => {
    it("should validate complete SearchResult payload with facets and pagination", () => {
      const validResult = {
        query: "Hostels in Pune",
        items: [
          {
            id: "prop_urban_stay_01",
            name: "Urban Nest",
            slug: "urban-nest",
            propertyTypeName: "Hostel",
            categoryNames: ["Co-Ed"],
            localityName: "Hinjawadi",
            cityName: "Pune",
            addressSummary: "Phase 1, Hinjawadi",
            startingPrice: 8000,
            occupanciesAvailable: [2],
            highlightedAmenityNames: ["WiFi"],
            ratingSummary: { averageRating: 4.5, totalReviews: 10 },
            isVerified: true,
            foodIncluded: true,
          },
        ],
        facets: {
          localities: [{ id: "loc_hinjawadi_01", name: "Hinjawadi", count: 12 }],
          propertyTypes: [{ id: "pt_hostel", name: "Hostel", count: 8 }],
          categories: [{ id: "pc_coed", name: "Co-Ed", count: 10 }],
          amenities: [{ id: "am_wifi", name: "WiFi", count: 12 }],
          priceRange: { min: 6000, max: 15000 },
        },
        pagination: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
      expect(SearchResultSchema.safeParse(validResult).success).toBe(true);
    });
  });
});
