import { Type } from 'class-transformer'
import { IsSrting, IsOptional, Max, Min } from 'class-validator'
import { CountryCode } from './trials.types'

export class TrialsQueryRequestDto {
  @IsOptional()
  @IsSrting()
  @Min(0)
  @Max(99999)
  @Type(() => String)
  readonly sponsor?: number

  @IsOptional()
  @IsSrting()
  @Min(0)
  @Max(2)
  @Type(() => CountryCode)
  readonly countryCode?: string
}
