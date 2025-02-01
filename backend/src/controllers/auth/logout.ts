export const logout = (req:any, res:any) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  return res.json({ message: 'Logged out successfully' });
};
