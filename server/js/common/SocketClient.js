import Point from '@studiomoniker/point';

import { CLIENT_EVENTS, SERVER_EVENTS } from 'constants/emitEvents';
import {
  DEFAULT_BALL_SPEED,
} from 'constants/physics';

/**
 * represents a Client that is connected to this server
 *  simplifies some events
 */
class SocketClient {
  /**
   * @param {Socket}
   */
  constructor(socket) {
    this.socket = socket;

    this.attachGameEventHandler();
  }
  /**
   * attaches event listeners onto the socket
   */
  attachGameEventHandler() {
    this.socket.on(CLIENT_EVENTS.BALL_TO_END, this.handleBallToEnd.bind(this));

    this.socket.on(CLIENT_EVENTS.GAMESTATE_SEND, this.handleGamestateSend.bind(this));
  }
  /**
   * client has told us ball hit an end
   *  unfortunately the Point class doesn't get emitted properly so the data will only be {x, y}
   *
   */
  handleBallToEnd() {
    const newBallVelocity = new Point(DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED);

    // randomize directions
    if (Math.round(Math.random())) {
      newBallVelocity.invertX();
    };
    if (Math.round(Math.random())) {
      newBallVelocity.invertY();
    };

    // tell a player the ball is one direction,
    this.socket.emit(SERVER_EVENTS.BALL_RESET, newBallVelocity);

    // but the other player is inverted
    this.socket.broadcast.emit(SERVER_EVENTS.BALL_RESET, newBallVelocity.invertY());
  }
  /**
   * client has sent us a snapshot of their gamestate
   *
   * @params {*} data
   */
  handleGamestateSend(data) {
    // temporary implementation...
    const {primaryPlayerPos} = data;

    const newState = {
      ...data,
      secondaryPlayerPos: primaryPlayerPos,
    };

    this.socket.broadcast.emit(SERVER_EVENTS.GAMESTATE_CHANGED, newState);
  };
}

export default SocketClient;
