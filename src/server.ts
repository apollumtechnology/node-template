interface User {
  name: string;
  age: number;
}

const users: User[] = [];

async function saveUserToDatabase(user: User): Promise<User> {
  users.push(user);
  return Promise.resolve(user);
}

(async () => {
  const user: User = {
    name: "John Doe",
    age: 20,
  };

  const persistedUser = await saveUserToDatabase(user);
  console.log(persistedUser);
})();
