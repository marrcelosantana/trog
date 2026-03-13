export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  address: {
    city: string;
    state: string;
  };
};
