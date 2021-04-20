import { Request } from 'express';
import LogInDto from './dto/log-in';

interface RequestWithUser extends Request {
  user: LogInDto;
}

export default RequestWithUser;
