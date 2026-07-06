import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const seed = async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("❌ DATABASE_URL is not set in environment variables");
  }

  console.log("⏳ Connecting to the database...");
  const client = postgres(databaseUrl, { prepare: false });
  const db = drizzle(client, { schema });

  console.log("🚀 Starting database seeding...");

  try {
    const booksData = [
      {
        title: "The Great Gatsby",
        description:
          "A novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.",
        imageUrl:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "1984",
        description:
          "A dystopian social science fiction novel and cautionary tale, written by the English writer George Orwell.",
        imageUrl:
          "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "To Kill a Mockingbird",
        description:
          "A novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools.",
        imageUrl:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Pride and Prejudice",
        description:
          "An 1813 novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments.",
        imageUrl:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "The Catcher in the Rye",
        description:
          "A novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.",
        imageUrl:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "The Hobbit",
        description:
          "A children's fantasy novel by English author J. R. R. Tolkien. It was published in 1937 to wide critical acclaim.",
        imageUrl:
          "https://images.unsplash.com/photo-1629196914534-1c2514bc73c4?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Fahrenheit 451",
        description:
          "A 1953 dystopian novel by American writer Ray Bradbury. It presents a future American society where books are outlawed and firemen burn any that are found.",
        imageUrl:
          "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Moby-Dick",
        description:
          "An 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod.",
        imageUrl:
          "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Jane Eyre",
        description:
          "A novel by English writer Charlotte Brontë, published under the pen name 'Currer Bell', on 16 October 1847.",
        imageUrl:
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "The Lord of the Rings",
        description:
          "An epic high fantasy novel by the English author and scholar J. R. R. Tolkien.",
        imageUrl:
          "https://images.unsplash.com/photo-1606836480838-89c0b11cb3a8?q=80&w=800&auto=format&fit=crop",
      },
    ];

    await db.insert(schema.items).values(booksData);

    console.log("✅ Seeding completed successfully! 10 books added.");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

seed();
