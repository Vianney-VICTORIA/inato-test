#! /usr/bin/env node

import { program } from 'commander'
import { textSync } from 'figlet'

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

const getTrials = async (
  path: string,
  options?:
    | {
        sponsor?: string
        countryCode?: string
        table?: boolean
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

    const response = await fetch(`http://localhost:3000/${apiPath}`)

    const dataTrials = await response.json().then((data) => {
      return data.data
    })

    if (options?.table) {
      const formatedResponse = dataTrials.map(async (trial: ITrial) => {
        const { name, country, start_date, end_date, sponsor, canceled, study_type, primary_purpose } = trial
        return {
          name,
          country,
          start_date,
          end_date,
          sponsor,
          canceled,
          study_type,
          primary_purpose
        }
      })
      console.table(await Promise.all(formatedResponse))
    } else {
      console.log(dataTrials)
    }
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
  // add action that call async function with 2 parameters: path and options where options can be optional
  .action(async (path, options?: { sponsor?: string; countryCode?: string; table?: boolean }) => {
    await getTrials(path, options)
  })
  .parseAsync(process.argv)
