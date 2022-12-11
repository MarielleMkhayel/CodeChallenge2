import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../users/user.model';
import { ComplaintStatus } from '../types/types';

export type ComplaintDocument = HydratedDocument<Complaint>;

@Schema()
export class Complaint{
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    body: string; 

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'} )
    user: User;

    @Prop({required: true, default: ComplaintStatus.PENDING})
    status: ComplaintStatus;

    @Prop({default: Date.now()})
    createdAt: Date
}

const ComplaintSchema = SchemaFactory.createForClass(Complaint);

ComplaintSchema.index({createdAt: 1});
export {ComplaintSchema};
