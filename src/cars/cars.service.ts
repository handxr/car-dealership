import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

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

  public updateCar(carId: string, updateCarDto: UpdateCarDto) {
    const car = this.cars.find((car) => car.id === carId);

    if (!car) {
      throw new HttpException(
        `Car with id ${carId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const index = this.cars.findIndex((car) => car.id === carId);

    this.cars[index] = {
      ...car,
      ...updateCarDto,
    };

    return this.cars[index];
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

  public fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
