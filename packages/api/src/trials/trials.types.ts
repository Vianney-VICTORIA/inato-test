export interface ITrial {
  name: string
  country: CountryCode
  start_date: Date
  end_date: Date
  sponsor: string
  canceled: boolean
  study_type: string
  primary_purpose: string
}

export interface ITrialsQueryParams {
  sponsor?: string
  countryCode?: CountryCode
}

export enum CountryCode {
  France = 'FR',
  Spain = 'ES',
  Italy = 'IT',
  Germany = 'DE',
  Austria = 'AT'
}
