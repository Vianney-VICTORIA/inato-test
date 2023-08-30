#! /usr/bin/env node

import { program } from 'commander'
import { textSync } from 'figlet'
import * as process from 'process'

interface ITrial {
  name: string
  country: string
  start_date: Date
  end_date: Date
  sponsor: string
  canceled: boolean
  study_type: string
  primary_purpose: string
}

enum CountryCode {
  France = 'FR',
  Spain = 'ES',
  Italy = 'IT',
  Germany = 'DE',
  Austria = 'AT'
}

const API_URL = process.env.API_URL || 'http://localhost:3000/'

/**
 * Method to map the CountryCode enum to the countryCode from the API and transform the Key as a string
 * @param countryCodeElement
 */
const utlisMapCountryCode = (countryCodeElement: string) => {
  const indexOfS = Object.values(CountryCode).indexOf(countryCodeElement as unknown as CountryCode)
  return Object.keys(CountryCode)[indexOfS]
}

/**
 * Method to get the trials from the API
 * @param path the path to call in the API
 * @param options
 */
const getTrials = async (
  path: string,
  options?:
    | {
        sponsor?: string
        countryCode?: CountryCode
      }
    | undefined
) => {
  try {
    let apiPath = path

    if (options?.sponsor) {
      apiPath = `${apiPath}?sponsor=${options.sponsor}`
    }

    if (options?.countryCode) {
      apiPath = `${apiPath}?countryCode=${options.countryCode}`
    }

    const response = await fetch(`${API_URL}${apiPath}`)

    const dataTrials = await response.json().then((data) => {
      return data.data
    })

    const formatedResponse = dataTrials.map(async (trial: ITrial) => {
      const countryName = utlisMapCountryCode(trial.country)
      return `${trial.name} , ${countryName}`
    })

    console.log(await Promise.all(formatedResponse))
  } catch (error) {
    console.error('Error occurred while fetching the data!', error)
  }
}

console.log(textSync('Inato CLI', { horizontalLayout: 'full' }))

program.name('inato-cli').description('CLI to Inato').version('1.0.0')

program
  .command('trials')
  .description('Get a list of clinical trials')
  .argument('<path>', 'the path to the api')
  .option('-s, --sponsor <string>', 'Filter by sponsor name')
  .option('-c, --countryCode <string>', 'Filter by country code')
  .option('-t, --table <boolean>', 'Display the result in a table')
  .option('-d, --detailed <boolean>', 'Display the detailed data of the trial')
  // add action that call async function with 2 parameters: path and options where options can be optional
  .action(async (path, options?: { sponsor?: string; countryCode?: CountryCode; table?: boolean }) => {
    await getTrials(path, options)
  })
  .parseAsync(process.argv)
