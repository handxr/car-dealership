import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
  ];

  public getAllCars() {
    return this.cars;
  }

  public getCarById(carId: string) {
    const car = this.cars.find((car) => car.id === carId);

    if (!car) {
      throw new HttpException(
        `Car with id ${carId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return car;
  }

  public createCar(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(newCar);

    return newCar;
  }

  public updateCar(carId: string, car: any) {
    const index = this.cars.findIndex((car) => car.id === carId);

    if (index === -1) {
      throw new HttpException(
        `Car with id ${carId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.cars[index] = car;

    return car;
  }

  public deleteCar(carId: string) {
    const index = this.cars.findIndex((car) => car.id === carId);

    if (index === -1) {
      throw new HttpException(
        `Car with id ${carId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.cars.splice(index, 1);

    return this.cars;
  }
}
