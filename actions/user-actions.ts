// "use server";
// import { connectDB } from "@/lib/mongoose";
// import { User } from "@/models/User";

// export const createUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
//   try {
//     await connectDB();
//     const user = new User({ name, email, password });
//     await user.save();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchUsers = async () => {
//   try {
//     await connectDB();
//     const users = await User.find({});
//     return JSON.stringify(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const removeUserById = async (id: string) => {
//   try {
//     await connectDB();
//     await User.deleteOne({ _id: id });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateUserById = async (id: string, data: { name: string; email: string; password: string }) => {
//   try {
//     await connectDB();
//     await User.findByIdAndUpdate(id, data);
//   } catch (error) {
//     console.log(error);
//   }
// };
