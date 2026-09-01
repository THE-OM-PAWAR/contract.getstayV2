import { describe, expect, it } from "vitest";
import {
  AmenityCategoryEnum,
  AmenitySchema,
  CitySchema,
  CountrySchema,
  LocalitySchema,
  LocalityTypeEnum,
  MealTypeSchema,
  PointOfInterestSchema,
  PointOfInterestTypeSchema,
  PropertyCategorySchema,
  PropertyTypeSchema,
  StateSchema,
} from "../src/master/index.js";

describe("Master Data Contracts", () => {
  const baseTimestamps = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe("Country Contract", () => {
    it("should accept valid country payload", () => {
      const valid = {
        id: "cnt_ind_01",
        name: "India",
        slug: "india",
        isoCode: "IN",
        phoneCode: "+91",
        currency: "INR",
        isActive: true,
        ...baseTimestamps,
      };
      const result = CountrySchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject country with invalid ISO code length", () => {
      const invalid = {
        id: "cnt_ind_01",
        name: "India",
        slug: "india",
        isoCode: "IND", // Must be 2 characters
        phoneCode: "+91",
        currency: "INR",
        ...baseTimestamps,
      };
      const result = CountrySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("State Contract", () => {
    it("should accept valid state payload", () => {
      const valid = {
        id: "st_mh_01",
        countryId: "cnt_ind_01",
        name: "Maharashtra",
        slug: "maharashtra",
        code: "MH",
        isActive: true,
        ...baseTimestamps,
      };
      const result = StateSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject state missing countryId", () => {
      const invalid = {
        id: "st_mh_01",
        name: "Maharashtra",
        slug: "maharashtra",
        code: "MH",
        ...baseTimestamps,
      };
      const result = StateSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("City Contract", () => {
    it("should accept valid city payload", () => {
      const valid = {
        id: "city_pune_01",
        stateId: "st_mh_01",
        name: "Pune",
        slug: "pune",
        latitude: 18.5204,
        longitude: 73.8567,
        heroImage: "https://assets.getstay.com/cities/pune.jpg",
        isActive: true,
        ...baseTimestamps,
      };
      const result = CitySchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject out-of-range coordinates", () => {
      const invalid = {
        id: "city_pune_01",
        stateId: "st_mh_01",
        name: "Pune",
        slug: "pune",
        latitude: 95.0, // Max 90
        longitude: 73.8567,
        ...baseTimestamps,
      };
      const result = CitySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("Locality Contract", () => {
    it("should accept valid locality payload", () => {
      const valid = {
        id: "loc_hinjawadi_01",
        cityId: "city_pune_01",
        name: "Hinjawadi",
        slug: "hinjawadi",
        pincode: "411057",
        localityType: LocalityTypeEnum.enum["IT Hub"],
        latitude: 18.5913,
        longitude: 73.7389,
        isActive: true,
        ...baseTimestamps,
      };
      const result = LocalitySchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject invalid 5-digit pincode", () => {
      const invalid = {
        id: "loc_hinjawadi_01",
        cityId: "city_pune_01",
        name: "Hinjawadi",
        slug: "hinjawadi",
        pincode: "41105", // Must be 6 digits
        localityType: "IT Hub",
        ...baseTimestamps,
      };
      const result = LocalitySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("Point Of Interest Type & Point Of Interest Contracts", () => {
    it("should accept valid POI type", () => {
      const valid = {
        id: "poi_type_univ",
        name: "University",
        slug: "university",
        icon: "graduation-cap",
        displayOrder: 1,
        isActive: true,
        ...baseTimestamps,
      };
      const result = PointOfInterestTypeSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should accept valid Point Of Interest payload", () => {
      const valid = {
        id: "poi_symbiosis_01",
        cityId: "city_pune_01",
        localityId: "loc_hinjawadi_01",
        typeId: "poi_type_univ",
        name: "Symbiosis Centre for Information Technology",
        slug: "scit-pune",
        address: "Plot 15, Phase 1, Hinjawadi",
        website: "https://www.scit.edu",
        isPopular: true,
        latitude: 18.5925,
        longitude: 73.7385,
        isActive: true,
        ...baseTimestamps,
      };
      const result = PointOfInterestSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });

  describe("Property Master (Type, Category, Amenity, MealType)", () => {
    it("should accept valid PropertyType", () => {
      const valid = {
        id: "pt_hostel",
        name: "Hostel",
        slug: "hostel",
        description: "Standard student and backpacker hostel accommodation",
        icon: "building",
        displayOrder: 0,
        isActive: true,
        ...baseTimestamps,
      };
      expect(PropertyTypeSchema.safeParse(valid).success).toBe(true);
    });

    it("should accept valid PropertyCategory", () => {
      const valid = {
        id: "pc_coed",
        name: "Co-Ed",
        slug: "co-ed",
        description: "Co-ed stays for students and working professionals",
        displayOrder: 0,
        isActive: true,
        ...baseTimestamps,
      };
      expect(PropertyCategorySchema.safeParse(valid).success).toBe(true);
    });

    it("should accept valid Amenity and reject unknown category enum", () => {
      const valid = {
        id: "am_wifi",
        name: "High-Speed WiFi",
        slug: "high-speed-wifi",
        category: AmenityCategoryEnum.enum.Technology,
        isFilterable: true,
        isHighlighted: true,
        displayOrder: 1,
        isActive: true,
        ...baseTimestamps,
      };
      expect(AmenitySchema.safeParse(valid).success).toBe(true);

      const invalid = {
        ...valid,
        category: "InvalidCategoryValue",
      };
      expect(AmenitySchema.safeParse(invalid).success).toBe(false);
    });

    it("should accept valid MealType", () => {
      const valid = {
        id: "mt_breakfast",
        name: "Breakfast",
        slug: "breakfast",
        description: "Morning breakfast with hot beverages",
        displayOrder: 1,
        isActive: true,
        ...baseTimestamps,
      };
      expect(MealTypeSchema.safeParse(valid).success).toBe(true);
    });
  });
});
