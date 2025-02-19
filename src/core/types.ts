import { NeynarFrameValidationInternalModel } from '../utils/neynar/frame/types';
import { Address } from 'viem';
/**
 * Frame Data
 *
 * Note: exported as public Type
 */
export interface FrameData {
  buttonIndex: number;
  castId: {
    fid: number;
    hash: string;
  };
  inputText: string;
  fid: number;
  messageHash: string;
  network: number;
  timestamp: number;
  url: string;
}

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export interface FrameRequest {
  untrustedData: FrameData;
  trustedData: {
    messageBytes: string;
  };
}

/**
 * Simplified Object model with the raw Neynar data if-needed.
 */
export interface FrameValidationData {
  button: number; // Number of the button clicked
  following: boolean; // Indicates if the viewer clicking the frame follows the cast author
  input: string; // Text input from the viewer typing in the frame
  interactor: {
    fid: number; // Viewer Farcaster ID
    custody_address: string; // Viewer custody address
    verified_accounts: string[]; // Viewer account addresses
  };
  liked: boolean; // Indicates if the viewer clicking the frame liked the cast
  raw: NeynarFrameValidationInternalModel;
  recasted: boolean; // Indicates if the viewer clicking the frame recasted the cast
  valid: boolean; // Indicates if the frame is valid
}

export type FrameValidationResponse =
  | { isValid: true; message: FrameValidationData }
  | { isValid: false; message: undefined };

export function convertToFrame(json: any) {
  return {
    fid: json.fid,
    url: json.frameActionBody?.url.toString(),
    messageHash: json.messageHash,
    timestamp: json.timestamp,
    network: json.network,
    buttonIndex: json.frameActionBody?.buttonIndex,
    castId: {
      fid: json.frameActionBody?.castId?.fid,
      hash: json.frameActionBody?.castId?.hash,
    },
  };
}

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameButtonMetadata =
  | {
      action: 'link' | 'mint';
      label: string;
      target: string;
    }
  | {
      action?: 'post' | 'post_redirect';
      label: string;
    };

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameInputMetadata = {
  text: string;
};

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameImageMetadata = {
  src: string;
  aspectRatio?: '1.91:1' | '1:1';
};

/**
 * Frame Request
 *
 * Note: exported as public Type
 */
export type FrameMetadataType = {
  buttons?: [FrameButtonMetadata, ...FrameButtonMetadata[]];
  image: string | FrameImageMetadata;
  input?: FrameInputMetadata;
  /** @deprecated Prefer `postUrl` */
  post_url?: string;
  postUrl?: string;
  /** @deprecated Prefer `refreshPeriod` */
  refresh_period?: number;
  refreshPeriod?: number;
};

/**
 * Frame Metadata Response
 *
 * Note: exported as public Type
 */
export type FrameMetadataResponse = Record<string, string>;

/**
 * Ethereum Attestation Service (EAS) Attester Address
 * The Ethereum address of the attester who created the attestation.
 */
type EASAttesterAddress = Address;

/**
 * Ethereum Attestation Service (EAS) Schema Uid
 * The schema identifier associated with the EAS attestation.
 * Note: exported as public Type
 */
export type EASSchemaUid = Address;

/**
 * Ethereum Attestation Service (EAS) Attestation
 * GraphQL response for EAS Attestation
 * Note: exported as public Type
 */
export type EASAttestation = {
  attester: EASAttesterAddress; // the attester who created the attestation.
  decodedDataJson: string; // The attestation data decoded to JSON.
  expirationTime: number; // The Unix timestamp when the attestation expires (0 for no expiration).
  id: string; // The unique identifier of the attestation.
  recipient: Address; // The Ethereum address of the recipient of the attestation.
  revocationTime: number; // The Unix timestamp when the attestation was revoked, if applicable.
  revoked: boolean; // A boolean indicating whether the attestation is revocable or not.
  schemaId: EASSchemaUid; // The schema identifier associated with the attestation.
  time: number; // The Unix timestamp when the attestation was created.
};

/**
 * Ethereum Attestation Service (EAS) Chain Definition
 * The definition of a blockchain chain supported by EAS attestations.
 * Note: exported as public Type
 */
export type EASChainDefinition = {
  easGraphqlAPI: string; // EAS GraphQL API endpoint
  id: number; // blockchain source id
  schemaUids: EASSchemaUid[]; // Array of EAS Schema UIDs
};
