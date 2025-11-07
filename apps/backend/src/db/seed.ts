import { db } from "./index";
import { users, posts, comments, likes, follows, todosTable } from "./schema";

const userData = [
  {
    username: "alice",
    email: "alice@example.com",
    passwordHash: "hashedpassword1",
    bio: "I love cats and coffee.",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    username: "bob",
    email: "bob@example.com",
    passwordHash: "hashedpassword2",
    bio: "Full-stack developer and gamer.",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    username: "carol",
    email: "carol@example.com",
    passwordHash: "hashedpassword3",
    bio: "Photographer and traveler.",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
];

const postData = [
  { content: "初めての投稿です！", imageUrl: null },
  { content: "今日はいい天気 ☀️", imageUrl: null },
  { content: "旅行先で撮った写真📷", imageUrl: "https://placekitten.com/300/200" },
];

const commentData = [{ content: "ナイス投稿！" }, { content: "わかります〜" }, { content: "すごくいい写真ですね！" }];

async function seed() {
  console.log("Seeding database...");

  try {
    await db.delete(follows);
    await db.delete(likes);
    await db.delete(comments);
    await db.delete(posts);
    await db.delete(users);
    console.log("Step1: Delete old tables data");

    const insertedUsers = await db.insert(users).values(userData).returning();
    console.log(`Step2: Inserted ${insertedUsers.length} users`);

    const insertedPosts = [];
    for (let i = 0; i < postData.length; i++) {
      const user = insertedUsers[i % insertedUsers.length];
      const post = await db
        .insert(posts)
        .values({
          userId: user.id,
          content: postData[i].content,
          imageUrl: postData[i].imageUrl,
        })
        .returning();
      insertedPosts.push(post[0]);
    }
    console.log(`Step3: Inserted ${insertedPosts.length} posts`);

    const insertedComments = [];
    for (let i = 0; i < commentData.length; i++) {
      const user = insertedUsers[(i + 1) % insertedUsers.length];
      const post = insertedPosts[i % insertedPosts.length];
      const comment = await db
        .insert(comments)
        .values({
          userId: user.id,
          postId: post.id,
          content: commentData[i].content,
        })
        .returning();
      insertedComments.push(comment[0]);
    }
    console.log(`Step:4 Inserted ${insertedComments.length} comments`);

    for (const post of insertedPosts) {
      for (const user of insertedUsers) {
        if (Math.random() < 0.5) {
          await db.insert(likes).values({ userId: user.id, postId: post.id });
        }
      }
    }
    console.log("Step:5 Likes inserted");

    await db.insert(follows).values([
      { followerId: insertedUsers[0].id, followingId: insertedUsers[1].id },
      { followerId: insertedUsers[1].id, followingId: insertedUsers[2].id },
      { followerId: insertedUsers[2].id, followingId: insertedUsers[0].id },
    ]);
    console.log("Step:6 Follows inserted");
    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

seed();
