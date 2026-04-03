import { CreateUserPrams, GetMenuParams, SignInParams } from '@/type'
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite'

export const config = {
  platform: 'com.nt.foodOrdering',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  categoryCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORY_COLLECTION_ID!,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
  customizationCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
  menuCustomizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
}

export const client = new Client()

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client);

const avatar = new Avatars(client)

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if (!newAccount) {
      throw new Error('Failed to create user')
    }
    await signIn({ email, password })

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name,
        email,
        avatar: avatar.getInitialsURL(name),
      },
    )
    return newUser
  } catch (error) {
    throw new Error(error as string)
  }
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await account.deleteSession('current').catch(() => {})
    const session = await account.createEmailPasswordSession(email, password)
    if (!session) {
      throw new Error('Failed to sign in')
    }
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) {
      throw new Error('No user logged in')
    }
    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ])
    if(!currentUser || currentUser.documents.length === 0) {
      throw new Error('User not found')
    }
    return currentUser.documents[0]
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getMenu = async ({category, query}: GetMenuParams) => {
  try {
    const queries: string[] = []
    if(category) {
      queries.push(Query.equal('category', category))
    }
    if(query) {
      queries.push(Query.search('name', query))
    }
    const menu = await databases.listDocuments(config.databaseId, config.menuCollectionId, queries)
    if(!menu) {
      throw new Error('Failed to fetch menu')
    }
    return menu.documents
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(config.databaseId, config.categoryCollectionId)
    if(!categories) {
      throw new Error('Failed to fetch categories')
    }
    return categories.documents
  } catch (error) {
    throw new Error(error as string)
  }
}