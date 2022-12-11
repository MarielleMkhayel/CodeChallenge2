import {IsEnum} from 'class-validator';
import { ComplaintStatus } from '../../types/types';

export class UpdateComplaintDto{

    @IsEnum(ComplaintStatus)
    status: ComplaintStatus

;}