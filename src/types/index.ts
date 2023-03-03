export interface Translation {
  id: string
  createdAt: string
  updatedAt: string
  from: string
  to: string
  notes: string
}

export interface ApiResponse {
  data: Translation[]
  statusCode: number
}

export interface ReadApiResponse extends ApiResponse {
  total: number
  totalPages: number
  currentPage: number
}

export interface CreateApiResponse extends Omit<ApiResponse, 'data'> {
  data: Translation
}

export interface DeleteApiResponse extends CreateApiResponse {}
export interface UpdateApiResponse extends CreateApiResponse {}

export interface FetchPayload {
  page?: number
  limit?: string
}

export interface Payload {
  from: string
  to: string
  notes?: string
}
