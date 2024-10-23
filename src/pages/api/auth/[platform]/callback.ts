import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { platform } = req.query;
  const { code } = req.query;

  if (!code || !platform) {
    return res.status(400).json({ error: 'Code ou plateforme manquant' });
  }

  try {
    // Page HTML qui envoie un message à la fenêtre parent et se ferme
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'OAUTH_CALLBACK', platform: '${platform}', code: '${code}' }, '*');
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Erreur callback OAuth:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
}