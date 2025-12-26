import { createServer, Page } from 'ionbeam';
import type { Request, Response } from 'express';
import './global.css';

const app = createServer();

app.get('/', async (req: Request, res: Response) => {
  await req.ionbeam.render(
    <Page title="Home Page">
      <h1>Home Page</h1>
      <p>Built with IonBeam - A flexible React SSR framework</p>
    </Page>
  );
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
