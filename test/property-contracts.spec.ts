import { describe, expect, it } from "vitest";
import {
  DocumentTypeEnum,
  ImageCategoryEnum,
  MealFrequencyEnum,
  OrganisationSchema,
  OrganisationTypeEnum,
  PropertyGallerySchema,
  PropertyMealOfferingSchema,
  PropertyNearbyPlaceSchema,
  PropertySchema,
  PublishingStatusEnum,
  RoomPlanSchema,
  TravelModeEnum,
  VerificationStatusEnum,
} from "../src/property/index.js";

describe("Property Domain Contracts", () => {
  const baseTimestamps = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe("Organisation Contract", () => {
    it("should accept valid organisation payload", () => {
      const valid = {
        id: "org_staywell_01",
        name: "StayWell Living Spaces",
        slug: "staywell-living-spaces",
        legalName: "StayWell Living Pvt Ltd",
        organisationType: OrganisationTypeEnum.enum.business,
        contact: {
          personName: "Rajesh Kumar",
          phone: "9876543210",
          alternatePhone: "+919876543211",
          email: "rajesh@staywell.com",
        },
        address: {
          addressLine1: "Tower B, Cyber City",
          addressLine2: "Magarpatta",
          cityId: "city_pune_01",
          stateId: "st_mh_01",
          countryId: "cnt_ind_01",
          pincode: "411028",
        },
        verificationStatus: VerificationStatusEnum.enum.verified,
        isActive: true,
        ...baseTimestamps,
      };
      const result = OrganisationSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject organisation with invalid contact phone", () => {
      const invalid = {
        id: "org_staywell_01",
        name: "StayWell Living Spaces",
        slug: "staywell-living-spaces",
        contact: {
          personName: "Rajesh Kumar",
          phone: "12345", // Invalid phone
        },
        address: {
          addressLine1: "Tower B",
          cityId: "city_pune_01",
          stateId: "st_mh_01",
          countryId: "cnt_ind_01",
          pincode: "411028",
        },
        ...baseTimestamps,
      };
      const result = OrganisationSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("Property Contract", () => {
    const validPropertyPayload = {
      id: "prop_urban_stay_01",
      organisationId: "org_staywell_01",
      name: "Urban Nest Luxury PG",
      slug: "urban-nest-luxury-pg",
      propertyTypeId: "pt_hostel",
      categoryIds: ["pc_coed"],
      amenityIds: ["am_wifi", "am_ac"],
      location: {
        countryId: "cnt_ind_01",
        stateId: "st_mh_01",
        cityId: "city_pune_01",
        localityId: "loc_hinjawadi_01",
        addressLine1: "Plot 24, Phase 1, Hinjawadi",
        landmark: "Near Infosys Gate 2",
        pincode: "411057",
        latitude: 18.5912,
        longitude: 73.7381,
        googleMapsUrl: "https://maps.google.com/?q=18.5912,73.7381",
      },
      contact: {
        primaryPhone: "+919876543210",
        whatsapp: "9876543210",
        email: "support@urbannest.com",
      },
      policies: {
        gateClosingTime: "22:30",
        visitorsAllowed: true,
        smokingAllowed: false,
        alcoholAllowed: false,
        outsideFoodAllowed: true,
        documentsRequired: [
          DocumentTypeEnum.enum.aadhaar,
          DocumentTypeEnum.enum.pan,
        ],
        customNotes: "Quiet hours after 10 PM.",
      },
      verification: {
        status: VerificationStatusEnum.enum.verified,
        verifiedAt: new Date().toISOString(),
      },
      publishing: {
        status: PublishingStatusEnum.enum.published,
        publishedAt: new Date().toISOString(),
      },
      isActive: true,
      ...baseTimestamps,
    };

    it("should accept valid comprehensive property payload", () => {
      const result = PropertySchema.safeParse(validPropertyPayload);
      expect(result.success).toBe(true);
    });

    it("should reject property with invalid closing time format", () => {
      const invalid = {
        ...validPropertyPayload,
        policies: {
          ...validPropertyPayload.policies,
          gateClosingTime: "10:30 PM", // Must be 24-hour HH:MM format
        },
      };
      const result = PropertySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("RoomPlan Contract", () => {
    it("should accept valid room plan", () => {
      const valid = {
        id: "rp_double_sharing_01",
        propertyId: "prop_urban_stay_01",
        name: "Double Sharing AC Room",
        slug: "double-sharing-ac-room",
        description: "Spacious attached washroom room with individual study desks",
        occupancy: 2,
        monthlyRent: 8500,
        isSecurityDepositApplicable: true,
        securityDeposit: 8500,
        photos: [
          {
            url: "https://assets.getstay.com/rooms/double-01.jpg",
            isCover: true,
            altText: "Double Sharing Room with AC",
            displayOrder: 0,
          },
        ],
        amenityIds: ["am_wifi", "am_ac"],
        displayOrder: 0,
        isActive: true,
        ...baseTimestamps,
      };
      const result = RoomPlanSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject room plan with negative monthly rent or zero occupancy", () => {
      const invalid = {
        id: "rp_double_sharing_01",
        propertyId: "prop_urban_stay_01",
        name: "Invalid Room",
        slug: "invalid-room",
        occupancy: 0, // Min occupancy 1
        monthlyRent: -100, // Negative rent
        ...baseTimestamps,
      };
      const result = RoomPlanSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("PropertyGallery Contract", () => {
    it("should accept valid property gallery image", () => {
      const valid = {
        id: "img_ext_01",
        propertyId: "prop_urban_stay_01",
        url: "https://assets.getstay.com/gallery/exterior-main.jpg",
        category: ImageCategoryEnum.enum.exterior,
        title: "Front Elevation",
        altText: "Urban Nest Front Facade",
        isCover: true,
        displayOrder: 0,
        isActive: true,
        ...baseTimestamps,
      };
      const result = PropertyGallerySchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject gallery item with invalid category", () => {
      const invalid = {
        id: "img_ext_01",
        propertyId: "prop_urban_stay_01",
        url: "https://assets.getstay.com/gallery/exterior-main.jpg",
        category: "invalid_category",
        ...baseTimestamps,
      };
      expect(PropertyGallerySchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe("PropertyMealOffering Contract", () => {
    it("should accept valid meal offering", () => {
      const valid = {
        id: "pmo_bf_01",
        propertyId: "prop_urban_stay_01",
        mealTypeId: "mt_breakfast",
        included: true,
        frequency: MealFrequencyEnum.enum.daily,
        description: "Unlimited hygienic breakfast daily",
        isActive: true,
        ...baseTimestamps,
      };
      const result = PropertyMealOfferingSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });

  describe("PropertyNearbyPlace Contract", () => {
    it("should accept valid nearby place with distance metrics", () => {
      const valid = {
        id: "pnp_symbiosis_01",
        propertyId: "prop_urban_stay_01",
        pointOfInterestId: "poi_symbiosis_01",
        distance: {
          straightLineMeters: 650,
          roadMeters: 800,
          durationSeconds: 480, // 8 mins walk
          travelMode: TravelModeEnum.enum.WALK,
          provider: "google-routes",
          calculatedAt: new Date().toISOString(),
          isStale: false,
        },
        isPrimary: true,
        displayOrder: 1,
        isActive: true,
        ...baseTimestamps,
      };
      const result = PropertyNearbyPlaceSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });
});
