import { Type, Transform } from 'class-transformer'
import { IsString, IsOptional, IsEnum } from 'class-validator'
import { CountryCode } from '../trials.types'

export class TrialsQueryRequestDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly sponsor?: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(CountryCode)
  readonly countryCode?: CountryCode
}
