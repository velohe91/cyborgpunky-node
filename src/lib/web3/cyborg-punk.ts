import type { Address } from "viem";
import type { NftRarity } from "@/lib/types";

export const CYBORG_PUNKS_CONTRACT =
  "0xe110F0241D85Cd433e9E986798dce3f07F3A7651" as Address;

const OPEN_SEA_API_URL =
  "https://api.opensea.io/api/v2/chain/ethereum/contract";

interface OpenSeaTrait {
  trait_type?: string | null;
  value?: string | number | null;
}

interface OpenSeaNFT {
  identifier: string;
  name?: string | null;
  description?: string | null;
  image_url?: string | null;
  metadata_url?: string | null;
  owner?: string | null;
  traits?: OpenSeaTrait[] | null;
}

interface OpenSeaNFTResponse {
  nfts: OpenSeaNFT[];
  next: string | null;
}

export interface CyborgPunkToken {
  tokenId: string;
  owner: Address;
  tokenURI: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  cyborgId?: string;
  faction?: string;
  gender?: string;
  hair?: string;
  accessory?: string;
  ability?: string;
  rarity?: NftRarity;
}

let collectionPromise: Promise<OpenSeaNFT[]> | null = null;

async function fetchCyborgPunks(): Promise<OpenSeaNFT[]> {
  const apiKey = process.env.OPENSEA_API_KEY;

  if (!apiKey) {
    console.error("OPENSEA_API_KEY is not configured");
    return [];
  }

  if (!collectionPromise) {
    collectionPromise = (async () => {
      const response = await fetch(
        `${OPEN_SEA_API_URL}/${CYBORG_PUNKS_CONTRACT}/nfts?limit=200`,
        {
          headers: {
            "X-API-KEY": apiKey,
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        const body = await response.text();
        console.error(`OpenSea API error ${response.status}: ${body}`);
        collectionPromise = null;
        return [];
      }

      const data = (await response.json()) as OpenSeaNFTResponse;

      return data.nfts;
    })().catch((error) => {
      collectionPromise = null;
      console.error("OpenSea CyborgPunks fetch failed:", error);
      return [];
    });
  }

  return collectionPromise;
}

function getTraitValue(
  traits: OpenSeaTrait[] | null | undefined,
  traitName: string,
): string | undefined {
  const trait = traits?.find(
    (item) =>
      item.trait_type?.trim().toLowerCase() === traitName.toLowerCase(),
  );

  return trait?.value !== undefined && trait?.value !== null
    ? String(trait.value)
    : undefined;
}

function normalizeRarity(value: string | undefined): NftRarity {
  const normalized = value?.trim().toLowerCase();

  switch (normalized) {
    case "common":
      return "common";
    case "rare":
      return "rare";
    case "super rare":
    case "super-rare":
    case "super_rare":
      return "super-rare";
    case "epic":
      return "epic";
    case "legendary":
      return "legendary";
    case "mythic":
      return "mythic";
    default:
      return "common";
  }
}

function mapCyborgPunk(nft: OpenSeaNFT): CyborgPunkToken {
  const rarityTrait = getTraitValue(nft.traits, "Rarity");

  return {
    tokenId: nft.identifier,
    owner: (nft.owner ??
      "0x0000000000000000000000000000000000000000") as Address,
    tokenURI: nft.metadata_url ?? "",
    name: nft.name ?? undefined,
    description: nft.description ?? undefined,
    imageUrl: nft.image_url ?? undefined,
 cyborgId: getTraitValue(nft.traits, "CYBORG ID"),
faction: getTraitValue(nft.traits, "FACTION"),
gender: getTraitValue(nft.traits, "GENDER"),
hair: getTraitValue(nft.traits, "HAIR"),
accessory: getTraitValue(nft.traits, "ACCESSORY"),
ability: getTraitValue(nft.traits, "ABILITY"),
rarity: normalizeRarity(rarityTrait),
  };
}

export async function getMintedTokenIds(): Promise<string[]> {
  const nfts = await fetchCyborgPunks();
  return nfts.map((nft) => nft.identifier);
}

export async function getLiveTokenIds(): Promise<string[]> {
  const nfts = await fetchCyborgPunks();
  return nfts.map((nft) => nft.identifier);
}

export async function getCyborgPunkToken(
  tokenId: string,
): Promise<CyborgPunkToken> {
  const nfts = await fetchCyborgPunks();
  const nft = nfts.find((item) => item.identifier === tokenId);

  if (!nft) {
    throw new Error(`CyborgPunk ${tokenId} was not found`);
  }

  return mapCyborgPunk(nft);
}

export async function getLiveCyborgPunks(): Promise<CyborgPunkToken[]> {
  try {
    const nfts = await fetchCyborgPunks();
    return nfts.map(mapCyborgPunk);
  } catch (error) {
    console.error("Failed to load live CyborgPunks:", error);
    return [];
  }
}
