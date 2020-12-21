import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Red Bay',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  private getIndex(id: string) {
    return this.coffees.findIndex((item) => item.id === +id);
  }

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    let existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const coffeeIndex = this.getIndex(id);
      existingCoffee = {
        ...existingCoffee,
        ...updateCoffeeDto,
      };
      this.coffees.splice(coffeeIndex, 1, existingCoffee);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.getIndex(id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
