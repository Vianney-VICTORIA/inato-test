import { Test, TestingModule } from '@nestjs/testing'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { of } from 'rxjs'
import { TrialsService } from './trials.service'
import { ITrialsQueryParams, CountryCode, ITrial } from './trials.types'
import * as mockDataTrials from './sample-trials.json'

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
            get: jest.fn(() => of({ data: mockDataTrials }))
          }
        }
      ]
    }).compile()
    trialsService = module.get<TrialsService>(TrialsService)
    httpService = module.get<HttpService>(HttpService)
  })

  describe('getThirdPartyTrials', () => {
    it('should fetch third-party trials successfully', async () => {
      const response = {
        data: mockDataTrials,
        status: 200,
        statusText: 'OK'
      } as AxiosResponse<any>
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response))
      const result = await trialsService.getThirdPartyTrials()
      expect(result).toEqual(response.data)
    })

    it('should handle errors when fetching third-party trials', async () => {
      const error = new Error('Error while fetching trials')
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw error
      })
      await expect(trialsService.getThirdPartyTrials()).rejects.toThrowError(error)
    })
  })

  describe('filterOngoingTrials', () => {
    it('should correctly filter ongoing trials', () => {
      const rawDataTrials: ITrial[] = mockDataTrials as unknown as ITrial[]
      const result = trialsService.filterOngoingTrials(rawDataTrials)
      const expectedFilteredTrials = [
        {
          name: 'Olaparib + Sapacitabine in BRCA Mutant Breast Cancer',
          country: 'FR',
          start_date: '2019-01-01',
          end_date: '2025-08-01',
          sponsor: 'Sanofi',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        },
        {
          name: 'Topical Calcipotriene Treatment for Breast Cancer Immunoprevention',
          country: 'fr',
          start_date: '2018-03-20',
          end_date: '2032-09-10',
          sponsor: 'Sanofi',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        },
        {
          name: 'Supine MRI in Breast Cancer Patients Receiving Neoadjuvant Therapy',
          country: 'IT',
          start_date: '2022-06-15',
          end_date: '2030-12-24',
          sponsor: 'AstraZeneca',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        },
        {
          name: 'Neratinib +/- Fulvestrant in HER2+, ER+ Metastatic Breast Cancer',
          country: 'DE',
          start_date: '2016-03-08',
          end_date: '2026-10-10',
          sponsor: 'AstraZeneca',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        }
      ]
      expect(result).toEqual(expectedFilteredTrials)
    })
  })

  describe('filterTrialsBySponsor', () => {
    it('should correctly filter trials by sponsor', () => {
      const rawDataTrials: ITrial[] = mockDataTrials as unknown as ITrial[]
      const sponsorToFilter = 'Sanofi'
      let result = trialsService.filterOngoingTrials(rawDataTrials)
      result = trialsService.filterTrialsBySponsor(result, sponsorToFilter)
      const expectedFilteredTrials = [
        {
          name: 'Olaparib + Sapacitabine in BRCA Mutant Breast Cancer',
          country: 'FR',
          start_date: '2019-01-01',
          end_date: '2025-08-01',
          sponsor: 'Sanofi',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        },
        {
          name: 'Topical Calcipotriene Treatment for Breast Cancer Immunoprevention',
          country: 'fr',
          start_date: '2018-03-20',
          end_date: '2032-09-10',
          sponsor: 'Sanofi',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        }
      ]
      expect(result).toEqual(expectedFilteredTrials)
    })
  })

  describe('filterTrialsByCountryCode', () => {
    it('should correctly filter trials by country code', () => {
      const rawDataTrials: ITrial[] = mockDataTrials as unknown as ITrial[]
      const countryCodeToFilter = 'DE' as CountryCode
      const result = trialsService.filterTrialsByCountryCode(rawDataTrials, countryCodeToFilter)
      const expectedFilteredTrials = [
        {
          name: 'Neratinib +/- Fulvestrant in HER2+, ER+ Metastatic Breast Cancer',
          country: 'DE',
          start_date: '2016-03-08',
          end_date: '2026-10-10',
          sponsor: 'AstraZeneca',
          canceled: false,
          study_type: 'interventional',
          primary_purpose: 'treatment'
        }
      ]
      expect(result).toEqual(expectedFilteredTrials)
    })
  })

  describe('getTrials', () => {
    it('should return empty array if no trials found', async () => {
      const queryParams = { sponsor: 'Nonexistent Company', countryCode: 'FR' } as ITrialsQueryParams
      const emptyTrials: ITrial[] = mockDataTrials as unknown as ITrial[]
      jest.spyOn(trialsService, 'getThirdPartyTrials').mockResolvedValue(emptyTrials)
      const result = await trialsService.getTrials(queryParams)
      expect(result).toEqual([])
    })
  })
})
