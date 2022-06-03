const { AuthenticationError } = require("apollo-server-express");
// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw new AuthenticationError("You are not logged in");
    },
  },

  Mutation: {
    async login(parent, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("user not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Password incorrect");
      }
      const token = signToken(user);
      return { token, user };
    },

    async addUser(parent, args) {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        return err;
      }
    },

    saveBook(parent, {book}, context) {
      try {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
      } catch (err) {
        return err;
      }
    },
    
    removeBook(parent, {bookId}, context) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
