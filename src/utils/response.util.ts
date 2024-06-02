import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

class ResponseUtil {
  private _res: Response;
  private _status: HttpStatus;
  private readonly _errorResponse: any;
  private _message: string;
  private _data: any;

  constructor(res: Response) {
    this._res = res;
    this._status = HttpStatus.OK;
    this._errorResponse = {};
    this._message = '';
    this._data = null;
  }

  setStatus = (status: HttpStatus): this => {
    this._status = status;
    return this;
  };

  setMessage = (message: string): this => {
    this._message = message;
    return this;
  };

  setData = (data: any): this => {
    this._data = data;
    return this;
  };

  setError = (error: any): this => {
    switch (typeof error) {
      case 'string':
        this._errorResponse.message = error;
        this._errorResponse.details = [];
        break;
      case 'object':
        this._errorResponse.message = error.name;
        this._errorResponse.details = error.stack;
        break;
      default:
        this._errorResponse.message = 'unknown error occurred';
        this._errorResponse.details = error;
        break;
    }
    return this;
  };

  send = (): void => {
    if (this._message === '') {
      this._message =
        Object.keys(HttpStatus).find(
          (key) => HttpStatus[key] === this._status,
        ) || '';
    }

    this._res.status(this._status).json({
      message: this._message,
      data: this._data,
      error: this._errorResponse,
    });
  };
}

export default ResponseUtil;
