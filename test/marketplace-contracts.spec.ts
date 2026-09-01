import { describe, expect, it } from "vitest";
import {
  CreateEnquirySchema,
  CreateFavoriteSchema,
  CreateReviewSchema,
  EnquirySchema,
  EnquiryStatusEnum,
  EnquiryTypeEnum,
  FavoriteSchema,
  MarkNotificationReadSchema,
  MarketplaceUserPreferencesSchema,
  ModerateReviewSchema,
  NotificationSchema,
  NotificationTypeEnum,
  RecentlyViewedSchema,
  RecordRecentlyViewedSchema,
  RecordSearchHistorySchema,
  ReviewReactionSchema,
  ReviewReactionTypeEnum,
  ReviewSchema,
  ReviewStatusEnum,
  SearchHistorySchema,
  UpdateEnquiryStatusSchema,
  UpdateUserProfileSchema,
  UserGenderEnum,
  UserOccupationEnum,
  UserProfileSchema,
  UserSchema,
} from "../src/marketplace/index.js";

describe("Marketplace Domain Contracts", () => {
  const baseTimestamps = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe("Identity Domain (User, Profile, Preferences)", () => {
    it("should accept valid User payload without sensitive auth fields", () => {
      const valid = {
        id: "usr_aman_01",
        name: "Aman Sharma",
        email: "aman.sharma@example.com",
        phone: "+919876543210",
        avatarUrl: "https://assets.getstay.com/avatars/aman.jpg",
        isEmailVerified: true,
        isPhoneVerified: true,
        isActive: true,
        ...baseTimestamps,
      };
      expect(UserSchema.safeParse(valid).success).toBe(true);
    });

    it("should reject User with invalid email format", () => {
      const invalid = {
        id: "usr_aman_01",
        name: "Aman Sharma",
        email: "not-an-email",
        ...baseTimestamps,
      };
      expect(UserSchema.safeParse(invalid).success).toBe(false);
    });

    it("should accept valid UserProfile and update payload", () => {
      const validProfile = {
        id: "prof_aman_01",
        userId: "usr_aman_01",
        bio: "Master's student at Symbiosis looking for quiet stay with WiFi.",
        gender: UserGenderEnum.enum.male,
        occupation: UserOccupationEnum.enum.student,
        collegeOrCompany: "SCIT Pune",
        homeCity: "Indore",
        ...baseTimestamps,
      };
      expect(UserProfileSchema.safeParse(validProfile).success).toBe(true);

      const validUpdate = {
        bio: "Updated bio text",
        collegeOrCompany: "SCIT Phase 1",
      };
      expect(UpdateUserProfileSchema.safeParse(validUpdate).success).toBe(true);
    });

    it("should accept UserPreferences payload", () => {
      const validPreferences = {
        id: "pref_aman_01",
        userId: "usr_aman_01",
        preferredCityId: "city_pune_01",
        budgetMin: 7000,
        budgetMax: 12000,
        preferredOccupancies: [1, 2],
        preferredCategoryIds: ["pc_students"],
        needFoodIncluded: true,
        emailNotifications: true,
        whatsappNotifications: true,
        smsNotifications: false,
        ...baseTimestamps,
      };
      expect(
        MarketplaceUserPreferencesSchema.safeParse(validPreferences).success
      ).toBe(true);
    });
  });

  describe("Engagement Domain (Favorites, Recently Viewed, Search History)", () => {
    it("should accept valid Favorite DTO and CreateFavoriteInput", () => {
      const createInput = {
        propertyId: "prop_urban_stay_01",
        roomPlanId: "rp_double_sharing_01",
        note: "Liked the balcony view",
      };
      expect(CreateFavoriteSchema.safeParse(createInput).success).toBe(true);

      const validDto = {
        id: "fav_01",
        userId: "usr_aman_01",
        ...createInput,
        ...baseTimestamps,
      };
      expect(FavoriteSchema.safeParse(validDto).success).toBe(true);
    });

    it("should record Recently Viewed property event", () => {
      const recordInput = {
        propertyId: "prop_urban_stay_01",
        deviceType: "mobile_ios",
      };
      expect(RecordRecentlyViewedSchema.safeParse(recordInput).success).toBe(
        true
      );

      const validDto = {
        id: "rv_01",
        userId: "usr_aman_01",
        propertyId: "prop_urban_stay_01",
        viewedAt: new Date().toISOString(),
        deviceType: "mobile_ios",
      };
      expect(RecentlyViewedSchema.safeParse(validDto).success).toBe(true);
    });

    it("should record Search History", () => {
      const recordInput = {
        query: "Hostels in Hinjawadi with WiFi",
        cityId: "city_pune_01",
        filters: { budgetMax: 10000, foodIncluded: true },
      };
      expect(RecordSearchHistorySchema.safeParse(recordInput).success).toBe(
        true
      );

      const validDto = {
        id: "sh_01",
        userId: "usr_aman_01",
        ...recordInput,
        searchedAt: new Date().toISOString(),
      };
      expect(SearchHistorySchema.safeParse(validDto).success).toBe(true);
    });
  });

  describe("Review Domain (Ratings, Media, Moderation Lifecycle, Reactions)", () => {
    it("should validate User Review Submission (CreateReviewSchema)", () => {
      const validSubmission = {
        propertyId: "prop_urban_stay_01",
        stayDurationMonths: 6,
        roomPlanName: "Double Sharing AC",
        ratings: {
          overall: 4.5,
          cleanliness: 5.0,
          food: 4.0,
          safety: 5.0,
          valueForMoney: 4.0,
        },
        title: "Peaceful stay and great food",
        comment:
          "Stayed here during my first semester. Warden is helpful and WiFi is consistent.",
        pros: ["Great food", "Clean washrooms"],
        cons: ["Slightly strict gate closing time"],
        media: [
          {
            url: "https://assets.getstay.com/reviews/user_room_photo.jpg",
            type: "image" as const,
            caption: "My room setup",
          },
        ],
      };
      expect(CreateReviewSchema.safeParse(validSubmission).success).toBe(true);
    });

    it("should reject ratings outside 1.0 to 5.0 range", () => {
      const invalidSubmission = {
        propertyId: "prop_urban_stay_01",
        ratings: {
          overall: 6.0, // Out of bounds
        },
        comment: "Test comment long enough",
      };
      expect(CreateReviewSchema.safeParse(invalidSubmission).success).toBe(
        false
      );
    });

    it("should validate review moderation lifecycle states", () => {
      const validApproval = {
        status: ReviewStatusEnum.enum.approved,
        moderationReason: "Verified authentic stay",
      };
      expect(ModerateReviewSchema.safeParse(validApproval).success).toBe(true);

      const validRejection = {
        status: ReviewStatusEnum.enum.rejected,
        moderationReason: "Spam content detected",
      };
      expect(ModerateReviewSchema.safeParse(validRejection).success).toBe(true);

      const invalidState = {
        status: "invalid_status",
      };
      expect(ModerateReviewSchema.safeParse(invalidState).success).toBe(false);
    });

    it("should accept valid ReviewReaction payload", () => {
      const validReaction = {
        id: "rx_01",
        reviewId: "rev_01",
        userId: "usr_aman_01",
        reactionType: ReviewReactionTypeEnum.enum.helpful,
        ...baseTimestamps,
      };
      expect(ReviewReactionSchema.safeParse(validReaction).success).toBe(true);
    });
  });

  describe("Enquiry Domain (Conversion & Status Lifecycle)", () => {
    it("should validate new Enquiry creation", () => {
      const validEnquiry = {
        propertyId: "prop_urban_stay_01",
        roomPlanId: "rp_double_sharing_01",
        name: "Pooja Verma",
        email: "pooja.verma@example.com",
        phone: "+919876543219",
        enquiryType: EnquiryTypeEnum.enum.schedule_visit,
        expectedMoveInDate: new Date().toISOString(),
        scheduledVisitDate: new Date().toISOString(),
        message: "Can I visit tomorrow around 4 PM?",
      };
      expect(CreateEnquirySchema.safeParse(validEnquiry).success).toBe(true);
    });

    it("should validate full Enquiry lifecycle transitions", () => {
      const validDto = {
        id: "enq_01",
        propertyId: "prop_urban_stay_01",
        name: "Pooja Verma",
        email: "pooja.verma@example.com",
        phone: "+919876543219",
        enquiryType: EnquiryTypeEnum.enum.schedule_visit,
        status: EnquiryStatusEnum.enum.visit_scheduled,
        hostNotes: "Visit confirmed for 4 PM",
        ...baseTimestamps,
      };
      expect(EnquirySchema.safeParse(validDto).success).toBe(true);

      const updateToConverted = {
        status: EnquiryStatusEnum.enum.converted,
        hostNotes: "Student paid token advance",
      };
      expect(UpdateEnquiryStatusSchema.safeParse(updateToConverted).success).toBe(
        true
      );
    });
  });

  describe("Notification Domain", () => {
    it("should validate Notification DTO and MarkNotificationReadInput", () => {
      const validNotification = {
        id: "notif_01",
        userId: "usr_aman_01",
        type: NotificationTypeEnum.enum.enquiry_update,
        title: "Visit Scheduled Confirmed",
        message: "Your visit to Urban Nest has been confirmed for tomorrow 4 PM.",
        link: "/enquiries/enq_01",
        isRead: false,
        ...baseTimestamps,
      };
      expect(NotificationSchema.safeParse(validNotification).success).toBe(true);

      const readMutation = {
        notificationId: "notif_01",
        isRead: true,
      };
      expect(MarkNotificationReadSchema.safeParse(readMutation).success).toBe(
        true
      );
    });
  });
});
