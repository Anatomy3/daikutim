import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body;
      
      // Temukan user
      const user = await prisma.employee.findUnique({
        where: { id: Number(userId) },
      });

      if (user) {
        // Catat aktivitas logout
        await prisma.userActivity.create({
          data: {
            employeeId: user.id,
            description: `${user.fullName || user.username} melakukan logout`
          }
        });

        res.status(200).json({ message: 'Logout successful' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}