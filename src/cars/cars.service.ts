import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
  ];

  public getAllCars() {
    return this.cars;
  }

  public getCarById(carId: number) {
    const car = this.cars.find((car) => car.id === carId);

    if (!car) {
      throw new HttpException(
        `Car with id ${carId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return car;
  }

  public createCar(car: any) {
    this.cars.push({
      ...car,
      id: this.cars.length + 1,
    });

    return car;
  }

  public updateCar(carId: number, car: any) {
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

  public deleteCar(carId: number) {
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
