import { Request, Response } from 'express';

export default {
  'POST /api/hello': {
    text: 'Alita',
  },
  'POST /api/menu': (req: Request, res: Response) => {
    const defaultMenus = [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        children: [
          {
            path: '/welcome',
            name: 'one',
            icon: 'smile',
            children: [
              {
                path: '/welcome/welcome',
                name: 'two',
                icon: 'smile',
                exact: true,
              },
            ],
          },
        ],
      },
      {
        path: '/home',
        name: 'demo',
        icon: 'heart',
      },
    ];
    return res.json(defaultMenus);
  },
};
