import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Get(':carId')
  getCarById(@Param('carId', ParseUUIDPipe) carId: string) {
    return this.carsService.getCarById(carId);
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  @Patch(':carId')
  updateCar(@Param('carId', ParseUUIDPipe) carId: string, @Body() car: Car) {
    return this.carsService.updateCar(carId, car);
  }

  @Delete(':carId')
  deleteCar(@Param('carId', ParseUUIDPipe) carId: string) {
    return this.carsService.deleteCar(carId);
  }
}
