import { Transform, Type } from 'class-transformer'
import { IsString, IsOptional, Max, Min, IsEnum } from 'class-validator'
import { CountryCode } from '../trials.types'

export class TrialsQueryRequestDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly sponsor?: string

  @IsOptional()
  @IsString()
  @IsEnum(CountryCode)
  readonly countryCode?: CountryCode
}
