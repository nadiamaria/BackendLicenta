import { Request } from 'express';
import { UserEntity } from 'src/Users/entities/user.entity';
import LogInDto from './dto/log-in';

 
interface RequestWithUser extends Request {
  // user: UserEntity;
  user: LogInDto;
}
 
export default RequestWithUser;