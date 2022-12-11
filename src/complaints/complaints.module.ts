import { Module} from '@nestjs/common';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintSchema } from './complaint.model';
import { User, UserSchema } from '../users/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Complaint.name, schema: ComplaintSchema}]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService]
})
export class ComplaintsModule {}


