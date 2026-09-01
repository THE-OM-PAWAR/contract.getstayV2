import { describe, expect, it } from "vitest";
import {
  CityLandingSchema,
  CreateEnquiryRequestSchema,
  CreateFavoriteRequestSchema,
  CreateReviewRequestSchema,
  DeleteFavoriteRequestSchema,
  LocalityLandingSchema,
  MarkNotificationReadRequestSchema,
  PointOfInterestLandingSchema,
  PropertyDetailsSchema,
  UpdateEnquiryStatusRequestSchema,
  UpdateReviewRequestSchema,
  UpdateUserPreferencesRequestSchema,
  UpdateUserProfileRequestSchema,
} from "../src/marketplace/index.js";

describe("Marketplace Read & Mutation API Contracts", () => {
  const baseTimestamps = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe("Composite Read APIs", () => {
    it("should validate full PropertyDetails page composite payload", () => {
      const validPropertyDetails = {
        property: {
          id: "prop_urban_stay_01",
          organisationId: "org_staywell_01",
          name: "Urban Nest Luxury PG",
          slug: "urban-nest-luxury-pg",
          propertyTypeId: "pt_hostel",
          categoryIds: ["pc_coed"],
          amenityIds: ["am_wifi"],
          location: {
            countryId: "cnt_ind_01",
            stateId: "st_mh_01",
            cityId: "city_pune_01",
            localityId: "loc_hinjawadi_01",
            addressLine1: "Plot 24, Phase 1",
            pincode: "411057",
          },
          contact: {
            primaryPhone: "9876543210",
          },
          policies: {
            visitorsAllowed: true,
            smokingAllowed: false,
            alcoholAllowed: false,
            outsideFoodAllowed: true,
            documentsRequired: ["aadhaar"],
          },
          verification: { status: "verified" },
          publishing: { status: "published" },
          isActive: true,
          ...baseTimestamps,
        },
        organisation: {
          id: "org_staywell_01",
          name: "StayWell",
          slug: "staywell",
          organisationType: "business",
          contact: { personName: "Host", phone: "9876543210" },
          address: {
            addressLine1: "Tower B",
            cityId: "city_pune_01",
            stateId: "st_mh_01",
            countryId: "cnt_ind_01",
            pincode: "411028",
          },
          verificationStatus: "verified",
          isActive: true,
          ...baseTimestamps,
        },
        propertyType: {
          id: "pt_hostel",
          name: "Hostel",
          slug: "hostel",
          displayOrder: 1,
          isActive: true,
          ...baseTimestamps,
        },
        categories: [
          {
            id: "pc_coed",
            name: "Co-Ed",
            slug: "co-ed",
            displayOrder: 1,
            isActive: true,
            ...baseTimestamps,
          },
        ],
        amenities: [
          {
            id: "am_wifi",
            name: "WiFi",
            slug: "wifi",
            category: "Technology",
            isFilterable: true,
            isHighlighted: true,
            displayOrder: 1,
            isActive: true,
            ...baseTimestamps,
          },
        ],
        roomPlans: [],
        galleries: [],
        mealOfferings: [],
        nearbyPlaces: [],
        content: {
          id: "pc_urban_nest_01",
          propertyId: "prop_urban_stay_01",
          introduction: "Great stay in Pune",
          highlights: ["WiFi"],
          faqs: [],
          seo: {},
          indexability: { indexable: true },
          status: "published",
          ...baseTimestamps,
        },
        ratingSummary: {
          averageRating: 4.8,
          totalReviews: 12,
        },
      };

      const result = PropertyDetailsSchema.safeParse(validPropertyDetails);
      expect(result.success).toBe(true);
    });

    it("should validate CityLanding payload", () => {
      const validCityLanding = {
        city: {
          id: "city_pune_01",
          stateId: "st_mh_01",
          name: "Pune",
          slug: "pune",
          latitude: 18.5204,
          longitude: 73.8567,
          isActive: true,
          ...baseTimestamps,
        },
        popularLocalities: [],
        popularPropertyTypes: [],
        featuredProperties: [],
      };
      expect(CityLandingSchema.safeParse(validCityLanding).success).toBe(true);
    });

    it("should validate LocalityLanding and PoiLanding payloads", () => {
      const city = {
        id: "city_pune_01",
        stateId: "st_mh_01",
        name: "Pune",
        slug: "pune",
        latitude: 18.5204,
        longitude: 73.8567,
        isActive: true,
        ...baseTimestamps,
      };

      const locality = {
        id: "loc_hinjawadi_01",
        cityId: "city_pune_01",
        name: "Hinjawadi",
        slug: "hinjawadi",
        pincode: "411057",
        localityType: "IT Hub",
        isActive: true,
        ...baseTimestamps,
      };

      const validLocalityLanding = {
        locality,
        city,
        nearbyPOIs: [],
        featuredProperties: [],
      };
      expect(LocalityLandingSchema.safeParse(validLocalityLanding).success).toBe(
        true
      );

      const poi = {
        id: "poi_symbiosis_01",
        cityId: "city_pune_01",
        localityId: "loc_hinjawadi_01",
        typeId: "poi_type_univ",
        name: "Symbiosis",
        slug: "symbiosis",
        address: "Phase 1",
        isPopular: true,
        latitude: 18.59,
        longitude: 73.73,
        isActive: true,
        ...baseTimestamps,
      };

      const validPoiLanding = {
        pointOfInterest: poi,
        locality,
        city,
        nearbyProperties: [],
      };
      expect(PointOfInterestLandingSchema.safeParse(validPoiLanding).success).toBe(
        true
      );
    });
  });

  describe("Mutation API Requests", () => {
    it("should validate CreateReviewRequest and UpdateReviewRequest", () => {
      const createReview = {
        propertyId: "prop_urban_stay_01",
        ratings: { overall: 5, cleanliness: 5 },
        comment: "Excellent host and super clean rooms throughout the stay!",
      };
      expect(CreateReviewRequestSchema.safeParse(createReview).success).toBe(
        true
      );

      const updateReview = {
        comment: "Updated review comment with extra feedback details.",
      };
      expect(UpdateReviewRequestSchema.safeParse(updateReview).success).toBe(
        true
      );
    });

    it("should validate Favorite & Enquiry mutation requests", () => {
      expect(
        CreateFavoriteRequestSchema.safeParse({
          propertyId: "prop_urban_stay_01",
        }).success
      ).toBe(true);

      expect(
        DeleteFavoriteRequestSchema.safeParse({
          favoriteId: "fav_01",
        }).success
      ).toBe(true);

      expect(
        CreateEnquiryRequestSchema.safeParse({
          propertyId: "prop_urban_stay_01",
          name: "Rohit",
          email: "rohit@example.com",
          phone: "9876543210",
        }).success
      ).toBe(true);

      expect(
        UpdateEnquiryStatusRequestSchema.safeParse({
          status: "contacted",
          hostNotes: "Called candidate at 11 AM",
        }).success
      ).toBe(true);
    });

    it("should validate User Profile & Preferences mutation requests", () => {
      expect(
        UpdateUserProfileRequestSchema.safeParse({
          bio: "Student living in Pune",
          gender: "female",
        }).success
      ).toBe(true);

      expect(
        UpdateUserPreferencesRequestSchema.safeParse({
          budgetMin: 8000,
          budgetMax: 14000,
          needFoodIncluded: true,
        }).success
      ).toBe(true);

      expect(
        MarkNotificationReadRequestSchema.safeParse({
          notificationId: "notif_01",
          isRead: true,
        }).success
      ).toBe(true);
    });
  });
});
