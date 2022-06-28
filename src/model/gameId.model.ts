import { getModelForClass, prop } from '@typegoose/typegoose';

export class GameId {
  @prop({ required: true, unique: true })
  appid: number;

  @prop({ required: true })
  name: string;
}

const GameIdModel = getModelForClass(GameId);

export default GameIdModel;
