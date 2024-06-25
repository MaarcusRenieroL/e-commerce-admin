import { db } from "./db";

export const getStore = async (userId: string, storeId: string) => {
  try {
    const firstStore = await db.store.findFirst({
      where: {
        userId: userId,
        storeId: storeId,
      },
    });

    return firstStore;
  } catch (error) {
    console.log(error);
  }
};

export const getStoreByStoreName = async (storeName: string) => {
  try {
    const store = await db.store.findFirst({
      where: {
        storeName: storeName,
      },
    });

    return store;
  } catch (error) {
    console.log(error);
  }
};
