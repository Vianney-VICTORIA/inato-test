import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ITrialsQueryParams, CountryCode, ITrial } from './trials.types'

@Injectable()
export class TrialsService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Get the Trials from the third party API
   * Then filter the trials
   * @returns ITrial[]
   * @param queryParams: ITrialsQueryParams
   */
  async getTrials(queryParams: ITrialsQueryParams): Promise<ITrial[]> {
    const allTrials = await this.getThirdPartyTrials().then((result) => {
      return result
    })
    const result = this.filterTrials(allTrials, queryParams)
    return result
  }

  /**
   * Get the Trials from the third party API
   * @returns ITrial[]
   * @throws Error
   */
  async getThirdPartyTrials(): Promise<ITrial[]> {
    try {
      const data = await this.httpService
        .get('https://raw.githubusercontent.com/inato/senior-take-home-test/main/trials.json')
        .toPromise()
        .then((response) => {
          return response.data
        })
      return data
    } catch (error) {
      throw new Error('Error while fetching trials')
    }
  }

  /**
   * Master Filter the Trials per date and status then per sponsor and country code
   * @param rawDataTrials: ITrial[]
   * @param queryParams: ITrialsQueryParams
   * @returns ITrial[]
   */
  filterTrials(rawDataTrials: ITrial[], queryParams: ITrialsQueryParams): ITrial[] {
    if (rawDataTrials.length === 0) {
      return []
    } else {
      // Filter the Trials per date and status
      let result = this.filterOngoingTrials(rawDataTrials)

      // Filter the Trials per sponsor and country code
      if (queryParams.sponsor) {
        result = this.filterTrialsBySponsor(result, queryParams.sponsor)
      }
      if (queryParams.countryCode) {
        result = this.filterTrialsByCountryCode(result, queryParams.countryCode)
      }
      return result
    }
  }

  /**
   * Filter the Trials per date and status
   * A trial is _ongoing_ if:
   * - its start date is in the past
   * - its end date is in the future
   * - it has not been canceled
   * @param rawDataTrials: ITrial[]
   * @returns ITrial[]
   */
  filterOngoingTrials(rawDataTrials: ITrial[]): ITrial[] {
    const filterOngoingTrials = rawDataTrials.filter((trial) => {
      const startDate = new Date(trial.start_date)
      const endDate = new Date(trial.end_date)
      const today = new Date()
      return startDate < today && endDate > today && !trial.canceled
    })
    return filterOngoingTrials
  }

  /**
   * Filter the Trials per sponsor QueryParam
   * @param rawDataTrials: ITrial[]
   * @param sponsor: string
   */
  filterTrialsBySponsor(rawDataTrials: ITrial[], sponsor: string): ITrial[] {
    const filterTrialsBySponsor = rawDataTrials.filter((trial) => {
      return trial.sponsor === sponsor
    })
    return filterTrialsBySponsor
  }

  /**
   * Filter the Trials per countryCode QueryParam
   * @param rawDataTrials: ITrial[]
   * @param countryCode: CountryCode
   */
  filterTrialsByCountryCode(rawDataTrials: ITrial[], countryCode: CountryCode): ITrial[] {
    const filterTrialsByCountryCode = rawDataTrials.filter((trial) => {
      return trial.country === countryCode
    })
    return filterTrialsByCountryCode
  }
}
