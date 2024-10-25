import Stripe from 'stripe';

export default async function filterOrderIds(ids: string[], userId?: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const limit = ids.length;

  if (limit > 100 || !userId) return [];

  let query = '';
  ids.forEach((id, index) => {
    query += `metadata["orderId"]:"${id}"`;
    if (index !== ids.length - 1) query += ' OR ';
  });

  if (!query) return [];

  const invoicesSearchResult = await stripe.invoices.search({
    query,
    limit,
  });
  const orderIds = invoicesSearchResult.data
    .filter(invoice => invoice.metadata?.userId === userId)
    .map(invoice => invoice.metadata?.orderId);

  return ids.filter(id => orderIds.includes(id));
}
