// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log(`process.env.SERVER_VARIABLE`, process.env.SERVER_VARIABLE);
  res.status(200).json({ name: 'John Doe' });
};
