import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/databases/PrismaService';

@Injectable()
export class PayableService {
  constructor(private ORM: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    const { emissionDate, ...rest } = createPayableDto;
    const formattedEmissionDate = new Date(emissionDate);

    const payable = await this.ORM.payable.create({
      data: {
        ...rest,
        emissionDate: formattedEmissionDate,
      },
    });

    if (!payable) throw new BadRequestException(`Payable can't be created`);

    return payable;
  }

  async findAll() {
    const payables = await this.ORM.payable.findMany();

    if (!payables) throw new NotFoundException(`Payables not found`);

    return payables;
  }

  async findOne(id: string) {
    const payableExists = await this.ORM.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payableExists)
      throw new NotFoundException(`Payable with ID ${id} not found`);

    return payableExists;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    await this.findOne(id);

    const updatePayable = await this.ORM.payable.update({
      data: updatePayableDto,
      where: { id },
    });

    if (!updatePayable)
      throw new NotFoundException(`Payable with ID ${id} not found`);

    return updatePayable;
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.ORM.payable.delete({ where: { id } });
  }
}
