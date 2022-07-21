import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username } = req.body;
    await waitTime(2000);
    if (password === 'xiaohuoni' && username === 'antd.mobile') {
      res.send({
        message: 'ok',
        success: true,
      });
      return;
    }
    res.send({
      message: 'login error',
      success: false,
    });
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
};
