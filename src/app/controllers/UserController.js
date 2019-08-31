import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use!' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const id = req.userId;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(id);

    if (email && user.email !== email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Email already in use!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match!' });
    }

    const { name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
