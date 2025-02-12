"use server";

import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema/userSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteUser = async (userId: string) => {
    try{
    await db.delete(userTable).where(eq(userTable.id, userId));

    revalidatePath("/admin-dashboard");
    }
    catch {
        throw new Error("Failed to delete user")
    }
};
