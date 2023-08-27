export interface ITrialsParams {
  sponsor?: string
  countryCode?: CountryCode
}

export enum CountryCode {
  FR = 'France',
  ES = 'Spain',
  IT = 'Italy',
  DE = 'Germany',
  AT = 'Austria'
}
