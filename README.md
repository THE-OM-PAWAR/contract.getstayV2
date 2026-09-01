# @getstay/contracts

> Shared TypeScript types, Zod schemas, enums, DTOs, and API contracts for the GetStay ecosystem (HQ and Marketplace).

---

## 📌 Architecture Guardrails & Principles

1. **Pure Contracts Only**: Contains solely interface definitions, type aliases, Zod schemas, enums, and API request/response DTOs.
2. **Zero Framework Dependencies**: Zero dependencies on `Next.js`, `React`, `MongoDB`, `Mongoose`, or any application-layer frameworks.
3. **Database Agnostic**: Does not define ORM/ODM models, database queries, connections, or database schema mutations.
4. **Single Source of Truth**: HQ and Marketplace applications import contracts from this package to ensure strict end-to-end API type safety and validation parity.

---

## 📁 Package Layout

```
contract.getstay/
├── src/
│   ├── common/         # Universal response envelopes, pagination, sorting, audit timestamps
│   ├── master/         # Master data domain contracts (locations, amenities, etc.)
│   ├── property/       # Property domain contracts (hostels, rooms, policies, etc.)
│   ├── content/        # Content domain contracts (banners, articles, SEO, media)
│   ├── marketplace/    # Marketplace domain contracts (bookings, users, checkout)
│   ├── search/         # Search domain contracts (filters, facets, queries, results)
│   └── index.ts        # Unified public API entry point
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

---

## 🚀 Installation & Usage

### Installing in an application (`hq.getstay` or `marketplace.getstay`):

```json
{
  "dependencies": {
    "@getstay/contracts": "workspace:*" // or "file:../contract.getstay"
  }
}
```

### Importing Contracts

#### Direct Root Import
```typescript
import {
  type ApiResponse,
  type PaginatedResponse,
  PaginationQuerySchema,
} from "@getstay/contracts";
```

#### Granular Subpath Imports
```typescript
import { type ApiResponse, PaginationQuerySchema } from "@getstay/contracts/common";
import * as MasterContracts from "@getstay/contracts/master";
import * as PropertyContracts from "@getstay/contracts/property";
import * as ContentContracts from "@getstay/contracts/content";
import * as MarketplaceContracts from "@getstay/contracts/marketplace";
import * as SearchContracts from "@getstay/contracts/search";
```

---

## 🛠️ Development Scripts

| Command | Description |
| :--- | :--- |
| `npm run build` | Builds dual ESM (`.js`) and CJS (`.cjs`) outputs alongside TypeScript declarations (`.d.ts`) |
| `npm run dev` | Runs `tsup` in watch mode for development |
| `npm run typecheck` | Validates strict TypeScript compilation (`tsc --noEmit`) |
| `npm run clean` | Cleans the `dist/` directory |

---

## 🏷️ Semantic Versioning

This package follows [Semantic Versioning (SemVer)](https://semver.org/):
- **PATCH** (`0.1.x`): Non-breaking bug fixes or documentation updates.
- **MINOR** (`0.x.0`): New backward-compatible fields, DTOs, enums, or schemas.
- **MAJOR** (`x.0.0`): Breaking changes to existing contract shapes or schema validations.
