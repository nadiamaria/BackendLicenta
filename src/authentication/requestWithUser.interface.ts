import { Request } from 'express';
import { UserEntity } from 'src/Users/entities/user.entity';

 
interface RequestWithUser extends Request {
  user: UserEntity;
}
 
export default RequestWithUser;