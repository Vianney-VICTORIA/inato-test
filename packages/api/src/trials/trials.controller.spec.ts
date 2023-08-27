import { Test, TestingModule } from '@nestjs/testing'
import { HttpService } from '@nestjs/axios'
import { TrialsService } from './trials.service'
import { ITrialsQueryParams, CountryCode, ITrial } from './trials.types'

describe('TrialsService', () => {
  let trialsService: TrialsService
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrialsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    }).compile()

    trialsService = module.get<TrialsService>(TrialsService)
    httpService = module.get<HttpService>(HttpService)
  })

  describe('getThirdPartyTrials', () => {
    it('should fetch third-party trials successfully', async () => {
      const responseData = 'mocked data' // Replace with your own mock data
      const axiosResponse = { data: responseData }
      jest.spyOn(httpService, 'get').mockResolvedValue(axiosResponse)
      const result = await trialsService.getThirdPartyTrials()
      expect(result).toEqual(responseData)
    })

    it('should handle errors when fetching third-party trials', async () => {
      const error = new Error('Failed to fetch trials')
      jest.spyOn(httpService, 'get').mockRejectedValue(error)

      await expect(trialsService.getThirdPartyTrials()).rejects.toThrowError(error)
    })
  })

  describe('filterOngoingTrials', () => {
    it('should correctly filter ongoing trials', () => {
      const rawDataTrials = []
      const result = trialsService.filterOngoingTrials(rawDataTrials)
      const expectedFilteredTrials = []
      expect(result).toEqual(expectedFilteredTrials)
    })
  })

  describe('filterTrialsBySponsor', () => {
    it('should correctly filter trials by sponsor', () => {
      const rawDataTrials = []
      const sponsorToFilter = 'Sanofi'
      const result = trialsService.filterTrialsBySponsor(rawDataTrials, sponsorToFilter)
      const expectedFilteredTrials = [{ sponsor: 'Company A' /* other properties */ }]
      expect(result).toEqual(expectedFilteredTrials)
    })
  })

  describe('filterTrialsByCountryCode', () => {
    it('should correctly filter trials by country code', () => {
      const rawDataTrials = []
      const countryCodeToFilter = 'FR' as CountryCode
      const result = trialsService.filterTrialsByCountryCode(rawDataTrials, countryCodeToFilter)
      const expectedFilteredTrials = [{ country: 'US' /* other properties */ }]
      expect(result).toEqual(expectedFilteredTrials)
    })
  })

  describe('getTrials', () => {
    it('should return filtered trials based on query parameters', async () => {
      const queryParams = { sponsor: 'Company A', countryCode: 'FR' } as ITrialsQueryParams
      const rawDataTrials = []
      jest.spyOn(trialsService, 'getThirdPartyTrials').mockResolvedValue(rawDataTrials)
      jest.spyOn(trialsService, 'filterTrials').mockReturnValue(rawDataTrials)
      const result = await trialsService.getTrials(queryParams)
      expect(result).toEqual(rawDataTrials)
    })

    it('should return empty array if no trials found', async () => {
      const queryParams = { sponsor: 'Nonexistent Company', countryCode: 'FR' } as ITrialsQueryParams
      const emptyTrials = []
      jest.spyOn(trialsService, 'getThirdPartyTrials').mockResolvedValue(emptyTrials)
      const result = await trialsService.getTrials(queryParams)
      expect(result).toEqual([])
    })
  })
})
