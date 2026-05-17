import { PartialType } from '@nestjs/swagger';
import { CreatePharmacyDoctorDto } from './create-pharmacy-doctor.dto';
export class UpdatePharmacyDoctorDto extends PartialType(CreatePharmacyDoctorDto) {}
