import { Triple, Term } from "./Triple";

// FIXME: Better types?
export type Request = object;
export type Response = object;
export type Error = object | string;

export interface ResponseError {
  type?: string;
  message: string;
}

export interface RequestMessage {
  id: string;
  service: string;
  request: Request;
  flow?: string;
}

export interface ApiResponse {
  id: string;
  response: Response;
}

export interface Metadata {
  id?: string;
  metadata?: Triple[];
  user?: string;
  collection?: string;
}

export interface EntityEmbeddings {
  entity?: Term;
  vectors?: number[][];
}

export interface GraphEmbeddings {
  metadata?: Metadata;
  entities?: EntityEmbeddings[];
}

export interface TextCompletionRequest {
  system: string;
  prompt: string;
  streaming?: boolean;
}

export interface TextCompletionResponse {
  response: string;
  // Streaming fields
  end_of_stream?: boolean;
  error?: {
    message: string;
    type?: string;
  };
  // Token usage (appears in final message)
  in_token?: number;
  out_token?: number;
  model?: string;
}

export interface GraphRagRequest {
  query: string;
  user?: string;
  collection?: string;
  "entity-limit"?: number; // Default: 50
  "triple-limit"?: number; // Default: 30
  "max-subgraph-size"?: number; // Default: 1000
  "max-path-length"?: number; // Default: 2
  streaming?: boolean;
}

export interface GraphRagResponse {
  response: string;
  // Streaming fields
  chunk?: string;
  end_of_stream?: boolean;
  error?: {
    message: string;
    type?: string;
  };
  // Token usage (appears in final message)
  in_token?: number;
  out_token?: number;
  model?: string;
}

export interface DocumentRagRequest {
  query: string;
  user?: string;
  collection?: string;
  "doc-limit"?: number; // Default: 20
  streaming?: boolean;
}

export interface DocumentRagResponse {
  response: string;
  // Streaming fields
  chunk?: string;
  end_of_stream?: boolean;
  error?: {
    message: string;
    type?: string;
  };
  // Token usage (appears in final message)
  in_token?: number;
  out_token?: number;
  model?: string;
}

export interface AgentRequest {
  question: string;
  user?: string;
  streaming?: boolean;
}

export interface AgentResponse {
  // Streaming response format (new protocol)
  chunk_type?: "thought" | "action" | "observation" | "answer" | "final-answer" | "error";
  content?: string;
  end_of_message?: boolean;
  end_of_dialog?: boolean;

  // Legacy fields for backward compatibility with non-streaming
  thought?: string;
  observation?: string;
  answer?: string;
  error?: ResponseError;

  // Token usage (appears in final message)
  in_token?: number;
  out_token?: number;
  model?: string;
}

export interface EmbeddingsRequest {
  text: string;
}

export interface EmbeddingsResponse {
  vectors: number[][];
}

export interface GraphEmbeddingsQueryRequest {
  vectors: number[][];
  limit: number;
  user?: string;
  collection?: string;
}

export interface GraphEmbeddingsQueryResponse {
  entities: Term[];
}

export interface TriplesQueryRequest {
  s?: Term;
  p?: Term;
  o?: Term;
  limit: number;
  user?: string;
  collection?: string;
}

export interface TriplesQueryResponse {
  response: Triple[];
}

export interface ObjectsQueryRequest {
  query: string;
  user?: string;
  collection?: string;
  variables?: Record<string, unknown>;
  operation_name?: string;
}

export interface ObjectsQueryResponse {
  data?: Record<string, unknown>;
  errors?: Record<string, unknown>[];
  extensions?: Record<string, unknown>;
  values?: unknown[];
}

export interface NlpQueryRequest {
  question: string;
  max_results?: number;
}

export interface NlpQueryResponse {
  graphql_query?: string;
  variables?: Record<string, unknown>;
  detected_schemas?: Record<string, unknown>[];
  confidence?: number;
}

export interface StructuredQueryRequest {
  question: string;
  user?: string;
  collection?: string;
}

export interface StructuredQueryResponse {
  data?: Record<string, unknown>;
  errors?: Record<string, unknown>[];
}

export interface LoadDocumentRequest {
  id?: string;
  data: string;
  metadata?: Triple[];
}

export type LoadDocumentResponse = void;

export interface LoadTextRequest {
  id?: string;
  text: string;
  charset?: string;
  metadata?: Triple[];
}

export type LoadTextResponse = void;

export interface DocumentMetadata {
  id?: string;
  time?: number;
  kind?: string;
  title?: string;
  comments?: string;
  metadata?: Triple[];
  user?: string;
  tags?: string[];
}

export interface ProcessingMetadata {
  id?: string;
  "document-id"?: string;
  time?: number;
  flow?: string;
  user?: string;
  collection?: string;
  tags?: string[];
}

export interface LibraryRequest {
  operation: string;
  "document-id"?: string;
  "processing-id"?: string;
  "document-metadata"?: DocumentMetadata;
  "processing-metadata"?: ProcessingMetadata;
  content?: string;
  user?: string;
  collection?: string;
  metadata?: Triple[];
  id?: string;
  flow?: string;
}

export interface LibraryResponse {
  error: Error;
  "document-metadata"?: DocumentMetadata;
  content?: string;
  "document-metadatas"?: DocumentMetadata[];
  "processing-metadata"?: ProcessingMetadata;
}

export interface KnowledgeRequest {
  operation: string;
  user?: string;
  id?: string;
  flow?: string;
  collection?: string;
  triples?: Triple[];
  "graph-embeddings"?: GraphEmbeddings;
}

export interface KnowledgeResponse {
  error?: Error;
  ids?: string[];
  eos?: boolean;
  triples?: Triple[];
  "graph-embeddings"?: GraphEmbeddings;
}

export interface FlowRequest {
  operation: string;
  "blueprint-name"?: string;
  "blueprint-definition"?: string;
  description?: string;
  "flow-id"?: string;
  parameters?: Record<string, unknown>;
  user?: string;
}

export interface FlowResponse {
  "blueprint-names"?: string[];
  "flow-ids"?: string[];
  ids?: string[];
  flow?: string;
  "blueprint-definition"?: string;
  description?: string;
  error?:
    | {
        message?: string;
      }
    | Error;
}

export interface PromptRequest {
  id: string;
  terms: Record<string, unknown>;
  streaming?: boolean;
}

export interface PromptResponse {
  text: string;
  // Streaming fields
  end_of_stream?: boolean;
  error?: {
    message: string;
    type?: string;
  };
  // Token usage (appears in final message)
  in_token?: number;
  out_token?: number;
  model?: string;
}

export type ConfigRequest = object;
export type ConfigResponse = object;
