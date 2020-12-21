import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string; // readonly is for immutability

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
