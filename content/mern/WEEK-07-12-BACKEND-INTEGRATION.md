# Weeks 7-12: Backend Development & Capstone Integration

## Week 7-8: Node.js & Express Fundamentals

### Core Concepts

```typescript
// Express Server Setup
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### MongoDB & Mongoose [^1]

```typescript
import mongoose from 'mongoose';

// Schema definition with TypeScript
interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Don't return password by default
  },
  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Methods
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

// Usage
const user = await User.create({
  email: 'john@example.com',
  password: 'secret123',
  firstName: 'John'
});

const isValid = await user.comparePassword('secret123');
```

---

## Week 9-10: NestJS & Advanced Patterns

### NestJS Structure [^2]

```typescript
// main.ts - Entry point
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();

// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule
  ]
})
export class AppModule {}

// users/users.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: any) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
}

// users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

### Authentication in NestJS [^3]

```typescript
// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      password: hashedPassword
    });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { access_token: token };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      return null;
    }
  }
}

// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() { email, password }) {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() { email, password }) {
    return this.authService.login(email, password);
  }
}

// Protecting routes
@Controller('protected')
@UseGuards(JwtAuthGuard)
export class ProtectedController {
  @Get()
  getProtected(@Request() req) {
    return { message: `Hello ${req.user.email}` };
  }
}
```

---

## Week 11-12: Advanced Patterns & Capstone Integration

### Complex Queries [^4]

```typescript
// MongoDB Aggregation Pipeline
const userStats = await User.aggregate([
  {
    $match: { createdAt: { $gte: new Date('2024-01-01') } }
  },
  {
    $group: {
      _id: '$role',
      count: { $sum: 1 },
      avgAge: { $avg: '$age' }
    }
  },
  {
    $sort: { count: -1 }
  }
]);

// Population (joining data)
const user = await User.findById(userId).populate('applications');

// Pagination
const page = 1;
const limit = 10;
const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({ createdAt: -1 });
```

### Real-time Communication [^5]

```typescript
// WebSockets with Socket.io
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message', payload);
  }

  @SubscribeMessage('status')
  handleStatus(client: Socket, status: string): void {
    this.server.emit('userStatus', { userId: client.id, status });
  }
}
```

### Error Handling [^6]

```typescript
// Custom exceptions
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(
      `User with ID ${userId} not found`,
      HttpStatus.NOT_FOUND
    );
  }
}

// Global exception filter
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = (exception as any).getStatus?.() || 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: (exception as any).message || 'Internal server error'
    });
  }
}
```

---

## 🎯 Capstone Integration Strategy

### Week 7-8 Tasks
- [ ] Setup NestJS project with MongoDB
- [ ] Create authentication module
- [ ] Design database schemas
- [ ] Build API endpoints for your chosen project

### Week 9-10 Tasks
- [ ] Implement complex queries & validations
- [ ] Add authorization (permissions)
- [ ] Create admin endpoints
- [ ] Implement real-time features (if applicable)

### Week 11-12 Tasks
- [ ] Complete frontend integration
- [ ] Test all API endpoints
- [ ] Error handling & edge cases
- [ ] Documentation & deployment prep

---

## 📚 Citations

[^1]: Mongoose - https://mongoosejs.com
[^2]: NestJS Documentation - https://docs.nestjs.com
[^3]: Passport.js - https://www.passportjs.org
[^4]: MongoDB Aggregation - https://docs.mongodb.com/manual/aggregation/
[^5]: Socket.io - https://socket.io/docs
[^6]: NestJS Exception Handling - https://docs.nestjs.com/exception-filters

**Next**: Begin Capstone Project Development (Weeks 7-12)
