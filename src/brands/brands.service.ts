import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    const updatedBrand = {
      ...brand,
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    };

    this.brands = this.brands.map((brand) =>
      brand.id === id ? updatedBrand : brand,
    );

    return updatedBrand;
  }

  remove(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    this.brands = this.brands.filter((brand) => brand.id !== id);

    return this.brands;
  }

  public fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
