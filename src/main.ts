import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices'
import {ConfigService} from '@nestjs/config'
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule)
  const configserv= app.get(ConfigService)

  const USER= configserv.get('RABBITMQ_USER')
  const PASSWORD= configserv.get('RABBITMQ_PASS')
  const HOST= configserv.get('RABBITMQ_HOST')
  const QUEUE= configserv.get('RABBITMQ_AUTH_QUEUE')

  app.connectMicroservice<MicroserviceOptions>({
    transport:Transport.RMQ,
    options:{
      urls:[`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck:false,
      queue: QUEUE,
      queueOptions:{
        durable:false
      }
    }
  })

  app.startAllMicroservices();
}
bootstrap();
