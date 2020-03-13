import quotes from '../../quotes.json';

export default (req:any, res:any) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200).json(quote);
};