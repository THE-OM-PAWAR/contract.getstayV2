import { describe, expect, it } from "vitest";
import {
  CityContentSchema,
  ContentFaqSchema,
  ContentIndexabilitySchema,
  ContentSeoSchema,
  ContentStatusEnum,
  GuideCategoryEnum,
  GuideCoverImageSchema,
  GuideSchema,
  LocalityContentSchema,
  PointOfInterestContentSchema,
  PropertyContentSchema,
} from "../src/content/index.js";

describe("Content Domain Contracts", () => {
  const baseTimestamps = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe("Common Sub-Contracts (FAQ, SEO, Indexability, CoverImage)", () => {
    it("should accept valid FAQ and reject empty fields", () => {
      const valid = {
        question: "Is there a curfew time?",
        answer: "Yes, the main gate closes at 10:30 PM for safety.",
      };
      expect(ContentFaqSchema.safeParse(valid).success).toBe(true);

      const invalid = {
        question: "",
        answer: "Something",
      };
      expect(ContentFaqSchema.safeParse(invalid).success).toBe(false);
    });

    it("should accept valid SEO and handle nullish/empty fields safely", () => {
      const valid = {
        title: "Best Luxury PG in Hinjawadi | GetStay",
        metaDescription: "Find verified premium hostels and PGs in Hinjawadi.",
        ogTitle: "Urban Nest Luxury PG",
        ogDescription: "Affordable and premium stays near Infosys Phase 1.",
        ogImage: "https://assets.getstay.com/og/urban-nest.jpg",
      };
      expect(ContentSeoSchema.safeParse(valid).success).toBe(true);

      const partialValid = {
        title: "Stay in Pune",
      };
      expect(ContentSeoSchema.safeParse(partialValid).success).toBe(true);
    });

    it("should enforce reason when indexable is set to false", () => {
      const validIndexable = {
        indexable: true,
      };
      expect(ContentIndexabilitySchema.safeParse(validIndexable).success).toBe(true);

      const validNoIndex = {
        indexable: false,
        noIndexReason: "Draft under editorial review",
      };
      expect(ContentIndexabilitySchema.safeParse(validNoIndex).success).toBe(true);

      const invalidNoIndex = {
        indexable: false,
        noIndexReason: "", // Empty reason for no-index
      };
      expect(ContentIndexabilitySchema.safeParse(invalidNoIndex).success).toBe(false);
    });

    it("should validate Guide Cover Image URL", () => {
      const valid = {
        url: "https://assets.getstay.com/guides/pune-student-guide.webp",
        altText: "Students collaborating in Pune campus",
      };
      expect(GuideCoverImageSchema.safeParse(valid).success).toBe(true);

      const invalid = {
        url: "not-a-url",
      };
      expect(GuideCoverImageSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe("PropertyContent Contract", () => {
    it("should accept published PropertyContent payload", () => {
      const validPublished = {
        id: "pc_urban_nest_01",
        propertyId: "prop_urban_stay_01",
        introduction: "Experience comfortable co-living in the heart of Hinjawadi Phase 1.",
        description: "## About Urban Nest\nUrban Nest is a premier student and professional residence...",
        highlights: [
          "5-minute walk to Infosys & Wipro",
          "High-speed 300 Mbps fiber internet",
          "3-time chef-curated buffet meals",
        ],
        faqs: [
          {
            question: "Are electricity bills included?",
            answer: "Electricity up to 50 units/month is included in the rent.",
          },
        ],
        seo: {
          title: "Urban Nest PG in Hinjawadi Phase 1 | GetStay",
          metaDescription: "Verified PG with food, WiFi, and AC in Hinjawadi Phase 1.",
        },
        indexability: {
          indexable: true,
        },
        status: ContentStatusEnum.enum.published,
        publishedAt: new Date().toISOString(),
        ...baseTimestamps,
      };
      const result = PropertyContentSchema.safeParse(validPublished);
      expect(result.success).toBe(true);
    });

    it("should accept draft and archived PropertyContent payloads", () => {
      const draftPayload = {
        id: "pc_urban_nest_02",
        propertyId: "prop_urban_stay_02",
        status: ContentStatusEnum.enum.draft,
        ...baseTimestamps,
      };
      expect(PropertyContentSchema.safeParse(draftPayload).success).toBe(true);

      const archivedPayload = {
        id: "pc_urban_nest_03",
        propertyId: "prop_urban_stay_03",
        status: ContentStatusEnum.enum.archived,
        ...baseTimestamps,
      };
      expect(PropertyContentSchema.safeParse(archivedPayload).success).toBe(true);
    });

    it("should reject PropertyContent with invalid status value", () => {
      const invalid = {
        id: "pc_urban_nest_01",
        propertyId: "prop_urban_stay_01",
        status: "UNKNOWN_STATUS",
        ...baseTimestamps,
      };
      expect(PropertyContentSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe("CityContent Contract", () => {
    it("should accept valid CityContent payload", () => {
      const valid = {
        id: "cc_pune_01",
        cityId: "city_pune_01",
        introduction: "Pune, the Oxford of the East, is a thriving education and IT hub.",
        description: "# Pune Accommodation Guide\nPune offers rich options from Hinjawadi to Viman Nagar...",
        accommodationGuide: "Look for PGs near your campus or office to avoid peak traffic.",
        popularLocalityIds: ["loc_hinjawadi_01", "loc_viman_nagar_01"],
        popularPropertyTypeIds: ["pt_hostel", "pt_pg"],
        faqs: [
          {
            question: "What is the average PG rent in Pune?",
            answer: "Average rents range from ₹6,000 to ₹14,000 per month depending on sharing.",
          },
        ],
        seo: {
          title: "Hostels & PGs in Pune | GetStay",
          metaDescription: "Find top-rated student hostels and working professional PGs in Pune.",
        },
        indexability: { indexable: true },
        status: ContentStatusEnum.enum.published,
        publishedAt: new Date().toISOString(),
        ...baseTimestamps,
      };
      const result = CityContentSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });

  describe("LocalityContent & PointOfInterestContent Contracts", () => {
    it("should accept valid LocalityContent payload", () => {
      const valid = {
        id: "lc_hinjawadi_01",
        localityId: "loc_hinjawadi_01",
        introduction: "Hinjawadi is Pune's prime IT cluster.",
        description: "Home to Rajiv Gandhi Infotech Park with thousands of tech professionals.",
        accommodationGuide: "Phase 1 is closest to major campuses; Phase 2 and 3 offer newer gated communities.",
        whyStayHere: "Walk to work, bustling cafeteria culture, and excellent connectivity.",
        popularPoiIds: ["poi_infosys_01"],
        faqs: [],
        seo: {
          title: "PGs in Hinjawadi Phase 1, 2, 3 | GetStay",
        },
        indexability: { indexable: true },
        status: ContentStatusEnum.enum.published,
        ...baseTimestamps,
      };
      const result = LocalityContentSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should accept valid PointOfInterestContent payload", () => {
      const valid = {
        id: "poic_symbiosis_01",
        pointOfInterestId: "poi_symbiosis_01",
        introduction: "Hostels and student accommodation near Symbiosis InfoTech Campus.",
        description: "Detailed neighbourhood guide for incoming Symbiosis students.",
        faqs: [
          {
            question: "How far are the nearest student hostels from campus gate?",
            answer: "Within 500m to 1km with walking access.",
          },
        ],
        seo: {
          title: "Student Stays Near SCIT Pune | GetStay",
        },
        indexability: { indexable: true },
        status: ContentStatusEnum.enum.published,
        ...baseTimestamps,
      };
      const result = PointOfInterestContentSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });
  });

  describe("Guide Contract", () => {
    it("should accept valid published Guide payload", () => {
      const valid = {
        id: "guide_pune_fresher_01",
        title: "The Ultimate Student Guide to Living in Pune (2026)",
        slug: "ultimate-student-guide-pune-2026",
        excerpt: "Everything you need to know about finding a PG, managing budgets, and campus transit.",
        content: "## Welcome to Pune\nMoving to a new city can be daunting. In this guide, we break down...",
        coverImage: {
          url: "https://assets.getstay.com/guides/pune-hero.jpg",
          altText: "Pune cityscape and student hub",
        },
        category: GuideCategoryEnum.enum.student,
        relatedCityIds: ["city_pune_01"],
        relatedLocalityIds: ["loc_hinjawadi_01"],
        relatedPoiIds: ["poi_symbiosis_01"],
        relatedPropertyIds: ["prop_urban_stay_01"],
        seo: {
          title: "Student Guide to Living in Pune | GetStay",
          metaDescription: "Comprehensive guide for college students moving to Pune.",
        },
        status: ContentStatusEnum.enum.published,
        publishedAt: new Date().toISOString(),
        ...baseTimestamps,
      };
      const result = GuideSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject Guide with invalid slug format (uppercase / special characters)", () => {
      const invalid = {
        id: "guide_01",
        title: "My Guide",
        slug: "Invalid_Slug_With_Underscores", // Must be lowercase alphanumeric with hyphens
        content: "Short content longer than 10 characters",
        status: ContentStatusEnum.enum.draft,
        ...baseTimestamps,
      };
      expect(GuideSchema.safeParse(invalid).success).toBe(false);
    });
  });
});
