const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  const thoughts = [];

  const firstThought = new Thought();
  firstThought.thoughtText = 'hello world';
  firstThought.username = 'chatbot';

  const secondThought = new Thought();
  secondThought.thoughtText = 'greetings!';
  secondThought.username = 'jean';

  const thirdThought = new Thought();
  thirdThought.thoughtText = 'good morning everybody';
  thirdThought.username = 'peter';

  const firstThoughtReactions = [
    {
      reactionBody: 'hi there!',
      username: 'jean'
    },
    {
      reactionBody: 'have a great day!',
      username: 'peter'
    }
  ];

  firstThought.reactions = firstThoughtReactions;
  thoughts.push(firstThought);
  thoughts.push(secondThought);
  thoughts.push(thirdThought);

  const users = [];

  const firstUser = new User();
  firstUser.username = 'chatbot';
  firstUser.email = 'chatbot@mail.con';
  firstUser.thoughts = [firstThought];
  await firstUser.validate();

  const secondUser = new User();
  secondUser.username = 'jean';
  secondUser.email = 'jean@mail.con';
  secondUser.thoughts = [secondThought];
  await secondUser.validate();

  const thirdUser = new User();
  thirdUser.username = 'peter';
  thirdUser.email = 'peter@mail.con';
  thirdUser.thoughts = [thirdThought];
  await thirdUser.validate();

  users.push(firstUser);
  users.push(secondUser);
  users.push(thirdUser);

  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
