import { UserCreateInput } from "../generated/prisma/models.js";
import { prisma } from "./config/prisma.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    console.log("Seeding database...");

    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=0;`);

    await prisma.$queryRaw`TRUNCATE TABLE Comment`;
    await prisma.$queryRaw`TRUNCATE TABLE Post`;
    await prisma.$queryRaw`TRUNCATE TABLE User`;

    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS=1;`);

    // ساخت کاربران با hashed password
    const usersData: UserCreateInput[] = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
      },
      {
        name: "User",
        email: "user@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "USER",
      },
    ];

    const createdUsers = await prisma.user.createMany({
      data: usersData,
    });

    console.log(`Created ${createdUsers.count} users`);

    //  ساخت پست‌ها با authorId
    const postsData = [
      {
        title: "First Post",
        description: "This is the description of the first post.",
        content: `This is the content of the first post. the content must be longer than description.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        imageUrl:
          "http://res.cloudinary.com/erfan/image/upload/v1771007722/hi5fbdussnvr3iuxqk80.png",
        authorId: 1,
      },
      {
        title: "Second Post",
        description: "This is the description of the second post.",
        content: `This is the content of the second post. the content must be longer than description.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        authorId: 1,
      },
      {
        title: "Third Post",
        description: "This is the description of the third post.",
        content: `This is the content of the third post. the content must be longer than description.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        authorId: 1,
      },
    ];

    const createdPosts = await prisma.post.createMany({
      data: postsData,
    });

    console.log(`Created ${createdPosts.count} posts`);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seed();
