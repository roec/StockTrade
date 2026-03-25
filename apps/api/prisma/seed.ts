import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({ where: { email: 'demo@stock.local' }, create: { email: 'demo@stock.local', name: 'Demo User' }, update: {} });
  await prisma.watchlist.create({ data: { userId: user.id, name: '核心观察', type: '自选股', symbols: ['600519.SH', '000001.SZ'] } });
}

main().finally(async () => prisma.$disconnect());
